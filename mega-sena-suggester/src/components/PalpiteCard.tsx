import type { CSSProperties, FC } from "react";
import Ball from "./Ball";

type PalpiteCardProps = {
  id: string;
  indice: number;
  numeros: number[];
  tipo: "manual" | "automatico";
  data?: string;
  editando: boolean;
  numerosEditados: number[];
  onEditar: (id: string, numeros: number[]) => void;
  onExcluir: (id: string) => void;
  onSalvar: (id: string) => void;
  onCancelar: () => void;
  setNumerosEditados: (nums: number[]) => void;
};

const COLORS = {
  laranja: "#E36302",
  verde: "#028867",
  azul: "#3412E5",
  branco: "#FFFFFF",
  preto: "#000000",
  fundo: "#050505",
  card: "rgba(255, 255, 255, 0.04)",
  borda: "rgba(255, 255, 255, 0.1)",
  textoSecundario: "rgba(255, 255, 255, 0.72)",
};

const FONT_FAMILY =
  'Inter, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

const tipoBadge: Record<
  "manual" | "automatico",
  { label: string; backgroundColor: string }
> = {
  manual: {
    label: "Manual",
    backgroundColor: COLORS.laranja,
  },
  automatico: {
    label: "Automático",
    backgroundColor: COLORS.verde,
  },
};

const actionButtonBaseStyle: CSSProperties = {
  fontFamily: FONT_FAMILY,
  borderRadius: 12,
  padding: "10px 18px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  transition: "transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease",
};

export const PalpiteCard: FC<PalpiteCardProps> = ({
  id,
  indice,
  numeros,
  tipo,
  data,
  editando,
  numerosEditados,
  onEditar,
  onExcluir,
  onSalvar,
  onCancelar,
  setNumerosEditados,
}) => {
  const badge = tipoBadge[tipo];

  return (
    <article
      style={{
        backgroundColor: COLORS.card,
        fontFamily: FONT_FAMILY,
        border: `1px solid ${COLORS.borda}`,
        borderRadius: 24,
        padding: 24,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box",
        backdropFilter: "blur(10px)",
        boxShadow: "0 18px 40px rgba(0, 0, 0, 0.28)",
        transition:
          "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = COLORS.azul;
        e.currentTarget.style.boxShadow = "0 22px 48px rgba(0, 0, 0, 0.38)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = COLORS.borda;
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(0, 0, 0, 0.28)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            style={{
              color: COLORS.branco,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.6,
              opacity: 0.7,
            }}
          >
            Palpite #{String(indice).padStart(2, "0")}
          </span>

          <span
            style={{
              alignSelf: "flex-start",
              backgroundColor: badge.backgroundColor,
              color: COLORS.branco,
              borderRadius: 999,
              padding: "7px 14px",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: 0.4,
            }}
          >
            {badge.label}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          <span
            style={{
              color: COLORS.textoSecundario,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            Criado em
          </span>
          <span
            style={{
              color: COLORS.branco,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {data
              ? new Date(data).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Sem data registrada"}
          </span>
        </div>
      </div>

      <div
        style={{
          padding: "18px 16px",
          borderRadius: 20,
          backgroundColor: "rgba(0, 0, 0, 0.28)",
          border: `1px solid ${COLORS.borda}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 50px)",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {editando
            ? numerosEditados.map((numero, index) => (
                <input
                  key={`${id}-input-${index}`}
                  type="number"
                  min={1}
                  max={60}
                  value={numero}
                  onChange={(e) => {
                    const novos: number[] = [...numerosEditados];
                    novos[index] = Number(e.target.value);
                    setNumerosEditados(novos);
                  }}
                  style={{
                    fontFamily: FONT_FAMILY,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `2px solid ${COLORS.verde}`,
                    backgroundColor: COLORS.fundo,
                    color: COLORS.branco,
                    fontWeight: 800,
                    fontSize: 18,
                    textAlign: "center",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              ))
            : numeros.map((numero, index) => (
                <Ball
                  key={`${id}-${numero}-${index}`}
                  num={numero}
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: 18,
                    fontWeight: 800,
                    backgroundColor: COLORS.verde,
                    color: COLORS.preto,
                    border: `2px solid ${COLORS.branco}`,
                    boxShadow: "0 10px 18px rgba(0, 0, 0, 0.28)",
                  }}
                />
              ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {editando ? (
          <>
            <button
              onClick={() => onSalvar(id)}
              style={{
                ...actionButtonBaseStyle,
                backgroundColor: COLORS.verde,
                color: COLORS.preto,
                border: `1px solid ${COLORS.verde}`,
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
              Salvar
            </button>

            <button
              onClick={onCancelar}
              style={{
                ...actionButtonBaseStyle,
                backgroundColor: "transparent",
                color: COLORS.branco,
                border: `1px solid ${COLORS.borda}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = COLORS.azul;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = COLORS.borda;
              }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEditar(id, numeros)}
              style={{
                ...actionButtonBaseStyle,
                backgroundColor: COLORS.azul,
                color: COLORS.branco,
                border: `1px solid ${COLORS.azul}`,
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
              Editar
            </button>

            <button
              onClick={() => onExcluir(id)}
              style={{
                ...actionButtonBaseStyle,
                backgroundColor: "transparent",
                color: COLORS.laranja,
                border: `1px solid ${COLORS.laranja}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.backgroundColor = COLORS.laranja;
                e.currentTarget.style.color = COLORS.branco;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = COLORS.laranja;
              }}
            >
              Excluir
            </button>
          </>
        )}
      </div>
    </article>
  );
};
