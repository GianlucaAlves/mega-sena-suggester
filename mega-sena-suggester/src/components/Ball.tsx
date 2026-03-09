import { memo } from "react";
import type { CSSProperties } from "react";

type BallProps = {
  num: number;
  style?: CSSProperties;
};

function Ball({ num, style }: BallProps) {
  return (
    <div
      style={{
        borderRadius: "100%",
        border: "solid 2px black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40px",
        width: "40px",
        margin: "3px",
        color: "#ffffff",
        backgroundColor: "#028867",
        ...style,
      }}
    >
      <p
        style={{
          color: "inherit",
          margin: 0,
          fontWeight: 700,
        }}
      >
        {num}
      </p>
    </div>
  );
}

export default memo(Ball);
