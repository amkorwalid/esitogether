import Head from "next/head";
import Link from "next/link";

const sections = [
  { icon: "🏠", title: "Logement & Résidences", desc: "Résidences universitaires, cités étudiantes et informations sur le logement à Rabat." },
  { icon: "🚌", title: "Transport & Mobilité", desc: "Bus ALSA, tramway et cartes étudiantes pour se déplacer facilement dans la ville." },
  { icon: "📚", title: "Ressources Académiques", desc: "Cours, documents par filière et roadmaps d'autoformation pour progresser." },
  { icon: "🎉", title: "Vie Étudiante", desc: "Clubs, associations, événements et tout ce qui fait la vie étudiante à l'ESI." },
  { icon: "❓", title: "FAQ & Aide", desc: "Réponses aux questions fréquentes pour bien démarrer à l'ESI." },
  { icon: "🤖", title: "Chatbot ESI", desc: "Assistant intelligent pour répondre à vos questions sur le règlement intérieur." },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>ESI Together – Base de connaissances</title>
        <meta name="description" content="La base de connaissances des étudiants de l'ESI Rabat" />
      </Head>

      <div className="min-h-screen" style={{ background: "#0F2854" }}>
        {/* Navbar */}
        <nav className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5" style={{ borderBottom: "1px solid #1C4D8D" }}>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">ESI</span>
            <span className="text-2xl font-bold" style={{ color: "#BDE8F5" }}>Together</span>
          </div>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ background: "#1C4D8D" }}
          >
            Dashboard →
          </Link>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-12 sm:pt-24 pb-12 sm:pb-20">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "#122E63", color: "#BDE8F5", border: "1px solid #1C4D8D" }}
          >
            École des Sciences de l&apos;Information · Rabat
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl">
            Tout ce dont vous avez besoin,{" "}
            <span style={{ color: "#4988C4" }}>en un seul endroit</span>
          </h1>
          <p className="text-lg max-w-xl mb-10" style={{ color: "#7FAFD4" }}>
            ESI Together centralise toutes les ressources essentielles pour les étudiants de l&apos;ESI :
            logement, transport, cours, vie étudiante et bien plus encore.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3.5 rounded-xl text-base font-bold text-white transition-colors"
              style={{ background: "#1C4D8D" }}
            >
              Explorer la plateforme
            </Link>
            <Link
              href="/dashboard?section=chatbot"
              className="px-8 py-3.5 rounded-xl text-base font-medium transition-colors"
              style={{ background: "#122E63", border: "1px solid #4988C4", color: "#BDE8F5" }}
            >
              🤖 Chatbot ESI
            </Link>
          </div>
        </section>

        {/* Sections grid */}
        <section className="px-4 sm:px-8 pb-12 sm:pb-20 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Ce que vous trouverez sur ESI Together
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s) => (
              <Link
                key={s.title}
                href="/dashboard"
                className="rounded-xl p-6 transition-all hover:scale-[1.02] block"
                style={{ background: "#122E63", border: "1px solid #1C4D8D" }}
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm" style={{ color: "#7FAFD4" }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8" style={{ borderTop: "1px solid #1C4D8D", color: "#7FAFD4" }}>
          <p className="text-sm">© 2025 ESI Together · École des Sciences de l&apos;Information, Rabat</p>
        </footer>
      </div>
    </>
  );
}
