"use client";

import { animate, stagger } from "animejs";
import {
  ArrowLeft,
  ArrowUp,
  BookOpenCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Wheat,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { siteData } from "@/lib/site-data";

type SiteShellProps = {
  page: "home" | "about" | "products" | "product" | "contact";
  productSlug?: string;
};

type GoogleReview = {
  author: string;
  date: string;
  rating: number;
  text: string;
  url: string | null;
};

type GoogleReviewsResponse = {
  configured: boolean;
  rating: number | null;
  userRatingCount: number | null;
  reviews: GoogleReview[];
};

type Product = (typeof siteData.products)[number];
type ProductCategory = (typeof siteData.productCategories)[number];

const pillarIcons = [BookOpenCheck, Wheat, Sparkles, HeartHandshake];

const pagePaths: Record<SiteShellProps["page"], string> = {
  home: "/",
  products: "/produtos",
  product: "/produtos",
  about: "/sobre-nos",
  contact: "/contato",
};

function getCatalogCategory(product: Product) {
  if (product.category === "Pastoso") return "Pastosos";
  if (product.category === "Barra") return "Barras";
  if (product.category === "Tablete") return "Tabletes";

  return "Kits e Displays";
}

function getProductDisplaySize(product: Product) {
  if (product.category === "Pastoso" && product.size === "Pote familiar") {
    return "680g";
  }

  return product.size;
}

function getProductFormat(product: Product) {
  const size = getProductDisplaySize(product);

  if (product.category === "Pastoso") return `Pastoso ${size}`;
  if (product.category === "Barra") return `Barra ${size}`;
  if (product.category === "Tablete") return `Tablete ${size}`;
  if (product.size.includes("un.")) return `Pote ${size}`;

  return `Display ${size}`;
}

function getProductBaseName(product: Product) {
  return product.name
    .replace(/\s+c\/\d+\s+un\.?\s*\d+g/gi, "")
    .replace(/\s+em\s+Tabletes\s+\d+g/gi, "")
    .replace(/\s+Barra\s+\d+g/gi, "")
    .replace(/\s+\d+(?:,\d+)?kg/gi, "")
    .replace(/\s+\d+g/gi, "")
    .replace(/^Potes?\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getTechnicalProductName(product: Product) {
  return `${getProductBaseName(product)} - ${getProductFormat(product)}`;
}

function getBoxUnits(product: Product) {
  if (product.category === "Pastoso") {
    return getProductDisplaySize(product) === "300g"
      ? "24 unidades por caixa"
      : "15 unidades por caixa";
  }

  const packaging = product.nutrition?.packaging;
  const match = packaging?.match(/(?:\d+\s+(?:unidades|displays)\s+por caixa)/i);

  if (match) return match[0].replace(/^\w/, (letter) => letter.toUpperCase());
  if (product.category === "Tablete" && product.size === "65g") return "Consulte caixa fechada";

  return "Consulte com vendas";
}

function getProductLineBadge(product: Product) {
  if (product.category === "Pastoso") return "Linha Pastosa";
  if (product.category === "Barra") return "Linha Barras";
  if (product.category === "Tablete") return "Linha Tabletes";

  return "Kits e Displays";
}

function getWholesaleWhatsAppHref(product: Product) {
  return `${siteData.whatsappUrl}?text=${encodeURIComponent(
    `Olá, tenho interesse em revender o produto ${getTechnicalProductName(product)} - ${getCatalogCategory(product)}. Pode me enviar a tabela?`,
  )}`;
}

const fallbackGoogleReviews: GoogleReview[] = [
  {
    author: "Andreia Toda",
    date: "Editado 11 meses atrás",
    rating: 5,
    text:
      "Melhor opção para comprar doces na região de Cambuí/MG. Fácil acesso, na rodovia Fernão Dias, sentido SP. Loja de fábrica, funcionários atenciosos e simpáticos. O espaço conta com café e salgados.",
    url: null,
  },
  {
    author: "Igor J Costa",
    date: "11 meses atrás",
    rating: 5,
    text:
      "Simplesmente o lugar onde você encontra o melhor doce de leite de Minas Gerais, entre outros produtos deliciosos! O espaço é simples, mas extremamente agradável, com aquele clima acolhedor que só o interior oferece. Vale muito a visita para quem aprecia produtos autênticos e de qualidade.",
    url: null,
  },
  {
    author: "Leandra",
    date: "6 meses atrás",
    rating: 5,
    text:
      "Comprei um queijo minas que até hoje não achei outro igual! Me arrependi de ter comprado só um. Uma sugestão para o estabelecimento seria ter prova dos produtos; se eu tivesse provado o queijo, teria comprado 10 kkkkk.",
    url: null,
  },
  {
    author: "Alison Santos",
    date: "5 meses atrás",
    rating: 5,
    text:
      "Ótimos doces, gostei de todos que comprei, as meninas me atenderam super bem e os preços são sensacionais.",
    url: null,
  },
  {
    author: "Guilherme Barros",
    date: "2 meses atrás",
    rating: 5,
    text:
      "Loja de fábrica e também funciona como lanchonete, vale a pena a parada. Local muito organizado e muito limpo. Tem uma grande variedade de itens, bolachas, doces, bebidas e até artesanato. Os banheiros são muito limpos. Se houver oportunidade, passarei uma outra vez por lá.",
    url: null,
  },
];

export function SiteShell({ page, productSlug }: SiteShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const enterElements = document.querySelectorAll(".enter > *");

    if (enterElements.length === 0) {
      return;
    }

    animate(enterElements, {
      translateY: [28, 0],
      opacity: [0, 1],
      delay: stagger(90),
      duration: 780,
      easing: "easeOutExpo",
    });

  }, []);

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <Header
        page={page}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {page === "home" ? <HomePage /> : null}
      {page === "about" ? <AboutPage /> : null}
      {page === "products" ? <ProductsPage /> : null}
      {page === "product" ? <ProductDetailPage productSlug={productSlug} /> : null}
      {page === "contact" ? <ContactPage /> : null}

      <FloatingWhatsApp />
      <BackToTopButton />
      <Footer />
    </div>
  );
}

