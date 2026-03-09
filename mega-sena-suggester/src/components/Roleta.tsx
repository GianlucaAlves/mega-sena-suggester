import { useEffect, useRef, useState, useContext } from "react";
import Ball from "./Ball";
import { PalpitesContext } from "../context/PalpitesContext";

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
    })
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
        })
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
      })
    );
    setSorteadas([]);
    setGirando(true);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: "50%",
          background: "#eee",
          position: "relative",
          overflow: "hidden",
          marginBottom: 24,
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
            }}
          />
        ))}
      </div>
      <button
        onClick={handleSortear}
        disabled={girando}
        style={{
          padding: "8px 24px",
          fontSize: 18,
          borderRadius: 8,
          border: "none",
          background: girando ? "#c33" : "#3c3",
          color: "#fff",
          cursor: girando ? "not-allowed" : "pointer",
        }}
      >
        Sortear
      </button>
      <div style={{ marginTop: 24, display: "flex", gap: 16, justifyContent: "center" }}>
        {sorteadas.map((num) => (
          <Ball
            key={`sorteada-${num}`}
            num={num}
            style={{
              width: 48,
              height: 48,
              fontSize: 24,
              background: "#FFD700",
              color: "#222",
              border: "3px solid #222",
              boxShadow: "0 2px 8px #0004",
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 32, width: 360 }}>
        {historicoSorteios.map((s, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 16,
              padding: 12,
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "#fafafa",
            }}
          >
            <div>
              <strong>Sorteio {idx + 1}:</strong>{" "}
              {s.numeros.join(", ")}
            </div>
            <div style={{ marginTop: 4 }}>{s.resultado}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roleta;