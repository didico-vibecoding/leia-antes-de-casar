import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import univaliLogo from "@/assets/univali-logo-azul.png.asset.json";

const links = [
  { to: "/trilha", label: "Trilha" },
  { to: "/simulador", label: "Simulador" },
  { to: "/checklist", label: "Checklist" },
];


const AppLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8E8EC", fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="content-wrap flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Univali — Antes do Sim">
            <img src={univaliLogo.url} alt="Univali" className="h-9 w-auto" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 500 }}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "text-[#0C0C0E] hover:text-[#005D99] hover:underline underline-offset-8 decoration-[#005D99] decoration-[1.5px]",
                    isActive && "text-[#005D99] underline",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu" style={{ color: "#0C0C0E" }}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="px-4 py-3 md:hidden" aria-label="Menu mobile" style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #E8E8EC", fontFamily: "Inter, system-ui, sans-serif" }}>
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 500 }}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 text-sm text-[#0C0C0E] hover:text-[#005D99]",
                      isActive && "text-[#005D99] underline underline-offset-8 decoration-[#005D99]",
                    )
                  }
                >
                  {link.label}
                </NavLink>
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
