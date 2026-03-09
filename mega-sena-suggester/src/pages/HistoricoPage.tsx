import { type CSSProperties, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PalpitesContext } from "../context/PalpitesContext";
import { PalpiteCard } from "../components/PalpiteCard";

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

const cardResumoBase: CSSProperties = {
  backgroundColor: COLORS.painel,
  border: `1px solid ${COLORS.borda}`,
  borderRadius: 20,
  padding: "18px 20px",
  minHeight: 108,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
  backdropFilter: "blur(10px)",
};

function HistoricoPage() {
  const contexto = useContext(PalpitesContext);
  const [palpiteEditando, setPalpiteEditando] = useState<string | null>(null);
  const [numerosEditados, setNumerosEditados] = useState<number[]>([]);

  const resumo = useMemo(() => {
    const total = contexto.palpites.length;
    const manuais = contexto.palpites.filter(
      (palpite) => palpite.tipo === "manual",
    ).length;
    const automaticos = contexto.palpites.filter(
      (palpite) => palpite.tipo === "automatico",
    ).length;

    return {
      total,
      manuais,
      automaticos,
    };
  }, [contexto.palpites]);

  const editar = (id: string, numeros: number[]) => {
    setPalpiteEditando(id);
    setNumerosEditados([...numeros]);
  };

  const excluir = (id: string) => {
    contexto.excluirPalpite(id);
  };

  const salvarEdicao = (id: string) => {
    const numerosValidos = numerosEditados.every(
      (num) => num >= 1 && num <= 60,
    );
    const comparador = new Set<number>(numerosEditados);

    if (comparador.size === numerosEditados.length && numerosValidos) {
      contexto.editarPalpite(id, { numeros: numerosEditados });
      setPalpiteEditando(null);
    } else {
      alert(
        "Você inseriu números repetidos ou fora do intervalo válido, mude os números e tente novamente!",
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: COLORS.fundo,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px 56px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.painel,
            border: `1px solid ${COLORS.borda}`,
            borderRadius: 28,
            padding: "32px clamp(20px, 4vw, 40px)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 14px",
              borderRadius: 999,
              backgroundColor: "rgba(52, 18, 229, 0.2)",
              color: COLORS.branco,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Painel de histórico
          </div>

          <h1
            style={{
              color: COLORS.branco,
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              margin: "0 0 12px",
              maxWidth: 700,
            }}
          >
            Histórico de palpites
          </h1>

          <p
            style={{
              color: COLORS.textoSecundario,
              fontSize: 17,
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 760,
            }}
          >
            Acompanhe todos os jogos salvos, veja quando cada aposta foi criada
            e faça ajustes rápidos.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <div style={cardResumoBase}>
            <span
              style={{
                color: COLORS.textoSecundario,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1.4,
              }}
            >
              Total salvo
            </span>
            <strong
              style={{ color: COLORS.branco, fontSize: 34, fontWeight: 900 }}
            >
              {resumo.total}
            </strong>
          </div>

          <div
            style={{ ...cardResumoBase, borderColor: "rgba(7, 227, 2, 0.35)" }}
          >
            <span
              style={{
                color: COLORS.textoSecundario,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1.4,
              }}
            >
              Automáticos
            </span>
            <strong
              style={{ color: COLORS.verde, fontSize: 34, fontWeight: 900 }}
            >
              {resumo.automaticos}
            </strong>
          </div>

          <div
            style={{ ...cardResumoBase, borderColor: "rgba(227, 99, 2, 0.35)" }}
          >
            <span
              style={{
                color: COLORS.textoSecundario,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1.4,
              }}
            >
              Manuais
            </span>
            <strong
              style={{ color: COLORS.laranja, fontSize: 34, fontWeight: 900 }}
            >
              {resumo.manuais}
            </strong>
          </div>
        </div>

        {contexto.palpites.length === 0 ? (
          <div
            style={{
              backgroundColor: COLORS.painel,
              borderRadius: 28,
              padding: "56px 28px",
              color: COLORS.branco,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
              textAlign: "center",
              border: `1px solid ${COLORS.borda}`,
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 74,
                height: 74,
                borderRadius: "50%",
                backgroundColor: COLORS.azul,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 900,
                color: COLORS.branco,
              }}
            >
              6
            </div>

            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>
              Nenhum palpite salvo ainda
            </h2>

            <p
              style={{
                margin: 0,
                color: COLORS.textoSecundario,
                fontSize: 16,
                lineHeight: 1.6,
                maxWidth: 560,
              }}
            >
              Quando você gerar ou montar seus jogos, eles vão aparecer aqui em
              um histórico pronto para editar, revisar e comparar depois.
            </p>

            <Link
              to="/palpite"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8,
                backgroundColor: COLORS.verde,
                color: COLORS.preto,
                borderRadius: 14,
                padding: "14px 26px",
                fontWeight: 800,
                fontSize: 16,
                textDecoration: "none",
                transition: "transform 0.2s ease, opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.opacity = "0.92";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              Gerar meu primeiro palpite
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: 18,
              alignItems: "stretch",
            }}
          >
            {contexto.palpites.map((palpite, index) => (
              <PalpiteCard
                key={palpite.id}
                indice={index + 1}
                id={palpite.id}
                numeros={palpite.numeros}
                tipo={palpite.tipo}
                data={palpite.data}
                editando={palpiteEditando === palpite.id}
                numerosEditados={numerosEditados}
                onEditar={editar}
                onExcluir={excluir}
                onSalvar={salvarEdicao}
                onCancelar={() => setPalpiteEditando(null)}
                setNumerosEditados={setNumerosEditados}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoricoPage;
