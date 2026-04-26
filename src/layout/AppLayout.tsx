import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { cn } from "@/lib/utils";
import weddingRingsImage from "@/assets/gold-wedding-rings-approaching.png";

const links = [
  { to: "/trilha", label: "Trilha" },
  { to: "/simulador", label: "Simulador" },
  { to: "/checklist", label: "Checklist" },
  { to: "/glossario", label: "Glossário" },
];

const AntesDoSimLogo = ({ className = "h-10 w-10" }: { className?: string }) => (
  <img
    src={weddingRingsImage}
    alt="Antes do Sim"
    width={80}
    height={80}
    className={cn("rounded-full border object-cover shadow-card", className)}
  />
);

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const { progress } = useLocalProgress();
  const completed = progress.modulosConcluidos.length;

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
        <div className="content-wrap flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Antes do Sim">
            <AntesDoSimLogo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => cn("nav-link", isActive && "active-nav")}>{link.label}</NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/progresso" className="rounded-md border bg-card px-3 py-2 text-sm font-semibold text-card-foreground transition-colors hover:bg-muted" aria-label={`Progresso: ${completed} de 5 módulos`}>
              {completed}/5 módulos
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="border-t bg-background px-4 py-3 md:hidden" aria-label="Menu mobile">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => cn("nav-link", isActive && "active-nav")}>{link.label}</NavLink>
              ))}
              <NavLink to="/progresso" onClick={() => setOpen(false)} className={({ isActive }) => cn("nav-link", isActive && "active-nav")}>Progresso {completed}/5</NavLink>
            </div>
          </nav>
        )}
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t bg-soft text-soft-foreground">
        <div className="content-wrap grid gap-6 px-4 py-8 text-sm sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div className="flex justify-center md:col-span-2">
            <AntesDoSimLogo className="h-7 w-7" />
          </div>
          <p>Este aplicativo tem fins educativos e informacionais. Não substitui consultoria jurídica. Consulte sempre um advogado.</p>
          <div className="flex flex-wrap gap-4 font-medium">
            {links.map((link) => <Link key={link.to} to={link.to} className="hover:text-primary">{link.label}</Link>)}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
