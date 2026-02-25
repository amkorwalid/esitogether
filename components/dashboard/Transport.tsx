import contentData from "../../public/content/content.json";

const transport = contentData.sections.transport;

export default function Transport() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {transport.icon} {transport.title}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#7FAFD4" }}>
          Déplacez-vous facilement à Rabat
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(transport.subsections).map(([key, subsection]) =>
          subsection.content.map((item, i) => (
            <div
              key={`${key}-${i}`}
              className="rounded-xl p-5"
              style={{ background: "#122E63", border: "1px solid #1C4D8D" }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm mb-4" style={{ color: "#BDE8F5" }}>{item.description}</p>

              {Array.isArray((item as Record<string, unknown>)["Lignes direct"]) && (
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#7FAFD4" }}>
                    Lignes directes
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {((item as Record<string, unknown>)["Lignes direct"] as string[]).map((ligne) => (
                      <span
                        key={ligne}
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: "#1C4D8D" }}
                      >
                        {ligne}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.arrets && (
                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#7FAFD4" }}>
                    Arrêts desservis
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {item.arrets.map((arret) => (
                      <span
                        key={arret}
                        className="px-2 py-1 rounded text-xs"
                        style={{ background: "#0F2854", border: "1px solid #4988C4", color: "#BDE8F5" }}
                      >
                        {arret}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.prix && (
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span>💰</span>
                  <span className="font-medium" style={{ color: "#BDE8F5" }}>{item.prix}</span>
                </div>
              )}

              {item.lien && (
                <a
                  href={item.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs px-3 py-1.5 rounded-lg font-medium text-white"
                  style={{ background: "#1C4D8D" }}
                >
                  🌐 Plus d&apos;infos
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