function Header({
  page,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  page: SiteShellProps["page"];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean | ((current: boolean) => boolean)) => void;
}) {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[rgba(36,23,15,0.94)] backdrop-blur-xl">
      <div className="site-header-inner mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-4" href="/">
          <Image
            src="/assets/images/logo.png"
            alt="Doçura da Fazenda"
            width={92}
            height={86}
            priority
            className="site-logo h-[4.6rem] w-auto"
          />
          <div className="hidden min-[430px]:block">
            <p className="brand-wordmark text-3xl leading-none">
              Doçura da Fazenda
            </p>
            <p className="brand-location mt-1.5 text-sm font-bold uppercase">
              Cambuí • MG
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {siteData.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${
                item.href === pagePaths[page]
                  ? "nav-link-active"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="button-primary header-whatsapp"
            href={siteData.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Fale conosco
          </a>
          <button
            aria-label={mobileMenuOpen ? "Fechar navegação" : "Abrir navegação"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/95 text-[var(--wood)] shadow-sm lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-black/10 bg-[radial-gradient(circle_at_86%_10%,rgba(243,197,21,0.18),transparent_28%),linear-gradient(180deg,rgba(255,248,233,0.98),rgba(255,244,220,0.98))] p-4 shadow-[0_24px_60px_rgba(36,23,15,0.14)] lg:hidden">
          <nav className="mx-auto grid max-w-2xl gap-2.5">
            {siteData.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-16 items-center justify-between rounded-[14px] border bg-white/70 px-4 py-3 text-base font-black uppercase tracking-[0.12em] text-[var(--wood)] shadow-[0_14px_32px_rgba(36,23,15,0.06),inset_0_1px_0_rgba(255,255,255,0.72)] transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(182,66,45,0.18)] hover:bg-white hover:text-[var(--red)] ${
                  item.href === pagePaths[page]
                    ? "border-[rgba(182,66,45,0.18)] bg-white text-[var(--red)]"
                    : "border-black/10"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <ChevronRight className="h-5 w-5 text-[var(--red)]" />
              </Link>
            ))}
          </nav>
          <div className="mx-auto mt-3 max-w-2xl rounded-2xl border border-[rgba(23,79,61,0.16)] bg-[linear-gradient(135deg,rgba(23,79,61,0.96),rgba(50,27,18,0.92))] p-4 text-[var(--cream)] shadow-[0_18px_42px_rgba(36,23,15,0.12)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--yellow)]">
              Cambuí • MG
            </p>
            <strong className="mt-2 block max-w-72 font-[family-name:var(--font-heading)] text-2xl font-normal leading-none">
              Doce de leite mineiro direto da fazenda.
            </strong>
            <a
              className="button-primary mt-4 w-full"
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomePage() {
  return (
    <main>
      <HeroCarousel />

      <TrustBar />
      <AboutSection />
      <ProductsSection />
      <ResellerSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const shouldBlockClick = useRef(false);
  const hasDragged = useRef(false);
  const activeBanner = siteData.heroBanners[activeIndex];
  const CtaIcon =
    activeBanner.href === "/contato" ||
    activeBanner.cta.toLocaleLowerCase("pt-BR").includes("localiza")
      ? MapPin
      : ShoppingBag;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % siteData.heroBanners.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 520px)").matches) {
      return;
    }

    animate(".hero-slide-copy > *", {
      translateY: [24, 0],
      opacity: [0, 1],
      delay: stagger(80),
      duration: 680,
      easing: "easeOutExpo",
    });

  }, [activeIndex]);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? siteData.heroBanners.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % siteData.heroBanners.length);
  };

  const blockNextClick = () => {
    shouldBlockClick.current = true;
    window.setTimeout(() => {
      shouldBlockClick.current = false;
    }, 80);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStartX.current === null) {
      return;
    }

    const distance = clientX - dragStartX.current;

    if (Math.abs(distance) < 48) {
      return;
    }

    hasDragged.current = true;
    dragStartX.current = clientX;
    blockNextClick();

    if (distance > 0) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  return (
    <section
      className="hero-section"
      onClickCapture={(event) => {
        if (!shouldBlockClick.current) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        shouldBlockClick.current = false;
      }}
      onPointerCancel={() => {
        dragStartX.current = null;
        hasDragged.current = false;
      }}
      onPointerDown={(event) => {
        dragStartX.current = event.clientX;
        hasDragged.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => handleDragMove(event.clientX)}
      onPointerUp={(event) => {
        if (hasDragged.current) {
          blockNextClick();
        }

        dragStartX.current = null;
        hasDragged.current = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
    >
      <div key={activeBanner.title} className="absolute inset-0">
        {activeBanner.mediaType === "video" ? (
          <video
            className="hero-media absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            preload="auto"
            playsInline
            src={activeBanner.media}
          />
        ) : (
          <Image
            src={activeBanner.media}
            alt=""
            fill
            priority={activeIndex === 0}
            sizes="100vw"
            className="hero-media absolute inset-0 object-cover"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-4 pb-28 pt-14 md:px-6">
        <div key={activeBanner.title} className="hero-slide-copy glass-panel max-w-2xl">
          <p className="eyebrow">{activeBanner.eyebrow}</p>
          <h1 className="hero-title">
            <span className="hero-title-desktop">{activeBanner.title}</span>
            <span className="hero-title-mobile">{activeBanner.mobileTitle}</span>
          </h1>
          <p className="hero-copy">
            <span className="hero-copy-desktop">{activeBanner.body}</span>
            <span className="hero-copy-mobile">{activeBanner.mobileBody}</span>
          </p>
          <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="button-primary" href={activeBanner.href}>
              <CtaIcon className="h-4 w-4" />
              {activeBanner.cta}
            </Link>
            <a
              className="button-outline"
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

      </div>

      <div
        className="hero-carousel-dock"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Banner anterior"
          className="hero-control"
          onClick={goToPrevious}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {siteData.heroBanners.map((banner, index) => (
            <button
              key={banner.title}
              aria-label={`Ir para o banner ${index + 1}`}
              className={`hero-dot ${index === activeIndex ? "hero-dot-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="Próximo banner"
          className="hero-control"
          onClick={goToNext}
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    ["1998", "tradição familiar"],
    ["Cambuí", "origem mineira"],
    ["1.300+", "avaliações destacadas"],
  ];

  return (
    <section className="trust-bar border-y border-black/10">
      <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-[rgba(50,27,18,0.12)] px-2 md:px-6">
        {items.map(([value, label]) => (
          <div key={value} className="trust-bar-item px-2 py-4 text-center md:px-8 md:py-6 md:text-left">
            <p className="brand-heading-font text-2xl leading-none text-[var(--green)] md:text-4xl">
              {value}
            </p>
            <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-black/55 md:text-sm md:tracking-[0.12em]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const factoryVideo = "/assets/videos/Banner-animado3.mp4";

  useEffect(() => {
    if (!videoOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMilestone((current) => (current + 1) % siteData.about.milestones.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section-shell about-section">
      <div className="about-layout">
        <div className="about-video-column">
          <div className="factory-video-card photo-frame relative min-h-[460px] overflow-hidden">
            <video
              src={factoryVideo}
              autoPlay
              muted
              loop
              preload="auto"
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              className="factory-video-play"
              onClick={() => setVideoOpen(true)}
              aria-label="Assistir vídeo da fabricação em tela cheia"
            >
              <Play className="h-6 w-6 fill-current" />
              <span>Ver vídeo</span>
            </button>
          </div>
        </div>
        <div className="about-content-column">
          <div className="about-copy-card">
            <p className="eyebrow">{siteData.about.eyebrow}</p>
            <h2 className="section-title">{siteData.about.title}</h2>
            <p className="section-copy">{siteData.about.body}</p>
            <div className="mt-8 grid gap-4">
              {siteData.about.bullets.map((bullet) => (
                <p key={bullet} className="flex gap-3 text-base leading-7">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--green)]" />
                  <span>{bullet}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="story-carousel mt-10 grid gap-4 md:grid-cols-3">
            {siteData.about.milestones.map((milestone, index) => (
              <article
                key={milestone.label}
                className={`story-card ${
                  index === activeMilestone ? "story-card-active" : ""
                }`}
              >
                <p className="story-card-label">{milestone.label}</p>
                <h3 className="story-card-value">{milestone.value}</h3>
                <p className="story-card-copy">{milestone.detail}</p>
              </article>
            ))}
          </div>
          <div className="story-dots" aria-label="Marcos da história">
            {siteData.about.milestones.map((milestone, index) => (
              <button
                key={milestone.label}
                aria-label={`Ver marco ${milestone.label}`}
                className={`story-dot ${index === activeMilestone ? "story-dot-active" : ""}`}
                onClick={() => setActiveMilestone(index)}
                type="button"
              />
            ))}
          </div>

          <div className="pillar-grid mt-14 grid gap-4 md:grid-cols-4">
            {siteData.about.pillars.map((pillar, index) => {
              const PillarIcon = pillarIcons[index] ?? CheckCircle2;

              return (
                <article key={pillar.title} className="pillar-card">
                  <div className="pillar-icon">
                    <PillarIcon aria-hidden="true" className="h-6 w-6" strokeWidth={1.9} />
                  </div>
                  <h3 className="mt-4 brand-heading-font text-xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6">{pillar.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {videoOpen ? (
        <div
          className="factory-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo da fabricação da Doçura da Fazenda"
        >
          <button
            type="button"
            className="factory-video-backdrop"
            onClick={() => setVideoOpen(false)}
            aria-label="Fechar vídeo"
          />
          <button
            type="button"
            className="factory-video-close"
            onClick={() => setVideoOpen(false)}
            aria-label="Fechar vídeo"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="factory-video-modal-frame">
            <video
              src={factoryVideo}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ProductsSection() {
  return (
    <section className="bg-[var(--yellow-soft)]">
      <div className="section-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Produtos</p>
            <h2 className="section-title">{siteData.productsIntro.title}</h2>
            <p className="section-copy">{siteData.productsIntro.body}</p>
          </div>
          <Link className="button-primary" href="/produtos">
            <ShoppingBag className="h-4 w-4" />
            Ver linha completa
          </Link>
        </div>
        <FeaturedProductCategories />
        <ProductShowcase3D />
        <div className="mt-10 flex justify-center">
          <Link className="button-primary" href="/produtos">
            <ShoppingBag className="h-4 w-4" />
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase3D() {
  const showcaseSlugs = [
    "doce-de-leite-tradicional-em-tabletes-200g",
    "casadinho-de-doce-de-leite-com-chocolate-em-tabletes-200g",
    "doce-de-leite-sortidos-em-tabletes-1-100kg",
    "doce-de-leite-em-tablete-65g",
    "doce-de-leite-com-coco-300g",
    "doce-de-leite-tradicional-300g",
    "doce-de-leite-com-ameixa-barra-400g",
    "doce-de-leite-com-amendoim-barra-400g",
    "display-de-doce-de-leite-tradicional-1-kg",
  ];
  const showcaseProducts = showcaseSlugs
    .map((slug) => siteData.products.find((product) => product.slug === slug))
    .filter((product): product is (typeof siteData.products)[number] => Boolean(product));
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const shouldBlockClick = useRef(false);
  const hasDragged = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % showcaseProducts.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [showcaseProducts.length]);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? showcaseProducts.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % showcaseProducts.length);
  };

  const blockNextClick = () => {
    shouldBlockClick.current = true;
    window.setTimeout(() => {
      shouldBlockClick.current = false;
    }, 80);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStartX.current === null) {
      return;
    }

    const distance = clientX - dragStartX.current;

    if (Math.abs(distance) < 42) {
      return;
    }

    hasDragged.current = true;
    dragStartX.current = clientX;
    blockNextClick();

    if (distance > 0) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  return (
    <div className="product-3d-shell">
        <div className="product-3d-copy">
          <p className="eyebrow eyebrow-dark showcase-eyebrow">Destaques da vitrine</p>
          <h3 className="showcase-title">
            Escolha o formato ideal e leve o sabor mineiro para sua mesa ou ponto de venda.
          </h3>
          <p className="showcase-copy">
            Veja tabletes, pastosos, barras e displays com apresentação pronta
            para consumo, presente ou revenda.
          </p>
      </div>

      <div
        className="product-3d-stage"
        aria-label="Carrossel 3D de produtos"
        onClickCapture={(event) => {
          if (!shouldBlockClick.current) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          shouldBlockClick.current = false;
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
          hasDragged.current = false;
        }}
        onPointerDown={(event) => {
          dragStartX.current = event.clientX;
          hasDragged.current = false;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => handleDragMove(event.clientX)}
        onPointerUp={(event) => {
          if (hasDragged.current) {
            blockNextClick();
          }

          dragStartX.current = null;
          hasDragged.current = false;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
      >
        {showcaseProducts.map((product, index) => {
          const rawOffset = index - activeIndex;
          const offset =
            rawOffset > showcaseProducts.length / 2
              ? rawOffset - showcaseProducts.length
              : rawOffset < -showcaseProducts.length / 2
                ? rawOffset + showcaseProducts.length
                : rawOffset;
          const visible = Math.abs(offset) <= 2;

          return (
            <Link
              key={product.slug}
              href={`/produtos/${product.slug}`}
              className="product-3d-card"
              style={
                {
                  "--offset": offset,
                  "--abs-offset": Math.abs(offset),
                  zIndex: 10 - Math.abs(offset),
                } as React.CSSProperties
              }
              aria-hidden={!visible}
              tabIndex={visible ? 0 : -1}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 72vw, 304px"
                className="object-contain p-6"
              />
              <span>{product.name}</span>
            </Link>
          );
        })}
      </div>

      <div
        className="product-3d-controls"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Produto anterior"
          className="hero-control"
          onClick={goToPrevious}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {showcaseProducts.map((product, index) => (
            <button
              key={product.slug}
              aria-label={`Ir para ${product.name}`}
              className={`hero-dot ${index === activeIndex ? "hero-dot-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="Próximo produto"
          className="hero-control"
          onClick={goToNext}
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function FeaturedProductCategories() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {siteData.productCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/produtos#${category.slug}`}
          className="category-card group"
        >
          <div className="product-image-stage category-image-stage relative h-56 lg:h-52">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-6 transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="border-t border-black/10 p-4">
            <p className="eyebrow">{category.name}</p>
            <p className="mt-3 text-sm leading-6 text-black/68">
              {category.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProductGrid({
  limit,
  products: providedProducts,
}: {
  limit?: number;
  products?: Product[];
}) {
  const products = providedProducts ?? (limit ? siteData.products.slice(0, limit) : siteData.products);

  return (
    <div className="product-grid mt-10">
      {products.map((product) => {
        const technicalName = getTechnicalProductName(product);

        return (
          <article key={product.slug} className="product-card group">
            <Link
              href={`/produtos/${product.slug}`}
              className="product-image-stage relative block aspect-square"
              aria-label={`Ver ficha técnica de ${technicalName}`}
            >
              <Image
                src={product.image}
                alt={technicalName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="product-line-badge">{getProductLineBadge(product)}</span>
            </Link>
            <div className="product-card-body">
              <p className="product-card-kicker">
                {getCatalogCategory(product)} • {getProductDisplaySize(product)}
              </p>
              <h3 className="product-card-title brand-heading-font">
                {technicalName}
              </h3>
              <p className="product-box-label">
                <span>Unidades por caixa</span>
                <strong>{getBoxUnits(product)}</strong>
              </p>
              <p className="product-card-description">
                {product.description}
              </p>
              <a
                className="button-primary product-card-cta"
                href={getWholesaleWhatsAppHref(product)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar Atacado
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CatalogFilterNav({ categories }: { categories: ProductCategory[] }) {
  return (
    <nav className="catalog-filter-nav" aria-label="Categorias do catálogo técnico">
      {categories.map((category) => (
        <a key={category.slug} href={`#${category.slug}`}>
          {category.name}
        </a>
      ))}
    </nav>
  );
}

function getProductsForCategory(category: ProductCategory) {
  if (category.slug === "pastoso") {
    return siteData.products.filter((product) => product.category === "Pastoso");
  }

  if (category.slug === "barra") {
    return siteData.products.filter((product) => product.category === "Barra");
  }

  if (category.slug === "tablete") {
    return siteData.products.filter((product) => product.category === "Tablete");
  }

  return siteData.products.filter((product) => product.category === "Display");
}

function ProductSegmentTitle({ category }: { category: ProductCategory }) {
  const titleBySlug: Record<string, string> = {
    pastoso: "Pastosos 680g e 300g",
    barra: "Barras 400g",
    tablete: "Tabletes 65g, 200g e displays",
    "kits-displays": "Kits e displays para lojistas",
  };

  return (
    <h3 className="brand-heading-font text-4xl leading-none">
      {titleBySlug[category.slug]}
    </h3>
  );
}

function ProductSegments() {
  return (
    <>
      <CatalogFilterNav categories={siteData.productCategories} />
      <div className="mt-10 grid gap-12">
        {siteData.productCategories.map((category) => {
          const products = getProductsForCategory(category);

          return (
            <section key={category.slug} id={category.slug} className="product-segment">
              <div className="product-segment-header">
                <div>
                  <p className="eyebrow">{category.name}</p>
                  <ProductSegmentTitle category={category} />
                </div>
                <p>{category.description}</p>
              </div>

              <ProductGrid products={products} />
            </section>
          );
        })}
      </div>
    </>
  );
}

function ResellerSection() {
  return (
    <section className="section-shell">
      <div className="emporio-section-card grid overflow-hidden rounded-[15px] text-white shadow-[0_24px_65px_rgba(23,79,61,0.18)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="emporio-section-copy p-7 md:p-10">
          <p className="eyebrow eyebrow-contrast">Empório em Cambuí</p>
          <h2 className="section-title text-white">{siteData.reseller.title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/82">
            {siteData.reseller.body}
          </p>
          <a
            className="button-primary mt-8"
            href={siteData.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Store className="h-4 w-4" />
            Conhecer o empório
          </a>
        </div>
        <GalleryGrid />
      </div>
    </section>
  );
}

function GalleryGrid() {
  const [activeImage, setActiveImage] = useState<(typeof siteData.gallery)[number] | null>(null);
  const [featuredImage, secondaryImage, tertiaryImage, ...galleryStrip] = siteData.gallery;

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <div className="gallery-stage">
        <div className="gallery-stage-main">
          <button
            type="button"
            className="gallery-card gallery-card-featured photo-frame relative overflow-hidden"
            onClick={() => setActiveImage(featuredImage)}
            aria-label={`Ampliar imagem: ${featuredImage.alt}`}
          >
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover"
            />
            <span className="gallery-card-overlay">
              <span className="gallery-card-chip">
                <Expand className="h-4 w-4" />
                Ver espaço
              </span>
            </span>
          </button>

          <div className="gallery-stage-side">
            {[secondaryImage, tertiaryImage].map((image) => (
              <button
                key={image.src}
                type="button"
                className="gallery-card gallery-card-support photo-frame relative overflow-hidden"
                onClick={() => setActiveImage(image)}
                aria-label={`Ampliar imagem: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 18vw"
                  className="object-cover"
                />
                <span className="gallery-card-overlay">
                  <span className="gallery-card-chip">
                    <Expand className="h-4 w-4" />
                    Ampliar
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-strip-shell">
          <div className="gallery-strip-head">
            <p>Mais do empório</p>
            <span>{siteData.gallery.length} fotos</span>
          </div>
          <div className="gallery-strip" role="list" aria-label="Mais fotos do empório">
            {galleryStrip.map((image) => (
              <button
                key={image.src}
                type="button"
                className="gallery-card gallery-card-thumb photo-frame relative overflow-hidden"
                onClick={() => setActiveImage(image)}
                aria-label={`Ampliar imagem: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 44vw, 12vw"
                  className="object-cover"
                />
                <span className="gallery-card-overlay">
                  <span className="gallery-card-chip">
                    <Expand className="h-4 w-4" />
                    Ver
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <GalleryLightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}

function GalleryLightbox({
  image,
  onClose,
}: {
  image: (typeof siteData.gallery)[number] | null;
  onClose: () => void;
}) {
  if (!image) {
    return null;
  }

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da galeria"
    >
      <button
        type="button"
        className="gallery-lightbox-backdrop"
        onClick={onClose}
        aria-label="Fechar visualização ampliada"
      />
      <button
        type="button"
        className="gallery-lightbox-close"
        onClick={onClose}
        aria-label="Fechar imagem ampliada"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="gallery-lightbox-frame">
        <div className="gallery-lightbox-image">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  const [googleReviews, setGoogleReviews] = useState<GoogleReviewsResponse | null>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  useEffect(() => {
    let active = true;

    fetch("/api/google-reviews")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: GoogleReviewsResponse | null) => {
        if (active) {
          setGoogleReviews(data);
        }
      })
      .catch(() => {
        if (active) {
          setGoogleReviews(null);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const officialReviews = googleReviews?.reviews ?? [];
  const reviews = officialReviews.length > 0 ? officialReviews : fallbackGoogleReviews;
  const usingFallbackReviews = officialReviews.length === 0;
  const visibleReviewCount = Math.min(3, reviews.length);
  const effectiveReviewIndex = reviews.length > 0 ? activeReviewIndex % reviews.length : 0;
  const visibleReviews = Array.from({ length: visibleReviewCount }, (_, offset) => {
    return reviews[(effectiveReviewIndex + offset) % reviews.length];
  });

  useEffect(() => {
    if (reviews.length <= visibleReviewCount) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveReviewIndex((current) => (current + 1) % reviews.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reviews.length, visibleReviewCount]);

  const goToPreviousReview = () => {
    setActiveReviewIndex((current) =>
      current === 0 ? reviews.length - 1 : current - 1,
    );
  };

  const goToNextReview = () => {
    setActiveReviewIndex((current) => (current + 1) % reviews.length);
  };

  return (
    <section className="bg-white">
      <div className="section-shell">
        <div className="reviews-heading">
          <p className="eyebrow">Avaliações</p>
          <h2 className="section-title reviews-title">
            Reconhecida por quem valoriza sabor, tradição e qualidade
          </h2>
        </div>
        {googleReviews?.rating && googleReviews.userRatingCount && !usingFallbackReviews ? (
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-black/55">
            Google {googleReviews.rating.toFixed(1)} • {googleReviews.userRatingCount} avaliações
          </p>
        ) : (
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-black/55">
            Comentários de clientes no Google
          </p>
        )}
        <div className="review-carousel-shell mt-10">
          <div className="review-grid">
            {visibleReviews.map((review, index) => (
              <article key={`${review.author}-${review.date}-${index}`} className="review-card">
                <div className="review-card-head">
                  <div className="review-avatar" aria-hidden="true">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h3>{review.author}</h3>
                    <p>Local Guide</p>
                  </div>
                </div>
                <div className="review-stars">
                  {Array.from({ length: Math.max(1, Math.min(5, review.rating)) }).map(
                    (_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ),
                  )}
                  <span>{review.date}</span>
                </div>
                <p className="review-text">{review.text}</p>
              </article>
            ))}
          </div>
          {reviews.length > visibleReviewCount ? (
            <div className="review-carousel-controls">
              <button
                aria-label="Avaliações anteriores"
                className="hero-control"
                onClick={goToPreviousReview}
                type="button"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="review-carousel-dots">
                {reviews.map((review, index) => (
                  <button
                    key={`${review.author}-${review.date}-dot`}
                    aria-label={`Ir para avaliação ${index + 1}`}
                    className={`hero-dot ${
                      index === effectiveReviewIndex ? "hero-dot-active" : ""
                    }`}
                    onClick={() => setActiveReviewIndex(index)}
                    type="button"
                  />
                ))}
              </div>
              <button
                aria-label="Próximas avaliações"
                className="hero-control"
                onClick={goToNextReview}
                type="button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
        {usingFallbackReviews ? (
          <div className="review-fallback-note">
            <p>Confira mais experiências de clientes no perfil da Doçura da Fazenda.</p>
            <a
              href={siteData.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Ver avaliações no Google
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}

function ProductsPage() {
  return (
    <main>
      <section className="products-hero relative overflow-hidden">
        <Image
          src="/assets/images/emporio/emporio-atual-02.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(45,25,13,0.9),rgba(98,54,22,0.66),rgba(245,183,66,0.24))]" />
        <div className="relative mx-auto grid min-h-[420px] max-w-7xl items-center gap-7 px-4 py-14 md:grid-cols-[1fr_0.58fr] md:px-6">
          <div className="max-w-3xl text-white">
            <p className="eyebrow eyebrow-contrast">Nossos produtos</p>
            <h1 className="products-hero-title mt-3 brand-heading-font text-5xl leading-none md:text-6xl">
              A linha completa da Doçura da Fazenda.
            </h1>
            <p className="products-hero-copy mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Tabletes, pastosos, barras, potes e displays para consumo,
              presente ou revenda, todos com o sabor tradicional de Cambuí.
            </p>
          </div>
          <div className="products-hero-card">
            <p className="footer-title">Catálogo artesanal</p>
            <div className="mt-5 grid gap-3">
              {siteData.productCategories.map((category) => (
                <div key={category.slug} className="products-hero-line">
                  <span>{category.name}</span>
                  <small>{category.description}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Categorias</p>
          <h2 className="section-title">
            Escolha pela ocasião de consumo ou venda
          </h2>
          <p className="section-copy">{siteData.productsIntro.body}</p>
        </div>
        <FeaturedProductCategories />
      </section>

      <section className="section-shell pt-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Catálogo completo</p>
            <h2 className="section-title">Todos os produtos</h2>
          </div>
          <a className="button-primary" href={siteData.whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            Falar com vendas
          </a>
        </div>
        <ProductSegments />
      </section>
    </main>
  );
}

function ProductDetailPage({ productSlug }: { productSlug?: string }) {
  const product = siteData.products.find((item) => item.slug === productSlug) ?? siteData.products[0];
  const relatedProducts = siteData.products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 4);
  const technicalName = getTechnicalProductName(product);
  const whatsappHref = getWholesaleWhatsAppHref(product);

  return (
    <main>
      <section className="section-shell product-detail-shell">
        <Link
          href="/produtos"
          className="product-detail-backlink"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos produtos
        </Link>

        <div className="product-detail-hero">
          <div className="product-detail-visual-column">
            <div className="product-detail-media">
              <div className="product-detail-media-glow" aria-hidden="true" />
              <div className="product-detail-media-grid" aria-hidden="true" />
              <div className="product-detail-media-badge">
                <span>{getCatalogCategory(product)}</span>
                <strong>{getProductDisplaySize(product)}</strong>
              </div>
              <div className="product-detail-media-inner">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-contain p-6 md:p-10"
                />
              </div>
            </div>
          </div>

          <div className="product-detail-summary">
            <div className="product-detail-summary-head">
              <p className="eyebrow">{getCatalogCategory(product)} • {getProductDisplaySize(product)}</p>
              <h1 className="product-detail-title">{technicalName}</h1>
              <p className="product-detail-copy">{product.description}</p>
            </div>

            <div className="product-detail-feature-strip">
              {["Receita mineira", "Produção artesanal", "Ideal para revenda"].map((item) => (
                <div key={item} className="product-feature-pill">
                  {item}
                </div>
              ))}
            </div>

            <ProductSpecificationGrid product={product} />

            <div className="product-detail-actions">
              <a className="button-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Consultar Atacado
              </a>
              <Link className="button-outline" href="/contato">
                <MapPin className="h-4 w-4" />
                Ver localização
              </Link>
            </div>
          </div>
        </div>

        {product.nutrition ? <ProductNutritionCard nutrition={product.nutrition} /> : null}
      </section>

      <section className="bg-[var(--yellow-soft)]">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Veja também</p>
            <h2 className="section-title">Mais produtos da categoria {getCatalogCategory(product)}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => {
              const relatedTechnicalName = getTechnicalProductName(item);

              return (
                <article key={item.slug} className="product-card group">
                  <Link
                    href={`/produtos/${item.slug}`}
                    className="product-image-stage relative block aspect-square"
                    aria-label={`Ver ficha técnica de ${relatedTechnicalName}`}
                  >
                    <Image
                      src={item.image}
                      alt={relatedTechnicalName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="product-line-badge">{getProductLineBadge(item)}</span>
                  </Link>
                  <div className="product-card-body">
                    <p className="product-card-kicker">{getCatalogCategory(item)} • {getProductDisplaySize(item)}</p>
                    <h3 className="product-card-title brand-heading-font">{relatedTechnicalName}</h3>
                    <p className="product-box-label">
                      <span>Unidades por caixa</span>
                      <strong>{getBoxUnits(item)}</strong>
                    </p>
                    <a
                      className="button-primary product-card-cta"
                      href={getWholesaleWhatsAppHref(item)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Consultar Atacado
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductSpecificationGrid({
  product,
}: {
  product: Product;
}) {
  const specs = [
    {
      label: "Categoria",
      value: getCatalogCategory(product),
    },
    {
      label: "Peso / formato",
      value: getProductFormat(product),
    },
    {
      label: "Unidades por caixa",
      value: getBoxUnits(product),
    },
  ];

  return (
    <section className="product-spec-grid">
      {specs.map((spec) => (
        <article key={spec.label} className="product-spec-card">
          <span>{spec.label}</span>
          <strong>{spec.value}</strong>
        </article>
      ))}
    </section>
  );
}

function ProductNutritionCard({
  nutrition,
}: {
  nutrition: NonNullable<(typeof siteData.products)[number]["nutrition"]>;
}) {
  return (
    <section className="product-nutrition-card">
      <div className="product-nutrition-header">
        <div>
          <p className="eyebrow">Informação nutricional</p>
          <h2 className="brand-heading-font text-3xl leading-[0.95] text-[var(--ink)] md:text-4xl">
            Tabela nutricional da linha
          </h2>
        </div>

        <div className="product-nutrition-meta">
          <div>
            <span>Porção de referência</span>
            <strong>{nutrition.serving}</strong>
          </div>
          <div>
            <span>Apresentação original</span>
            <strong>{nutrition.packaging}</strong>
          </div>
        </div>
      </div>

      <div className="product-nutrition-table-wrap">
        <table className="product-nutrition-table">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Quantidade</th>
              <th>%VD*</th>
            </tr>
          </thead>
          <tbody>
            {nutrition.facts.map((fact) => (
              <tr key={fact.label}>
                <th scope="row">{fact.label}</th>
                <td>{fact.value}</td>
                <td>{fact.dailyValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="product-nutrition-note">{nutrition.disclaimer}</p>
    </section>
  );
}

function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}

function ContactSection() {
  return (
    <section className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-3xl bg-white p-7 shadow-[0_22px_60px_rgba(23,79,61,0.08)] md:p-9">
          <p className="eyebrow">Contato</p>
          <h2 className="section-title">
            Visite, ligue ou fale conosco sobre revenda
          </h2>
          <div className="mt-8 space-y-5">
            <ContactRow icon={<Phone className="h-5 w-5" />} label="Telefone" value={siteData.phone} />
            <ContactRow icon={<Mail className="h-5 w-5" />} label="Atendimento" value={siteData.email} />
            <ContactRow icon={<MapPin className="h-5 w-5" />} label="Endereço" value={siteData.address} />
          </div>
          <a className="button-primary mt-8" href={siteData.whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            Fale conosco
          </a>
        </div>

        <div className="min-h-[420px] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_22px_60px_rgba(23,79,61,0.08)]">
          <iframe
            title="Mapa da Doçura da Fazenda"
            src={siteData.mapEmbed}
            className="h-full min-h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--yellow-soft)] text-[var(--green)]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/45">
          {label}
        </p>
        <p className="mt-1 text-base leading-7 text-black/76">{value}</p>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Olá! Vim pelo site da Doçura da Fazenda e gostaria de falar com vocês.",
  );

  return (
    <a
      aria-label="Falar com a Doçura da Fazenda pelo WhatsApp"
      className="floating-whatsapp"
      href={`${siteData.whatsappUrl}?text=${message}`}
      rel="noreferrer"
      target="_blank"
    >
      <span className="floating-whatsapp-bubble">
        <strong>Oi! Precisa de ajuda?</strong>
        Fale com a Doçura pelo WhatsApp.
      </span>
      <span className="floating-whatsapp-button">
        <MessageCircle className="h-6 w-6" />
      </span>
    </a>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 520);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      aria-label="Voltar ao topo"
      className={`floating-to-top ${visible ? "floating-to-top-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}

function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[var(--wood)] text-[var(--cream)]">
      <Image
        src="/assets/images/emporio/emporio-atual-04.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-14"
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(50,27,18,0.98),rgba(23,79,61,0.92)_58%,rgba(182,66,45,0.78))]" />
      <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-[var(--yellow)] opacity-14 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="footer-compact grid gap-7 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:items-center">
          <div className="footer-brand-block flex gap-4">
            <Image
              src="/assets/images/logo.png"
              alt="Doçura da Fazenda"
              width={78}
              height={74}
              className="footer-logo"
            />
            <div>
              <p className="footer-title">Cambuí • Minas Gerais</p>
              <p className="mt-2 max-w-xl brand-heading-font text-3xl leading-tight footer-heading">
                Sabor mineiro desde 1998.
              </p>
            </div>
          </div>

          <div className="grid gap-2 text-sm leading-6 text-white/76">
            <p className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-[var(--yellow)]" />
              {siteData.phone}
            </p>
            <a
              className="flex gap-3 transition-colors duration-200 hover:text-white"
              href={siteData.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Star className="mt-1 h-4 w-4 shrink-0 text-[var(--yellow)]" />
              Instagram oficial
            </a>
            <p className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--yellow)]" />
              Rod. Fernão Dias, 894 • Cambuí - MG
            </p>
          </div>

          <div className="flex lg:justify-end">
            <a
              className="button-primary footer-button"
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-white/15 pt-5 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {siteData.nav.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs uppercase tracking-[0.12em] text-white/52">
            Doçura da Fazenda © 2026 •{" "}
            <a
              href="https://vocedigitalpropaganda.com.br/"
              target="_blank"
              rel="noreferrer"
              className="footer-credit-link"
            >
              Você Digital Propaganda
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
