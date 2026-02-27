import { useState } from "react";
import { MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import {
  ArrowUpRight,
  BadgeDollarSign,
  Bus,
  Calculator,
  Factory,
  Instagram,
  Megaphone,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import instagramFeed from "./data/instagram-feed.json";

const whatsappLink =
  "https://wa.me/5535998116430?text=Ol%C3%A1!+Vi+a+Landing+Page+e+gostaria+de+receber+a+tabela+de+pre%C3%A7os+para+revenda.";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const benefits = [
  {
    icon: BadgeDollarSign,
    title: "Alta Lucratividade",
    text: "Margem competitiva para transformar prateleira em lucro recorrente.",
  },
  {
    icon: Bus,
    title: "Giro de Estoque",
    text: "Produto de alta aceitação em fluxo rodoviário e varejo alimentar.",
  },
  {
    icon: ShieldCheck,
    title: "Tradição de Cambuí",
    text: "Receita artesanal com padrão premium e recompra consistente.",
  },
];

const products = [
  { name: "Tradicional", image: "/Assets/Pote-Tradicional-c20-PS-2.png", line: "Linha clássica" },
  { name: "Chocolate", image: "/Assets/Chocolate-200g-PS-2.png", line: "Ticket alto" },
  { name: "Cocada", image: "/Assets/Cocada-200g-PS-3.png", line: "Compra por impulso" },
  { name: "Barra 400g", image: "/Assets/Barra-tradicional-400g.png", line: "Volume" },
  { name: "Ameixa", image: "/Assets/Ameixa-Pastoso.jpg", line: "Mix premium" },
  { name: "Coco", image: "/Assets/Coco-Pastoso.jpg", line: "Alta saída" },
];

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [unitsPerDay, setUnitsPerDay] = useState(18);
  const [marginPerUnit, setMarginPerUnit] = useState(4.5);
  const [firstOrder, setFirstOrder] = useState(1200);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowStickyCta(latest > 0.16 && latest < 0.94);
  });

  const reveal = (amount = 0.3, delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount },
          variants: fadeInUp,
          transition: { delay },
        };

  const monthlyProfit = Math.max(0, unitsPerDay * marginPerUnit * 30);
  const paybackDays = monthlyProfit > 0 ? Math.ceil(firstOrder / (monthlyProfit / 30)) : 0;
  const roiPercent = firstOrder > 0 ? Math.round((monthlyProfit / firstOrder) * 100) : 0;
  const instagramItems = (instagramFeed.items || []).slice(0, 3);
  const toBRL = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="font-body bg-[#f7efd3] text-caramel">
        <motion.div
          className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-[#ffb300]"
          style={{ scaleX: shouldReduceMotion ? 0 : scrollYProgress }}
        />

        <section className="relative overflow-hidden border-b-4 border-[#1a1a1a]">
          <div className="absolute inset-0">
            <img src="/Assets/BG-HOME.png" alt="Textura visual Doçura da Fazenda" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#100a04]/85 via-[#180d04]/70 to-[#2E4A23]/78" />
          </div>

          <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
            <img src="/Assets/logo (1).png" alt="Doçura da Fazenda" className="h-11 w-auto" />
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mc-btn mc-btn-gold inline-flex items-center gap-2 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.12em]"
            >
              tabela atacado
              <ArrowUpRight size={15} />
            </a>
          </header>

          <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 pb-20 pt-10 md:px-10">
            <motion.div {...reveal(0.3)} className="text-[#fdf8df]">
              <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#ffb300] bg-black/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em]">
                <Factory size={14} /> B2B para mercado e parada de ônibus
              </p>
              <h1 className="font-title text-4xl font-bold leading-[1.05] md:text-7xl">
                Leve a Tradição Mineira de Cambuí para sua Prateleira
              </h1>
              <p className="mt-5 max-w-2xl text-base text-[#f8eec4] md:text-xl">
                Aumente faturamento com o doce de leite que já vende sozinho nas estradas de Minas.
                Sem Doçura da Fazenda, seu concorrente captura essa venda no seu lugar.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mc-btn mc-btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.12em]"
                >
                  QUERO TABELA DE ATACADO
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="https://www.instagram.com/docuradafazenda_oficial/"
                  target="_blank"
                  rel="noreferrer"
                  className="mc-btn mc-btn-ghost inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]"
                >
                  <Instagram size={16} /> instagram
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b-2 border-[#1a1a1a] bg-[#ffb300] py-4">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 md:px-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#231100] md:text-sm">
              Revendedores parceiros já estão girando mais no ponto de venda.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mc-btn inline-flex items-center gap-2 rounded-xl border-[#231100] bg-transparent px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#231100]"
            >
              Receber tabela 2026 <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <motion.h2 {...reveal(0.4)} className="font-title text-3xl font-bold uppercase tracking-[0.06em] md:text-5xl">
            Benefícios B2B
          </motion.h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((item, index) => (
              <motion.article
                key={item.title}
                {...reveal(0.3, index * 0.08)}
                className="rounded-2xl border-2 border-[#1a1a1a] bg-[#fff7dc] p-6"
              >
                <item.icon size={24} className="text-[#2E4A23]" />
                <h3 className="mt-3 font-title text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-caramel/90">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-6 md:px-10">
          <motion.div
            {...reveal(0.25)}
            className="grid gap-5 rounded-2xl border-2 border-[#1a1a1a] bg-[#fff7dc] p-5 md:grid-cols-[1.2fr_0.8fr] md:p-7"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#2E4A23]">
                <Calculator size={14} />
                Simulador de Retorno para Lojista
              </p>
              <h3 className="mt-2 font-title text-3xl font-bold uppercase tracking-[0.05em]">
                Descubra o potencial de lucro no seu ponto de venda
              </h3>
              <p className="mt-3 text-sm text-caramel/90">
                Ajuste os números da sua operação e veja em segundos o retorno estimado da parceria.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <label className="text-xs font-bold uppercase tracking-[0.1em]">
                  Unidades/dia
                  <input
                    type="number"
                    min="0"
                    value={unitsPerDay}
                    onChange={(e) => setUnitsPerDay(Number(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border-2 border-[#1a1a1a] bg-white px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.1em]">
                  Margem unitária (R$)
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={marginPerUnit}
                    onChange={(e) => setMarginPerUnit(Number(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border-2 border-[#1a1a1a] bg-white px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.1em]">
                  1º pedido (R$)
                  <input
                    type="number"
                    min="0"
                    value={firstOrder}
                    onChange={(e) => setFirstOrder(Number(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border-2 border-[#1a1a1a] bg-white px-3 py-2 text-sm"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-xl border-2 border-[#1a1a1a] bg-[#2E4A23] p-5 text-[#fdf8df]">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ffe38d]">Resultado estimado</p>
              <p className="mt-2 font-title text-3xl">{toBRL(monthlyProfit)}</p>
              <p className="text-sm text-[#fdf8df]/85">Lucro bruto mensal potencial</p>
              <div className="mt-4 grid gap-2 text-sm">
                <p className="rounded-md border border-[#ffe38d]/40 px-3 py-2">
                  Payback: <strong>{paybackDays || 0} dias</strong>
                </p>
                <p className="rounded-md border border-[#ffe38d]/40 px-3 py-2">
                  ROI estimado/mês: <strong>{roiPercent}%</strong>
                </p>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mc-btn mc-btn-gold mt-4 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em]"
              >
                Quero validar meu mix
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </section>

        <section className="border-y-4 border-[#1a1a1a] bg-[#2f4f24] py-16 text-[#fdf8df]">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <motion.div {...reveal(0.3)} className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-title text-3xl font-bold uppercase tracking-[0.06em] md:text-5xl">
                Vitrine de Produtos
              </h2>
              <p className="max-w-lg text-sm uppercase tracking-[0.12em] text-[#ffe38d]">
                Produto de tradição com qualidade premium e giro de estoque acelerado
              </p>
            </motion.div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <motion.article
                  key={product.name}
                  {...reveal(0.25, index * 0.05)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[#ffe38d] bg-[#2E4A23] transition duration-300 hover:scale-105"
                >
                  <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gradient-to-b from-[#18447f] to-[#0b1e3b]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,227,141,0.22),transparent_55%)]" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-end p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ffe38d]">{product.line}</p>
                    <h3 className="mt-1 font-title text-2xl font-bold">{product.name}</h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 md:px-10">
          <motion.div {...reveal(0.3)} className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#2E4A23]">
                <Megaphone size={14} />
                Material de Apoio para Ações de Marketing
              </p>
              <h2 className="mt-2 font-title text-3xl font-bold uppercase tracking-[0.06em] md:text-5xl">
                Você não vende sozinho
              </h2>
            </div>
          </motion.div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <motion.article {...reveal(0.2, 0)} className="rounded-2xl border-2 border-[#1a1a1a] bg-[#fff7dc] p-5">
              <PackageCheck size={20} className="text-[#2E4A23]" />
              <h3 className="mt-3 font-title text-2xl">Kit de PDV</h3>
              <p className="mt-2 text-sm text-caramel/90">
                Peças para balcão e comunicação visual para acelerar compra por impulso.
              </p>
            </motion.article>
            <motion.article {...reveal(0.2, 0.06)} className="rounded-2xl border-2 border-[#1a1a1a] bg-[#fff7dc] p-5">
              <Instagram size={20} className="text-[#2E4A23]" />
              <h3 className="mt-3 font-title text-2xl">Artes para Redes</h3>
              <p className="mt-2 text-sm text-caramel/90">
                Conteúdo pronto para Instagram e WhatsApp da loja, focado em tráfego local.
              </p>
            </motion.article>
            <motion.article {...reveal(0.2, 0.12)} className="rounded-2xl border-2 border-[#1a1a1a] bg-[#fff7dc] p-5">
              <Megaphone size={20} className="text-[#2E4A23]" />
              <h3 className="mt-3 font-title text-2xl">Campanhas Sazonais</h3>
              <p className="mt-2 text-sm text-caramel/90">
                Sugestões promocionais para datas de alto fluxo e aumento de ticket médio.
              </p>
            </motion.article>
          </div>
          <motion.div
            {...reveal(0.24, 0.1)}
            className="mt-5 grid gap-4 rounded-2xl border-2 border-[#1a1a1a] bg-[#2E4A23] p-5 text-[#fdf8df] md:grid-cols-[1.1fr_0.9fr]"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ffe38d]">
                O que você recebe para vender mais
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="rounded-md border border-[#ffe38d]/30 px-3 py-2">Posts prontos para feed e stories</li>
                <li className="rounded-md border border-[#ffe38d]/30 px-3 py-2">Artes para WhatsApp e status da loja</li>
                <li className="rounded-md border border-[#ffe38d]/30 px-3 py-2">Peças de balcão para ativação no PDV</li>
                <li className="rounded-md border border-[#ffe38d]/30 px-3 py-2">Calendário de campanhas sazonais</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#ffe38d]/40 bg-[#3a5f2d] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ffe38d]">Entrega rápida</p>
              <h4 className="mt-1 font-title text-3xl">Kit Marketing B2B</h4>
              <p className="mt-2 text-sm text-[#fdf8df]/90">
                Você recebe materiais organizados para publicar e ativar o ponto de venda sem depender de agência.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mc-btn mc-btn-gold mt-4 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em]"
              >
                Solicitar kit de divulgação
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto grid max-w-7xl items-start gap-6 px-6 py-12 md:grid-cols-2 md:px-10">
          <motion.div {...reveal(0.25)} className="h-fit rounded-2xl border-2 border-[#1a1a1a] bg-[#fff7dc] p-7">
            <h2 className="font-title text-3xl font-bold uppercase tracking-[0.06em] md:text-4xl">Por que nós?</h2>
            <p className="mt-4 text-caramel/95">
              Parceria real de fornecimento: tradição, padrão de qualidade e logística eficiente para
              paradas de estrada e supermercados. Você vende mais e evita ruptura no ponto de venda.
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Truck size={16} className="mt-0.5 text-[#2E4A23]" />
                Entrega organizada para manter reposição ativa.
              </li>
              <li className="flex items-start gap-2">
                <BadgeDollarSign size={16} className="mt-0.5 text-[#2E4A23]" />
                Condições de revenda para aumentar margem.
              </li>
              <li className="flex items-start gap-2">
                <Bus size={16} className="mt-0.5 text-[#2E4A23]" />
                Produto de apelo imediato em fluxo rodoviário.
              </li>
            </ul>
          </motion.div>

          <motion.div
            {...reveal(0.25, 0.1)}
            className="relative h-[420px] overflow-hidden rounded-2xl border-2 border-[#1a1a1a] bg-[#2E4A23] md:h-[500px]"
          >
            <img
              src="/Assets/Display-1.png"
              alt="Exposição de produtos Doçura da Fazenda"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[#ffe38d]/60 bg-black/45 px-3 py-2 text-center text-[#fdf8df]">
                <p className="text-[10px] uppercase tracking-[0.1em]">Reposição</p>
                <p className="font-title text-xl">Sem ruptura</p>
              </div>
              <div className="rounded-lg border border-[#ffe38d]/60 bg-black/45 px-3 py-2 text-center text-[#fdf8df]">
                <p className="text-[10px] uppercase tracking-[0.1em]">Percepção</p>
                <p className="font-title text-xl">Premium</p>
              </div>
              <div className="rounded-lg border border-[#ffe38d]/60 bg-black/45 px-3 py-2 text-center text-[#fdf8df]">
                <p className="text-[10px] uppercase tracking-[0.1em]">Resultado</p>
                <p className="font-title text-xl">Giro alto</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-[#2E4A23] py-16 text-[#fdf8df]">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <motion.div {...reveal(0.3)} className="flex items-center justify-between gap-4">
              <h2 className="font-title text-3xl font-bold uppercase tracking-[0.06em] md:text-4xl">Instagram</h2>
              <a
                href="https://www.instagram.com/docuradafazenda_oficial/"
                target="_blank"
                rel="noreferrer"
                className="mc-btn mc-btn-ghost inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em]"
              >
                <Instagram size={14} /> @docuradafazenda_oficial
              </a>
            </motion.div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {instagramItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  {...reveal(0.2, index * 0.06)}
                  href={item.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-xl border-2 border-[#fdf8df]/70"
                >
                  <img
                    src={item.image}
                    alt={item.caption || "Preview Instagram"}
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t-4 border-[#1a1a1a] bg-[#ffb300] text-[#231100]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-10">
            <div>
              <p className="font-bold uppercase tracking-[0.08em]">Doçura da Fazenda</p>
              <p>Doçura da Fazenda - Cambuí - MG, 37600-000, Brasil.</p>
              <p>CNPJ: 00.000.000/0000-00</p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mc-btn inline-flex items-center gap-2 rounded-xl border-[#231100] bg-transparent px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#231100]"
            >
              <MessageCircle size={15} /> Falar no WhatsApp
            </a>
          </div>
        </footer>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          className="mc-btn fixed bottom-24 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-[#fdf8df] bg-[#2E4A23] text-[#fdf8df] animate-float-pulse md:bottom-5"
        >
          <MessageCircle size={26} />
        </a>

        <motion.div
          initial={shouldReduceMotion ? false : { y: 120, opacity: 0 }}
          animate={
            showStickyCta
              ? { y: 0, opacity: 1, pointerEvents: "auto" }
              : { y: 120, opacity: 0, pointerEvents: "none" }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-3 left-1/2 z-[60] w-[min(680px,94vw)] -translate-x-1/2 rounded-xl border-2 border-[#1a1a1a] bg-[#111111] px-3 py-2 text-[#fdf8df]"
        >
          <div className="mx-auto flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] md:text-xs">
              Sem o produto no mix, você perde venda diária.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mc-btn mc-btn-gold inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] md:text-[11px]"
            >
              Receber tabela
              <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
