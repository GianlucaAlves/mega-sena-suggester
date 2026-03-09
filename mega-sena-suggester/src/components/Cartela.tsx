import { useCallback, useContext, useMemo, useState } from "react";
import { PalpitesContext } from "../context/PalpitesContext";
import type { Palpite } from "../types/Palpite";
import { v4 as uuidv4 } from "uuid";

const COLORS = {
  laranja: "#E36302",
  verde: "#028867",
  azul: "#3412E5",
  branco: "#FFFFFF",
  preto: "#000000",
  painel: "rgba(255,255,255,0.04)",
  borda: "rgba(255,255,255,0.10)",
  textoSecundario: "rgba(255,255,255,0.72)",
};

const FONT_FAMILY =
  'Inter, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

const NUMEROS = Array.from({ length: 60 }, (_, i) => i + 1);
const LINHAS = Array.from({ length: 6 }, (_, linhaIndex) =>
  NUMEROS.slice(linhaIndex * 10, linhaIndex * 10 + 10),
);

function formatNumber(num: number) {
  return String(num).padStart(2, "0");
}

function Cartela() {
  const [numeroSelecionado, setNumeroSelecionado] = useState<number[]>([]);
  const contexto = useContext(PalpitesContext);

  const selecionadosOrdenados = useMemo(
    () => [...numeroSelecionado].sort((a, b) => a - b),
    [numeroSelecionado],
  );

  const handlerClique = useCallback((num: number) => {
    setNumeroSelecionado((atual) => {
      if (atual.includes(num)) {
        return atual.filter((n) => n !== num);
      }

      if (atual.length < 6) {
        return [...atual, num];
      }

      alert("Você só pode selecionar 6 números!");
      return atual;
    });
  }, []);

  const salvarSelecao = useCallback(
    (selecionados: number[]) => {
      const novoPalpite: Palpite = {
        id: uuidv4(),
        tipo: "manual",
        numeros: [...selecionados].sort((a, b) => a - b),
        data: new Date().toISOString(),
      };
      contexto.adicionarPalpite(novoPalpite);
      setNumeroSelecionado([]);
    },
    [contexto],
  );

  return (
    <section
      style={{
        width: "100%",
        minWidth: 0,
        backgroundColor: COLORS.painel,
        border: `1px solid ${COLORS.borda}`,
        borderRadius: 28,
        padding: "clamp(18px, 4vw, 28px) clamp(14px, 3vw, 22px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
        backdropFilter: "blur(12px)",
        fontFamily: FONT_FAMILY,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 22,
        }}
      >
        <span
          style={{
            color: COLORS.textoSecundario,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 1.4,
          }}
        >
          Cartela manual
        </span>
        <h2
          style={{
            margin: 0,
            color: COLORS.branco,
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            fontSize: 30,
            fontWeight: 900,
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minWidth: 540,
            }}
          >
        >
          Cartela da Mega-Sena
        </h2>
        <p
          style={{ margin: 0, color: COLORS.textoSecundario, lineHeight: 1.6 }}
                  gridTemplateColumns: "repeat(10, minmax(44px, 1fr))",
                  gap: 8,
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {selecionadosOrdenados.length > 0 ? (
          selecionadosOrdenados.map((numero) => (
            <span
              key={numero}
              style={{
                minWidth: 46,
                height: 46,
                borderRadius: "50%",
                backgroundColor: COLORS.verde,
                color: COLORS.branco,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                border: `2px solid ${COLORS.branco}`,
              }}
            >
              {formatNumber(numero)}
            </span>
          ))
        ) : (
          <span style={{ color: COLORS.textoSecundario, fontSize: 14 }}>
            Nenhuma dezena selecionada ainda.
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <strong style={{ color: COLORS.branco, fontSize: 15 }}>
          Selecionados: {numeroSelecionado.length}/6
        </strong>
        <span style={{ color: COLORS.textoSecundario, fontSize: 13 }}>
          Clique novamente para desmarcar uma dezena
        </span>
      </div>

      <div
        style={{
          width: "100%",
          overflowX: "auto",
          paddingBottom: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minWidth: 620,
          }}
        >
          {LINHAS.map((linha, index) => (
            <div
              key={`linha-${index}`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, minmax(48px, 1fr))",
                gap: 10,
              }}
            >
              {linha.map((num) => {
                const selecionado = numeroSelecionado.includes(num);

                return (
                  <button
                    key={num}
                    type="button"
                    style={{
                      aspectRatio: "1 / 1",
                      width: "100%",
                      minHeight: 44,
                      borderRadius: 14,
                      border: selecionado
                        ? `2px solid ${COLORS.branco}`
                        : `1px solid ${COLORS.borda}`,
                      backgroundColor: selecionado
                        ? COLORS.verde
                        : "rgba(255,255,255,0.05)",
                      color: COLORS.branco,
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: "pointer",
                      transition:
                        "transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease",
                      boxShadow: selecionado
                        ? "0 12px 20px rgba(2, 136, 103, 0.32)"
                        : "none",
                      fontFamily: FONT_FAMILY,
                    }}
                    onClick={() => handlerClique(num)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      if (!selecionado) {
                        e.currentTarget.style.borderColor = COLORS.azul;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = selecionado
                        ? COLORS.branco
                        : COLORS.borda;
                    }}
                  >
                    {formatNumber(num)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginTop: 24,
        }}
      >
        <button
          type="button"
          onClick={() => salvarSelecao(numeroSelecionado)}
          disabled={numeroSelecionado.length !== 6}
          style={{
            flex: "1 1 220px",
            backgroundColor:
              numeroSelecionado.length === 6
                ? COLORS.verde
                : "rgba(255,255,255,0.14)",
            color: COLORS.branco,
            border: "none",
            borderRadius: 14,
            padding: "14px 18px",
            fontWeight: 800,
            fontSize: 15,
            cursor: numeroSelecionado.length === 6 ? "pointer" : "not-allowed",
            fontFamily: FONT_FAMILY,
            minWidth: 0,
          }}
        >
          Salvar seleção manual
        </button>

        <button
          type="button"
          onClick={() => setNumeroSelecionado([])}
          style={{
            flex: "1 1 220px",
            backgroundColor: "transparent",
            color: COLORS.branco,
            border: `1px solid ${COLORS.borda}`,
            borderRadius: 14,
            padding: "14px 18px",
            fontWeight: 800,
            fontSize: 15,
            cursor: "pointer",
            fontFamily: FONT_FAMILY,
            minWidth: 0,
          }}
        >
          Limpar seleção
        </button>
      </div>
    </section>
  );
}

export default Cartela;
