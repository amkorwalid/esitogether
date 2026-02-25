"use client";
import Head from "next/head";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const sections = [
  { icon: "🏠", title: "Logement & Résidences", desc: "Résidences universitaires, cités étudiantes et informations sur le logement à Rabat." },
  { icon: "🚌", title: "Transport & Mobilité", desc: "Bus ALSA, tramway et cartes étudiantes pour se déplacer facilement dans la ville." },
  { icon: "📚", title: "Ressources Académiques", desc: "Cours, documents par filière et roadmaps d'autoformation pour progresser." },
  { icon: "🎉", title: "Vie Étudiante", desc: "Clubs, associations, événements et tout ce qui fait la vie étudiante à l'ESI." },
  { icon: "❓", title: "FAQ & Aide", desc: "Réponses aux questions fréquentes pour bien démarrer à l'ESI." },
  { icon: "🤖", title: "Chatbot ESI", desc: "Assistant intelligent pour répondre à vos questions sur le règlement intérieur." },
];

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [target]);
  return <span>{display}{suffix}</span>;
}

/* ─── Floating particle ─── */
function Particle({ x, y, size, duration, delay }: { x: number; y: number; size: number; duration: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(73,136,196,0.7), transparent)`,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── 3D tilt card ─── */
function TiltCard({ s, index }: { s: typeof sections[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleLeave() {
    animate(x, 0, { duration: 0.4 });
    animate(y, 0, { duration: 0.4 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800, background: "#122E63", border: "1px solid #1C4D8D" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.04 }}
      className="relative rounded-xl p-6 cursor-pointer group"
    >
      {/* glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(73,136,196,0.15), transparent 70%)",
          boxShadow: "0 0 40px rgba(73,136,196,0.25)",
        }}
      />
      {/* icon bounce */}
      <motion.div
        className="text-3xl mb-3"
        whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: "preserve-3d", translateZ: 20 }}
      >
        {s.icon}
      </motion.div>
      <h3 className="text-base font-semibold text-white mb-2" style={{ transform: "translateZ(10px)" }}>
        {s.title}
      </h3>
      <p className="text-sm" style={{ color: "#7FAFD4" }}>{s.desc}</p>

      {/* animated bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
        style={{ background: "linear-gradient(90deg, #1C4D8D, #4988C4, #BDE8F5)" }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

/* ─── Blob background ─── */
function Blob({ cx, cy, color, duration }: { cx: string; cy: string; color: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        width: 400,
        height: 400,
        left: cx,
        top: cy,
        background: color,
        opacity: 0.12,
        transform: "translate(-50%,-50%)",
      }}
      animate={{ scale: [1, 1.25, 1], x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── Typewriter ─── */
function Typewriter({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [text]);
  return <span className={className}>{displayed}<span className="animate-pulse">|</span></span>;
}

/* ─── Stats bar ─── */
const stats = [
  { label: "Étudiants", value: 3000, suffix: "+" },
  { label: "Ressources", value: 50, suffix: "+" },
  { label: "Clubs actifs", value: 5, suffix: "" },
  { label: "Sections", value: 6, suffix: "" },
];

/* ════════════════════════════════════════════ */
export default function Home() {
  /* track mouse for hero spotlight */
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  return (
    <>
      <Head>
        <title>ESI Together – Base de connaissances</title>
        <meta name="description" content="La base de connaissances des étudiants de l'ESI Rabat" />
      </Head>

      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "#0F2854" }}
        onMouseMove={(e) =>
          setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
        }
      >
        {/* ── Background blobs ── */}
        <Blob cx="10%" cy="20%" color="#1C4D8D" duration={9} />
        <Blob cx="85%" cy="15%" color="#4988C4" duration={12} />
        <Blob cx="60%" cy="75%" color="#122E63" duration={10} />

        {/* ── Particles ── */}
        {[
          { x: 5,  y: 15, size: 6,  dur: 4,  del: 0   },
          { x: 90, y: 20, size: 4,  dur: 5,  del: 1   },
          { x: 25, y: 80, size: 8,  dur: 6,  del: 0.5 },
          { x: 70, y: 60, size: 5,  dur: 4.5,del: 2   },
          { x: 50, y: 10, size: 7,  dur: 7,  del: 1.5 },
          { x: 15, y: 50, size: 4,  dur: 5.5,del: 0.8 },
          { x: 80, y: 85, size: 9,  dur: 8,  del: 2.5 },
          { x: 40, y: 40, size: 3,  dur: 3.5,del: 0.3 },
          { x: 95, y: 55, size: 6,  dur: 6,  del: 1.8 },
          { x: 30, y: 95, size: 5,  dur: 5,  del: 3   },
        ].map((p, i) => (
          <Particle key={i} x={p.x} y={p.y} size={p.size} duration={p.dur} delay={p.del} />
        ))}

        {/* ── Mouse spotlight ── */}
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-all duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(73,136,196,0.07), transparent 60%)`,
          }}
        />

        {/* ══ NAVBAR ══ */}
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5"
          style={{ borderBottom: "1px solid #1C4D8D" }}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-bold text-white">ESI</span>
            <span className="text-2xl font-bold" style={{ color: "#BDE8F5" }}>Together</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors relative overflow-hidden"
              style={{ background: "#1C4D8D" }}
            >
              <motion.span
                className="absolute inset-0 opacity-0 hover:opacity-100"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              Dashboard →
            </Link>
          </motion.div>
        </motion.nav>

        {/* ══ HERO ══ */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-12 sm:pt-24 pb-12 sm:pb-20">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "#122E63", color: "#BDE8F5", border: "1px solid #1C4D8D" }}
          >
            École des Sciences de l&apos;Information · Rabat
          </motion.div>

          {/* main heading — words animate in */}
          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
          >
            {"Tout ce dont vous avez besoin,".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.45, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              style={{ color: "#4988C4" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="inline-block relative"
            >
              en un seul endroit
              {/* animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg,#4988C4,#BDE8F5)" }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
              />
            </motion.span>
          </motion.h1>

          {/* subtext */}
          <motion.p
            className="text-lg max-w-xl mb-10"
            style={{ color: "#7FAFD4" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            ESI Together centralise toutes les ressources essentielles pour les étudiants de l&apos;ESI :
            logement, transport, cours, vie étudiante et bien plus encore.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(73,136,196,0.5)" }} whileTap={{ scale: 0.97 }} className="rounded-xl">
              <Link
                href="/dashboard"
                className="block px-8 py-3.5 rounded-xl text-base font-bold text-white transition-colors"
                style={{ background: "#1C4D8D" }}
              >
                Explorer la plateforme
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} className="rounded-xl">
              <Link
                href="/dashboard"
                className="block px-8 py-3.5 rounded-xl text-base font-medium transition-colors"
                style={{ background: "#122E63", border: "1px solid #4988C4", color: "#BDE8F5" }}
              >
                🤖 Chatbot ESI
              </Link>
            </motion.div>
          </motion.div>

          {/* scroll indicator */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <span className="text-xs" style={{ color: "#4988C4" }}>Défiler</span>
            <motion.div
              className="w-[2px] h-8 rounded-full"
              style={{ background: "linear-gradient(#4988C4, transparent)" }}
              animate={{ scaleY: [0, 1, 0], originY: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </section>

        {/* ══ STATS BAR ══ */}
        <motion.section
          className="relative z-10 px-4 sm:px-8 pb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: "#1C4D8D" }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-6 px-4"
                style={{ background: "#0F2854" }}
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs mt-1" style={{ color: "#7FAFD4" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══ SECTIONS GRID ══ */}
        <section className="relative z-10 px-4 sm:px-8 pb-12 sm:pb-20 max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-white text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ce que vous trouverez sur{" "}
            <span style={{ color: "#4988C4" }}>ESI Together</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s, i) => (
              <Link key={s.title} href="/dashboard" className="block">
                <TiltCard s={s} index={i} />
              </Link>
            ))}
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <motion.footer
          className="relative z-10 text-center py-8"
          style={{ borderTop: "1px solid #1C4D8D", color: "#7FAFD4" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm">© 2025 ESI Together · École des Sciences de l&apos;Information, Rabat</p>
        </motion.footer>
      </div>
    </>
  );
}