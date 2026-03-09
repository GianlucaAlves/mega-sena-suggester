import { useEffect, useRef, useState, useContext } from "react";
import Ball from "./Ball";
import { PalpitesContext } from "../context/PalpitesContext";

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

type Bola = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  num: number;
};

type Sorteio = {
  numeros: number[];
  resultado: string;
};

const TOTAL = 60;
const CIRCLE_SIZE = 300;
const BALL_SIZE = 24;
const RADIUS = (CIRCLE_SIZE - BALL_SIZE) / 2;
const CENTER = CIRCLE_SIZE / 2;

function getRandomVelocity() {
  const angle = Math.random() * 2 * Math.PI;
  const speed = 1.5 + Math.random() * 1.5;
  return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
}

function getRandomPosition() {
  let angle = Math.random() * 2 * Math.PI;
  let r = Math.random() * RADIUS * 0.8;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

function compararPalpite(palpite: number[], sorteio: number[]) {
  return (
    palpite.length === 6 &&
    sorteio.length === 6 &&
    palpite.every((n) => sorteio.includes(n))
  );
}

function Roleta() {
  const contexto = useContext(PalpitesContext);
  const [bolas, setBolas] = useState<Bola[]>(() =>
    Array.from({ length: TOTAL }, (_, i) => {
      const { x, y } = getRandomPosition();
      const { vx, vy } = getRandomVelocity();
      return { x, y, vx, vy, num: i + 1 };
    }),
  );
  const [girando, setGirando] = useState(false);
  const [sorteadas, setSorteadas] = useState<number[]>([]);
  const [historicoSorteios, setHistoricoSorteios] = useState<Sorteio[]>(() => {
    const salvo = localStorage.getItem("historicoSorteios");
    return salvo ? JSON.parse(salvo) : [];
  });
  const animationRef = useRef<number | null>(null);
  const sorteioTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!girando) return;
    function animar() {
      setBolas((bolasAntigas) =>
        bolasAntigas.map((bola) => {
          let { x, y, vx, vy, num } = bola;
          let nx = x + vx;
          let ny = y + vy;
          const dx = nx - CENTER;
          const dy = ny - CENTER;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > RADIUS) {
            const nxWall = dx / dist;
            const nyWall = dy / dist;
            const dot = vx * nxWall + vy * nyWall;
            vx = vx - 2 * dot * nxWall;
            vy = vy - 2 * dot * nyWall;
            nx = CENTER + nxWall * RADIUS;
            ny = CENTER + nyWall * RADIUS;
          }
          return { x: nx, y: ny, vx, vy, num };
        }),
      );
      animationRef.current = requestAnimationFrame(animar);
    }
    animationRef.current = requestAnimationFrame(animar);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [girando]);

  useEffect(() => {
    if (girando && sorteadas.length < 6) {
      sorteioTimeout.current = window.setTimeout(() => {
        sortearBola();
      }, 1200);
    }
    if (sorteadas.length === 6 && girando) {
      setGirando(false);
      salvarSorteio();
    }
    return () => {
      if (sorteioTimeout.current) clearTimeout(sorteioTimeout.current);
    };
  }, [girando, sorteadas]);

  function sortearBola() {
    if (bolas.length === 0 || sorteadas.length >= 6) return;
    const idx = Math.floor(Math.random() * bolas.length);
    const bolaSorteada = bolas[idx];
    setSorteadas((prev) => [...prev, bolaSorteada.num]);
    setBolas((prev) => prev.filter((_, i) => i !== idx));
  }

  function salvarSorteio() {
    let algumAcertou = false;
    for (const palpite of contexto.palpites) {
      if (compararPalpite(palpite.numeros, sorteadas)) {
        algumAcertou = true;
        break;
      }
    }
    const resultado = algumAcertou
      ? "Parabéns! Houve pelo menos um palpite vencedor!"
      : "Nenhum palpite acertou todos os números.";
    const novoHistorico = [
      ...historicoSorteios,
      { numeros: [...sorteadas], resultado },
    ];
    setHistoricoSorteios(novoHistorico);
    localStorage.setItem("historicoSorteios", JSON.stringify(novoHistorico));
  }

  function handleSortear() {
    if (girando) return;
    setBolas(
      Array.from({ length: TOTAL }, (_, i) => {
        const { x, y } = getRandomPosition();
        const { vx, vy } = getRandomVelocity();
        return { x, y, vx, vy, num: i + 1 };
      }),
    );
    setSorteadas([]);
    setGirando(true);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 20,
        alignItems: "start",
        fontFamily: FONT_FAMILY,
      }}
    >
      <section
        style={{
          backgroundColor: COLORS.painel,
          border: `1px solid ${COLORS.borda}`,
          borderRadius: 28,
          padding: 24,
          boxShadow: "0 20px 48px rgba(0,0,0,0.28)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: `3px solid ${COLORS.azul}`,
            position: "relative",
            overflow: "hidden",
            marginBottom: 24,
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)",
          }}
        >
          {bolas.map((bola) => (
            <Ball
              key={bola.num}
              num={bola.num}
              style={{
                position: "absolute",
                left: bola.x - BALL_SIZE / 2,
                top: bola.y - BALL_SIZE / 2,
                width: BALL_SIZE,
                height: BALL_SIZE,
                fontSize: 14,
                pointerEvents: "none",
                transition: "none",
                backgroundColor: COLORS.verde,
                color: COLORS.branco,
                border: `1px solid ${COLORS.branco}`,
              }}
            />
          ))}
        </div>
        <button
          onClick={handleSortear}
          disabled={girando}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            fontWeight: 800,
            borderRadius: 14,
            border: "none",
            backgroundColor: girando ? COLORS.laranja : COLORS.verde,
            color: COLORS.branco,
            cursor: girando ? "not-allowed" : "pointer",
            fontFamily: FONT_FAMILY,
          }}
        >
          {girando ? "Sorteando..." : "Iniciar sorteio"}
        </button>
      </section>

      <section
        style={{
          backgroundColor: COLORS.painel,
          border: `1px solid ${COLORS.borda}`,
          borderRadius: 28,
          padding: 24,
          boxShadow: "0 20px 48px rgba(0,0,0,0.28)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
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
            Resultado atual
          </span>
          <h2
            style={{
              margin: "8px 0 0",
              color: COLORS.branco,
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            Dezenas sorteadas
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 52px)",
            justifyContent: "start",
            gap: 12,
          }}
        >
          {sorteadas.map((num) => (
            <Ball
              key={`sorteada-${num}`}
              num={num}
              style={{
                width: 52,
                height: 52,
                fontSize: 20,
                backgroundColor: COLORS.laranja,
                color: COLORS.branco,
                border: `2px solid ${COLORS.branco}`,
                boxShadow: "0 10px 18px rgba(0,0,0,0.28)",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {historicoSorteios.map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: 16,
                border: `1px solid ${COLORS.borda}`,
                borderRadius: 18,
                backgroundColor: "rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  color: COLORS.branco,
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                Sorteio {idx + 1}
              </div>
              <div style={{ color: COLORS.textoSecundario, marginBottom: 8 }}>
                {s.numeros
                  .map((numero) => String(numero).padStart(2, "0"))
                  .join(", ")}
              </div>
              <div style={{ color: COLORS.branco }}>{s.resultado}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Roleta;
