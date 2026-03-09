import { useContext, useState } from "react";
import { PalpitesContext } from "../context/PalpitesContext";
import type { Palpite } from "../types/Palpite";
import Cartela from "../components/Cartela";
import Ball from "../components/Ball";
import { v4 as uuidv4 } from "uuid";

const COLORS = {
  laranja: "#E36302",
  verde: "#028867",
  azul: "#3412E5",
  branco: "#FFFFFF",
  preto: "#000000",
  fundo: "#050505",
  painel: "rgba(255,255,255,0.04)",
  borda: "rgba(255,255,255,0.09)",
  textoSecundario: "rgba(255,255,255,0.72)",
};

const FONT_FAMILY =
  'Inter, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

function PalpitePage() {
  const contexto = useContext(PalpitesContext);
  const [palpite, setPalpite] = useState<Palpite | null>(null);

  function gerarPalpite() {
    const num = new Set<number>();
    const id = uuidv4();
    const tipo = "automatico";
    const data = new Date().toISOString();

    let count = 0;
    while (count < 6) {
      let tam = num.size;
      num.add(Math.floor(Math.random() * 60 + 1));
      if (num.size > tam) {
        count++;
        tam = num.size;
      }
    }

    let palpiteGerado = Array.from(num).sort((a, b) => a - b);
    const novoPalpite: Palpite = {
      id,
      numeros: palpiteGerado,
      tipo,
      data,
    };

    setPalpite(novoPalpite);
    contexto.adicionarPalpite(novoPalpite);
  }

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
            padding: "32px clamp(20px, 4vw, 40px)",
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
            Área de palpites
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              color: COLORS.branco,
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
            }}
          >
            Gere uma aposta automática ou monte sua própria cartela.
          </h1>

          <p
            style={{
              margin: 0,
              color: COLORS.textoSecundario,
              fontSize: 17,
              lineHeight: 1.6,
              maxWidth: 760,
            }}
          >
            Aqui você pode escolher: pedir uma sugestão aleatória ou selecionar
            manualmente 6 dezenas na nossa cartela.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: COLORS.painel,
              border: `1px solid ${COLORS.borda}`,
              borderRadius: 28,
              padding: "clamp(18px, 4vw, 24px)",
              boxShadow: "0 20px 48px rgba(0,0,0,0.28)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div>
              <span
                style={{
                  color: COLORS.textoSecundario,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 1.4,
                }}
              >
                Sugestão automática
              </span>
              <h2
                style={{
                  margin: "8px 0 10px",
                  color: COLORS.branco,
                  fontSize: 28,
                  fontWeight: 900,
                }}
              >
                Gerador rápido
              </h2>
              <p
                style={{
                  margin: 0,
                  color: COLORS.textoSecundario,
                  lineHeight: 1.6,
                }}
              >
                Crie um jogo aleatório com um clique e já adicione no histórico.
              </p>
            </div>

            <button
              onClick={gerarPalpite}
              style={{
                backgroundColor: COLORS.azul,
                color: COLORS.branco,
                border: "none",
                borderRadius: 14,
                padding: "14px 20px",
                fontWeight: 800,
                fontSize: 16,
                cursor: "pointer",
                fontFamily: FONT_FAMILY,
                alignSelf: "flex-start",
              }}
            >
              Nova sugestão
            </button>

            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.24)",
                border: `1px solid ${COLORS.borda}`,
                borderRadius: 20,
                padding: 18,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {palpite ? (
                <>
                  <span
                    style={{
                      color: COLORS.textoSecundario,
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: 1.2,
                    }}
                  >
                    Último palpite gerado
                  </span>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(44px, 52px))",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    {palpite.numeros.map((numero) => (
                      <Ball
                        key={numero}
                        num={numero}
                        style={{
                          width: 52,
                          height: 52,
                          backgroundColor: COLORS.verde,
                          color: COLORS.branco,
                          border: `2px solid ${COLORS.branco}`,
                          fontWeight: 800,
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p
                  style={{
                    margin: 0,
                    color: COLORS.textoSecundario,
                    textAlign: "center",
                    lineHeight: 1.6,
                  }}
                >
                  Gere uma combinação automática para visualizar suas dezenas
                  aqui.
                </p>
              )}
            </div>
          </div>

          <Cartela />
        </section>
      </div>
    </div>
  );
}

export default PalpitePage;
