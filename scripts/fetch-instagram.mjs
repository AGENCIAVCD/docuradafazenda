import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const PROJECT_ROOT = process.cwd();
const OUT_DIR = path.join(PROJECT_ROOT, "src", "data");
const OUT_FILE = path.join(OUT_DIR, "instagram-feed.json");
const PUBLIC_IMG_DIR = path.join(PROJECT_ROOT, "public", "instagram");
const DEFAULT_USERNAME = "docuradafazenda_oficial";

function getUsername() {
  const arg = process.argv.find((item) => item.startsWith("--username="));
  if (arg) return arg.replace("--username=", "").trim();
  return process.env.INSTAGRAM_USERNAME || DEFAULT_USERNAME;
}

async function writeFeed(items, username, source) {
  const payload = {
    source,
    profile: username,
    fetched_at: new Date().toISOString(),
    items,
  };
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(payload, null, 2));
}

async function clearLocalInstagramImages() {
  await fs.mkdir(PUBLIC_IMG_DIR, { recursive: true });
  const files = await fs.readdir(PUBLIC_IMG_DIR);
  await Promise.all(
    files
      .filter((name) => name.startsWith("post-"))
      .map((name) => fs.unlink(path.join(PUBLIC_IMG_DIR, name)))
  );
}

function downloadImage(url, filepath) {
  execFileSync(
    "curl",
    [
      "-sL",
      url,
      "-H",
      "User-Agent: Mozilla/5.0",
      "-H",
      "Referer: https://www.instagram.com/",
      "-o",
      filepath,
    ],
    { encoding: "utf8" }
  );
}

async function fetchPublicInstagram(username) {
  const endpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`;
  const raw = execFileSync(
    "curl",
    [
      "-s",
      endpoint,
      "-H",
      "User-Agent: Mozilla/5.0",
      "-H",
      "x-ig-app-id: 936619743392459",
      "-H",
      "Accept: application/json",
      "-H",
      "Referer: https://www.instagram.com/",
    ],
    { encoding: "utf8" }
  );

  const json = JSON.parse(raw);
  const edges = json?.data?.user?.edge_owner_to_timeline_media?.edges || [];

  await clearLocalInstagramImages();

  return edges.slice(0, 6).map(({ node }, index) => {
    const remoteImage = node.display_url || node.thumbnail_src;
    const filename = `post-${index + 1}.jpg`;
    const localPath = path.join(PUBLIC_IMG_DIR, filename);
    const localUrl = `/instagram/${filename}`;

    try {
      downloadImage(remoteImage, localPath);
    } catch {
      return {
        id: node.id,
        image: remoteImage,
        permalink: `https://www.instagram.com/p/${node.shortcode}/`,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "",
        timestamp: node.taken_at_timestamp
          ? new Date(node.taken_at_timestamp * 1000).toISOString()
          : null,
      };
    }

    return {
      id: node.id,
      image: localUrl,
      permalink: `https://www.instagram.com/p/${node.shortcode}/`,
      caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "",
      timestamp: node.taken_at_timestamp
        ? new Date(node.taken_at_timestamp * 1000).toISOString()
        : null,
    };
  });
}

async function main() {
  const username = getUsername();
  try {
    const items = await fetchPublicInstagram(username);
    if (!items.length) throw new Error("Sem mídias retornadas.");
    await writeFeed(items, username, "instagram_public_profile");
    console.log(`[instagram-feed] ${items.length} mídias atualizadas para @${username}`);
  } catch (error) {
    console.warn(`[instagram-feed] Falha ao buscar @${username}: ${error.message}`);
    console.warn("[instagram-feed] Mantendo feed atual para não quebrar o site.");
  }
}

main();
