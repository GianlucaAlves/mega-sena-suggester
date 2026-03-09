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
const DEFAULT_CIRCLE_SIZE = 300;

function getCircleSize() {
  if (typeof window === "undefined") {
    return DEFAULT_CIRCLE_SIZE;
  }

  return Math.max(220, Math.min(300, window.innerWidth - 72));
}

function getRandomVelocity() {
  const angle = Math.random() * 2 * Math.PI;
  const speed = 1.5 + Math.random() * 1.5;
  return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
}

function getRandomPosition(circleSize: number, ballSize: number) {
  const radius = (circleSize - ballSize) / 2;
  const center = circleSize / 2;
  let angle = Math.random() * 2 * Math.PI;
  let r = Math.random() * radius * 0.8;
  return {
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
  };
}

function createBolas(circleSize: number): Bola[] {
  const ballSize = Math.max(18, Math.min(24, circleSize * 0.08));

  return Array.from({ length: TOTAL }, (_, i) => {
    const { x, y } = getRandomPosition(circleSize, ballSize);
    const { vx, vy } = getRandomVelocity();

    return { x, y, vx, vy, num: i + 1 };
  });
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
  const [circleSize, setCircleSize] = useState<number>(getCircleSize);
  const ballSize = Math.max(18, Math.min(24, circleSize * 0.08));
  const radius = (circleSize - ballSize) / 2;
  const center = circleSize / 2;
  const [bolas, setBolas] = useState<Bola[]>(() =>
    createBolas(getCircleSize()),
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
    function handleResize() {
      setCircleSize(getCircleSize());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!girando) {
      setBolas(createBolas(circleSize));
    }
  }, [circleSize, girando]);

  useEffect(() => {
    if (!girando) return;
    function animar() {
      setBolas((bolasAntigas) =>
        bolasAntigas.map((bola) => {
          let { x, y, vx, vy, num } = bola;
          let nx = x + vx;
          let ny = y + vy;
          const dx = nx - center;
          const dy = ny - center;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > radius) {
            const nxWall = dx / dist;
            const nyWall = dy / dist;
            const dot = vx * nxWall + vy * nyWall;
            vx = vx - 2 * dot * nxWall;
            vy = vy - 2 * dot * nyWall;
            nx = center + nxWall * radius;
            ny = center + nyWall * radius;
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
  }, [girando, center, radius]);

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
    setBolas(createBolas(circleSize));
    setSorteadas([]);
    setGirando(true);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: 20,
        alignItems: "start",
        fontFamily: FONT_FAMILY,
      }}
    >
      <section
        style={{
          width: "100%",
          backgroundColor: COLORS.painel,
          border: `1px solid ${COLORS.borda}`,
          borderRadius: 28,
          padding: "clamp(18px, 4vw, 24px)",
          boxShadow: "0 20px 48px rgba(0,0,0,0.28)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: circleSize,
            height: circleSize,
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
                left: bola.x - ballSize / 2,
                top: bola.y - ballSize / 2,
                width: ballSize,
                height: ballSize,
                fontSize: Math.max(11, ballSize * 0.55),
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
          width: "100%",
          backgroundColor: COLORS.painel,
          border: `1px solid ${COLORS.borda}`,
          borderRadius: 28,
          padding: "clamp(18px, 4vw, 24px)",
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
            gridTemplateColumns: "repeat(3, minmax(44px, 52px))",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {sorteadas.map((num) => (
            <Ball
              key={`sorteada-${num}`}
              num={num}
              style={{
                width: 50,
                height: 50,
                fontSize: 18,
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
