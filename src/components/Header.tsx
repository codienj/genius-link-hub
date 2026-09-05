import { Link } from "@tanstack/react-router";
import { useSettings } from "@/lib/store";
import { LANGS, useLang } from "@/lib/i18n";

const tabs = [
  { to: "/", key: "nav.finder", icon: "🏠" },
  { to: "/outfity", key: "nav.outfits", icon: "👕" },
  { to: "/sprzedawcy", key: "nav.sellers", icon: "🏬" },
  { to: "/agenci", key: "nav.agents", icon: "🧭" },
  { to: "/promocje", key: "nav.promos", icon: "🔥" },
  { to: "/poradnik", key: "nav.guide", icon: "📘" },
  { to: "/linki", key: "nav.tiktok", icon: "🎵" },
] as const;

function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex max-w-[60vw] items-center gap-1 overflow-x-auto rounded-lg border border-border bg-secondary p-0.5">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={l.label}
          title={l.label}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
            lang === l.code ? "bg-surface text-primary glow-ring" : "text-muted-foreground"
          }`}
        >
          <span aria-hidden="true">{l.flag}</span>
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}



export function Header() {
  const { data: settings } = useSettings();
  const { t } = useLang();
  const logo = settings?.["agent_logo_url"];

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-2xl border border-border/60 bg-surface-deep/85 px-4 py-3 shadow-lg backdrop-blur-xl glow-ring sm:px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            {logo ? (
              <img
                src={logo}
                alt="Logo agenta"
                className="h-10 w-10 rounded-xl object-cover glow-ring"
              />
            ) : null}
            <span className="font-display text-lg font-bold tracking-tight text-gradient-brand">
              PKMREPS
            </span>
          </Link>
          <nav className="ml-auto hidden flex-wrap items-center gap-1 lg:flex">
            {tabs.map((tb) => (
              <Link
                key={tb.to}
                to={tb.to}
                activeOptions={{ exact: tb.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{
                  className:
                    "rounded-lg px-3 py-2 text-sm font-semibold text-primary bg-secondary glow-ring",
                }}
              >
                {t(tb.key)}
              </Link>
            ))}
          </nav>
          <div className="ml-auto lg:ml-2">
            <LanguageSwitcher />
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:hidden">
          {tabs.map((tb) => (
            <Link
              key={tb.to}
              to={tb.to}
              activeOptions={{ exact: tb.to === "/" }}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground"
              activeProps={{
                className:
                  "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-primary bg-secondary",
              }}
            >
              {t(tb.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
