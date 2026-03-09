import { Link } from "react-router-dom";

const COLORS = {
  laranja: "#E36302",
  verde: "#028867",
  azul: "#3412E5",
  branco: "#FFFFFF",
  preto: "#000000",
  fundo: "#050505",
  painel: "rgba(255, 255, 255, 0.04)",
  borda: "rgba(255, 255, 255, 0.09)",
  textoSecundario: "rgba(255, 255, 255, 0.72)",
};

const FONT_FAMILY =
  'Inter, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

function HomePage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 94px)",
        backgroundColor: COLORS.fundo,
        padding: "40px 20px 56px",
        fontFamily: FONT_FAMILY,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <section
          style={{
            backgroundColor: COLORS.painel,
            border: `1px solid ${COLORS.borda}`,
            borderRadius: 28,
            padding: "40px clamp(20px, 4vw, 44px)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "8px 14px",
              borderRadius: 999,
              backgroundColor: "rgba(52, 18, 229, 0.2)",
              color: COLORS.branco,
              fontWeight: 700,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.4,
              marginBottom: 18,
            }}
          >
            Projeto de portfólio
          </div>

          <h1
            style={{
              margin: "0 0 14px",
              color: COLORS.branco,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.02,
              fontWeight: 900,
              maxWidth: 760,
            }}
          >
            Monte, salve e acompanhe seus palpites em uma experiência com cara
            de produto real.
          </h1>

          <p
            style={{
              margin: 0,
              color: COLORS.textoSecundario,
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 760,
            }}
          >
            Gere apostas automáticas, monte sua cartela manualmente e consulte o
            histórico em um painel escuro, moderno e inspirado na Mega-Sena.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 28,
            }}
          >
            <Link
              to="/palpite"
              style={{
                backgroundColor: COLORS.verde,
                color: COLORS.branco,
                textDecoration: "none",
                padding: "14px 22px",
                borderRadius: 14,
                fontWeight: 800,
              }}
            >
              Começar agora
            </Link>
            <Link
              to="/historico"
              style={{
                backgroundColor: "transparent",
                color: COLORS.branco,
                textDecoration: "none",
                padding: "14px 22px",
                borderRadius: 14,
                fontWeight: 800,
                border: `1px solid ${COLORS.borda}`,
              }}
            >
              Ver histórico
            </Link>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {[
            {
              titulo: "Cartela manual",
              texto:
                "Escolha seus 6 números em uma grade inspirada no volante real da Mega-Sena.",
              cor: COLORS.verde,
            },
            {
              titulo: "Sugestão automática",
              texto:
                "Gere palpites aleatórios rapidamente e salve as combinações no histórico.",
              cor: COLORS.azul,
            },
            {
              titulo: "Painel de histórico",
              texto:
                "Edite, exclua e revise todos os jogos salvos em cards modernos e organizados.",
              cor: COLORS.laranja,
            },
          ].map((item) => (
            <div
              key={item.titulo}
              style={{
                backgroundColor: COLORS.painel,
                border: `1px solid ${COLORS.borda}`,
                borderRadius: 22,
                padding: 22,
                boxShadow: "0 16px 34px rgba(0, 0, 0, 0.24)",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: item.cor,
                  marginBottom: 18,
                }}
              />
              <h2
                style={{
                  margin: "0 0 10px",
                  color: COLORS.branco,
                  fontSize: 22,
                }}
              >
                {item.titulo}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: COLORS.textoSecundario,
                  lineHeight: 1.6,
                }}
              >
                {item.texto}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default HomePage;
