import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useSettings } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { CartPanel, SettingsPanel } from "@/components/FloatingIsland";

function HeaderActions() {
  const { items } = useCart();
  const [panel, setPanel] = useState<"cart" | "settings" | null>(null);

  return (
    <div className="relative ml-auto flex items-center gap-1.5 lg:ml-2">
      <button
        onClick={() => setPanel((p) => (p === "cart" ? null : "cart"))}
        aria-label="Koszyk"
        title="Koszyk"
        className={`relative flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-all hover:border-primary hover:glow-ring-strong ${
          panel === "cart" ? "border-primary bg-secondary glow-ring" : "border-border bg-surface"
        }`}
      >
        🛒
        {items.length ? (
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-surface-deep">
            {items.length}
          </span>
        ) : null}
      </button>

      <button
        onClick={() => setPanel((p) => (p === "settings" ? null : "settings"))}
        aria-label="Ustawienia"
        title="Ustawienia"
        className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-all hover:border-primary hover:glow-ring-strong ${
          panel === "settings"
            ? "border-primary bg-secondary glow-ring"
            : "border-border bg-surface"
        }`}
      >
        ⚙️
      </button>

      {panel ? (
        <div className="absolute right-0 top-full z-50 mt-2">
          {panel === "cart" ? (
            <CartPanel onClose={() => setPanel(null)} />
          ) : (
            <SettingsPanel onClose={() => setPanel(null)} />
          )}
        </div>
      ) : null}
    </div>
  );
}

const tabs = [
  { to: "/", key: "nav.finder", icon: "🏠" },
  { to: "/outfity", key: "nav.outfits", icon: "👕" },
  { to: "/sprzedawcy", key: "nav.sellers", icon: "🏬" },
  { to: "/agenci", key: "nav.agents", icon: "🧭" },
  { to: "/promocje", key: "nav.promos", icon: "🔥" },
  { to: "/poradnik", key: "nav.guide", icon: "📘" },
  { to: "/linki", key: "nav.tiktok", icon: "🎵" },
] as const;

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
                <span aria-hidden="true" className="mr-1.5">
                  {tb.icon}
                </span>
                {t(tb.key)}
              </Link>
            ))}
          </nav>
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
              <span aria-hidden="true" className="mr-1">
                {tb.icon}
              </span>
              {t(tb.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
