"use client";

import { animate, stagger } from "animejs";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  Star,
  Store,
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

const accentPattern = /[À-ÖØ-öø-ÿ]/;

function AccentText({ text }: { text: string }) {
  return Array.from(text).map((character, index) =>
    accentPattern.test(character) ? (
      <span className="accent-glyph" key={`${character}-${index}`}>
        {character}
      </span>
    ) : (
      character
    ),
  );
}

export function SiteShell({ page, productSlug }: SiteShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    animate(".enter > *", {
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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[rgba(255,248,233,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-3" href="/">
          <Image
            src="/assets/images/logo.png"
            alt="Doçura da Fazenda"
            width={66}
            height={62}
            priority
            className="h-14 w-auto"
          />
          <div className="hidden min-[430px]:block">
            <p className="font-[family:var(--font-heading)] text-xl leading-none">
              <AccentText text="Doçura da Fazenda" />
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--green)]">
              Cambuí • MG
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteData.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${
                item.href === (page === "home" ? "/" : `/${page}`)
                  ? "text-[var(--red)]"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="button-primary hidden sm:inline-flex"
            href={siteData.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Fale conosco
          </a>
          <button
            aria-label={mobileMenuOpen ? "Fechar navegação" : "Abrir navegação"}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[var(--wood)] shadow-sm lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-black/10 bg-[var(--cream)] px-4 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4">
            {siteData.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold uppercase tracking-[0.12em]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
          <>
            <Image
              src={activeBanner.fallback ?? activeBanner.media}
              alt=""
              fill
              priority
              className="absolute inset-0 object-cover"
            />
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src={activeBanner.media}
            />
          </>
        ) : (
          <Image
            src={activeBanner.media}
            alt=""
            fill
            priority={activeIndex === 0}
            className="absolute inset-0 object-cover"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-4 pb-28 pt-14 md:px-6">
        <div key={activeBanner.title} className="hero-slide-copy glass-panel max-w-2xl">
          <p className="eyebrow">{activeBanner.eyebrow}</p>
          <h1 className="hero-title">
            <AccentText text={activeBanner.title} />
          </h1>
          <p className="hero-copy">{activeBanner.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="button-primary" href={activeBanner.href}>
              <ShoppingBag className="h-4 w-4" />
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
    <section className="border-y border-black/10 bg-white">
      <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-6">
        {items.map(([value, label]) => (
          <div key={value} className="py-6 md:px-8">
            <p className="font-[family:var(--font-heading)] text-4xl leading-none text-[var(--green)]">
              <AccentText text={value} />
            </p>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-black/55">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="photo-frame relative min-h-[460px] overflow-hidden">
          <Image
            src="/assets/images/emporio-1-1280x860-1.jpeg"
            alt="Interior do empório Doçura da Fazenda"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">{siteData.about.eyebrow}</p>
          <h2 className="section-title">
            <AccentText text={siteData.about.title} />
          </h2>
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
      </div>

      <div className="pillar-grid mt-14 grid gap-4 md:grid-cols-4">
        {siteData.about.pillars.map((pillar) => (
          <article key={pillar.title} className="pillar-card">
            <div className="pillar-icon relative h-16 w-16">
              <Image src={pillar.image} alt={pillar.title} fill className="object-contain p-1" />
            </div>
            <h3 className="mt-5 font-[family:var(--font-heading)] text-2xl">
              <AccentText text={pillar.title} />
            </h3>
            <p className="mt-3 text-sm leading-7">{pillar.body}</p>
          </article>
        ))}
      </div>
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
            <h2 className="section-title">
              <AccentText text={siteData.productsIntro.title} />
            </h2>
            <p className="section-copy">{siteData.productsIntro.body}</p>
          </div>
          <Link className="button-primary" href="/products">
            <ShoppingBag className="h-4 w-4" />
            Ver linha completa
          </Link>
        </div>
        <FeaturedProductCategories />
        <ProductShowcase3D />
        <ProductGrid limit={6} />
      </div>
    </section>
  );
}

function ProductShowcase3D() {
  const showcaseProducts = siteData.products.slice(8, 16);
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
        <p className="eyebrow">Destaques da vitrine</p>
        <h3 className="font-[family:var(--font-heading)] text-4xl leading-none md:text-5xl">
          <AccentText text="Um carrossel para sentir a linha girando na prateleira." />
        </h3>
        <p className="mt-4 text-base leading-8 text-white/78">
          Navegue pelos sabores em destaque e abra a página do produto para falar
          direto no WhatsApp.
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
              href={`/products/${product.slug}`}
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
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {siteData.productCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/products#${category.slug}`}
          className="category-card group"
        >
          <div className="product-image-stage relative h-72">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-contain p-8 transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="border-t border-black/10 p-5">
            <p className="eyebrow">{category.name}</p>
            <p className="mt-3 text-sm leading-7 text-black/68">
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
  products?: typeof siteData.products;
}) {
  const products = providedProducts ?? (limit ? siteData.products.slice(0, limit) : siteData.products);

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link key={product.slug} href={`/products/${product.slug}`} className="product-card group">
          <div className="product-image-stage relative h-72">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="border-t border-black/10 p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--green)]">
              {product.category} • {product.size}
            </p>
            <h3 className="mt-2 font-[family:var(--font-heading)] text-2xl">
              <AccentText text={product.name} />
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/68">
              {product.description}
            </p>
            <span className="mt-5 inline-flex text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--red)]">
              Ver detalhes
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ResellerSection() {
  return (
    <section className="section-shell">
      <div className="grid overflow-hidden rounded-[15px] bg-[var(--green)] text-white shadow-[0_24px_65px_rgba(23,79,61,0.18)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="p-7 md:p-10">
          <p className="eyebrow text-[var(--yellow)]">Parcerias</p>
          <h2 className="section-title text-white">
            <AccentText text={siteData.reseller.title} />
          </h2>
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
            Quero revender
          </a>
        </div>
        <div className="grid min-h-[360px] grid-cols-2 gap-2 p-2">
          {siteData.gallery.map((image) => (
            <div key={image} className="photo-frame relative overflow-hidden">
              <Image src={image} alt="Galeria do empório" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="bg-white">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Avaliações</p>
          <h2 className="section-title">
            <AccentText text="Reconhecida por quem valoriza sabor, tradição e qualidade" />
          </h2>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden border border-black/10 bg-black/10 lg:grid-cols-3">
          {siteData.reviews.map((review) => (
            <article key={review.author} className="bg-white p-6">
              <div className="flex gap-1 text-[var(--yellow-deep)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base leading-8 text-black/78">{review.text}</p>
              <p className="mt-6 font-semibold">{review.author}</p>
              <p className="text-sm text-black/55">{review.date}</p>
            </article>
          ))}
        </div>
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
          src="/assets/images/emporio-0-1280x860-1.jpeg"
          alt=""
          fill
          priority
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(36,23,15,0.88),rgba(23,79,61,0.72),rgba(243,197,21,0.28))]" />
        <div className="relative mx-auto grid min-h-[480px] max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-[1fr_0.72fr] md:px-6">
          <div className="max-w-3xl text-white">
            <p className="eyebrow text-[var(--yellow)]">Nossos produtos</p>
            <h1 className="mt-3 font-[family:var(--font-heading)] text-5xl leading-none md:text-7xl">
              <AccentText text="A linha completa da Doçura da Fazenda." />
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Pastosos, barras, tabletes, potes e displays para consumo,
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
            <AccentText text="Escolha pela ocasião de consumo ou venda" />
          </h2>
          <p className="section-copy">{siteData.productsIntro.body}</p>
        </div>
        <FeaturedProductCategories />
      </section>

      <section className="section-shell pt-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Catálogo completo</p>
            <h2 className="section-title">
              <AccentText text="Todos os produtos" />
            </h2>
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

function ProductSegments() {
  return (
    <div className="mt-10 grid gap-12">
      {siteData.productCategories.map((category) => {
        const products = siteData.products.filter(
          (product) => product.category === category.name,
        );

        return (
          <section key={category.slug} id={category.slug} className="product-segment">
            <div className="product-segment-header">
              <div>
                <p className="eyebrow">{category.name}</p>
                <h3 className="font-[family:var(--font-heading)] text-4xl leading-none">
                  <AccentText
                    text={
                      category.name === "Display"
                        ? "Displays e potes para ponto de venda"
                        : category.name === "Pastoso"
                          ? "Doces pastosos por sabor e embalagem"
                          : "Barras e tabletes de 400 g"
                    }
                  />
                </h3>
              </div>
              <p>{category.description}</p>
            </div>

            <ProductGrid products={products} />
          </section>
        );
      })}
    </div>
  );
}

function ProductDetailPage({ productSlug }: { productSlug?: string }) {
  const product = siteData.products.find((item) => item.slug === productSlug) ?? siteData.products[0];
  const relatedProducts = siteData.products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 4);
  const whatsappHref = `${siteData.whatsappUrl}?text=${encodeURIComponent(
    `Olá! Gostaria de saber mais sobre o produto ${product.name}.`,
  )}`;

  return (
    <main>
      <section className="section-shell">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--green)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos produtos
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="product-detail-media">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-8 md:p-12"
            />
          </div>

          <div>
            <p className="eyebrow">{product.category} • {product.size}</p>
            <h1 className="section-title">
              <AccentText text={product.name} />
            </h1>
            <p className="section-copy">{product.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Receita mineira", "Produção artesanal", "Ideal para revenda"].map((item) => (
                <div key={item} className="product-feature-pill">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="button-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Pedir pelo WhatsApp
              </a>
              <Link className="button-outline" href="/contact">
                <MapPin className="h-4 w-4" />
                Ver localização
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yellow-soft)]">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Veja também</p>
            <h2 className="section-title">
              <AccentText text={`Mais produtos da categoria ${product.category}`} />
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="product-card group">
                  <div className="product-image-stage relative h-60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-6 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-black/10 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--green)]">
                    {item.size}
                  </p>
                  <h3 className="mt-2 font-[family:var(--font-heading)] text-2xl">
                    <AccentText text={item.name} />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
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
        <div className="bg-white p-7 shadow-[0_22px_60px_rgba(23,79,61,0.08)] md:p-9">
          <p className="eyebrow">Contato</p>
          <h2 className="section-title">
            <AccentText text="Visite, ligue ou fale conosco sobre revenda" />
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

        <div className="photo-frame min-h-[420px] overflow-hidden border border-black/10 bg-white">
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

function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[var(--wood)] text-[var(--cream)]">
      <Image
        src="/assets/images/11-1280x860-1.jpeg"
        alt=""
        fill
        aria-hidden="true"
        className="absolute inset-0 object-cover opacity-14"
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(50,27,18,0.98),rgba(23,79,61,0.92)_58%,rgba(182,66,45,0.78))]" />
      <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-[var(--yellow)] opacity-14 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="footer-compact grid gap-7 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:items-center">
          <div className="flex gap-4">
            <Image
              src="/assets/images/logo.png"
              alt="Doçura da Fazenda"
              width={78}
              height={74}
              className="footer-logo"
            />
            <div>
              <p className="footer-title">Cambuí • Minas Gerais</p>
              <p className="mt-2 max-w-xl font-[family:var(--font-heading)] text-3xl leading-tight footer-heading">
                <AccentText text="Sabor mineiro desde 1998." />
              </p>
            </div>
          </div>

          <div className="grid gap-2 text-sm leading-6 text-white/76">
            <p className="flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-[var(--yellow)]" />
              {siteData.phone}
            </p>
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
            Doçura da Fazenda © 2026 • Você Digital Propaganda
          </p>
        </div>
      </div>
    </footer>
  );
}
