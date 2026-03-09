import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";

const COLORS = {
  laranja: "#E36302",
  verde: "#028867",
  azul: "#3412E5",
  branco: "#FFFFFF",
  borda: "rgba(255,255,255,0.10)",
  fundo: "rgba(5,5,5,0.88)",
};

const FONT_FAMILY = 'Inter, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

const baseLinkStyle: CSSProperties = {
  color: COLORS.branco,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 15,
  letterSpacing: 0.3,
  padding: "10px 14px",
  borderRadius: 999,
  transition: "background-color 0.2s ease, transform 0.2s ease, color 0.2s ease",
};

function Header() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Início" },
    { to: "/palpite", label: "Palpite" },
    { to: "/historico", label: "Histórico" },
    { to: "/sorteio", label: "Sorteio" },
  ];

  return (
    <header
      style={{
        backgroundColor: COLORS.fundo,
        borderBottom: `1px solid ${COLORS.borda}`,
        color: COLORS.branco,
        padding: "14px 20px",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 14px 30px rgba(0, 0, 0, 0.28)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        backdropFilter: "blur(16px)",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            color: COLORS.branco,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: COLORS.verde,
              boxShadow: `0 0 0 6px ${COLORS.azul}55`,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: 18, fontWeight: 900 }}>Mega Suggester</strong>
            <span style={{ fontSize: 11, opacity: 0.7, letterSpacing: 1.2, textTransform: "uppercase" }}>
              painel de palpites
            </span>
          </div>
        </Link>

        <nav
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {links.map((link) => {
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  ...baseLinkStyle,
                  backgroundColor: isActive ? COLORS.azul : "transparent",
                  border: isActive ? `1px solid ${COLORS.azul}` : `1px solid transparent`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                  }
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;