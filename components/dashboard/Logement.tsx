import contentData from "../../public/content/content.json";

const logement = contentData.sections.logement;

export default function Logement() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {logement.icon} {logement.title}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#7FAFD4" }}>
          Trouvez votre logement idéal à Rabat
        </p>
      </div>

      {Object.entries(logement.subsections).map(([key, subsection]) => (
        <div key={key} className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 pb-2" style={{ borderBottom: "1px solid #1C4D8D" }}>
            {subsection.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {subsection.content.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{ background: "#122E63", border: "1px solid #1C4D8D" }}
              >
                <h4 className="text-base font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm mb-3" style={{ color: "#BDE8F5" }}>{item.description}</p>

                {item.details && (
                  <ul className="space-y-1 mb-3">
                    {item.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#7FAFD4" }}>
                        <span className="mt-0.5 text-xs">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="space-y-1 text-sm">
                  {item.prix && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#7FAFD4" }}>💰</span>
                      <span className="font-medium" style={{ color: "#BDE8F5" }}>{item.prix}</span>
                    </div>
                  )}
                  {item.contact && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#7FAFD4" }}>📞</span>
                      <span style={{ color: "#BDE8F5" }}>{item.contact}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                  {item.lien && (
                    <a
                      href={item.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg font-medium text-white transition-colors"
                      style={{ background: "#1C4D8D" }}
                    >
                      🌐 Site officiel
                    </a>
                  )}
                  {item.localisation && (
                    <a
                      href={item.localisation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                      style={{ background: "#0F2854", border: "1px solid #4988C4", color: "#BDE8F5" }}
                    >
                      📍 Localisation
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
