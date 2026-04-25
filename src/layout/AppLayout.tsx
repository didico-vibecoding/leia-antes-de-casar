import { Menu, Sprout, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { cn } from "@/lib/utils";

const links = [
  { to: "/trilha", label: "Trilha" },
  { to: "/simulador", label: "Simulador" },
  { to: "/checklist", label: "Checklist" },
  { to: "/glossario", label: "Glossário" },
];

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const { progress } = useLocalProgress();
  const completed = progress.modulosConcluidos.length;

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
        <div className="content-wrap flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><Sprout className="h-5 w-5" /></span>
            <span className="font-serif text-xl font-bold tracking-normal">Viver de Bem Casado</span>
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
