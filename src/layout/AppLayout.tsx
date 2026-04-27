import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/trilha", label: "Trilha" },
  { to: "/simulador", label: "Simulador" },
  { to: "/checklist", label: "Checklist" },
  { to: "/glossario", label: "Glossário" },
];

const AntesDoSimLogo = ({ className = "h-10 w-10" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={cn("text-primary", className)}
    role="img"
    aria-label="Antes do Sim"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="2.8" />
    <path
      d="M15.8 16.4c.35-3.1 2.75-5 5.6-5 3.25 0 5.55 2.05 5.55 5 0 2.25-1.15 3.45-3.05 4.7-1.65 1.1-2.25 1.95-2.25 3.55v.55h-3.05v-.8c0-2.25.9-3.55 2.8-4.85 1.65-1.1 2.25-1.85 2.25-3 0-1.4-.95-2.35-2.4-2.35-1.55 0-2.45 1-2.65 2.55l-2.8-.35Z"
      fill="currentColor"
    />
    <circle cx="20.15" cy="29" r="1.65" fill="currentColor" />
  </svg>
);

const AppLayout = () => {
  const [open, setOpen] = useState(false);

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
