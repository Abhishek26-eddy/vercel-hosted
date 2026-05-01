"use client";

type Props = {
  color?: string;
  symbol?: "diamond" | "dot" | "cross" | "rose" | "none";
  width?: number;
  className?: string;
};

export default function OrnamentDivider({
  color = "currentColor",
  symbol = "diamond",
  width = 120,
  className = "",
}: Props) {
  return (
    <div
      className={`mx-auto flex items-center justify-center gap-3 ${className}`}
      style={{ color }}
    >
      <span
        className="block"
        style={{ width, height: 1, background: color, opacity: 0.45 }}
      />
      {symbol !== "none" && <SymbolMark symbol={symbol} color={color} />}
      <span
        className="block"
        style={{ width, height: 1, background: color, opacity: 0.45 }}
      />
    </div>
  );
}

function SymbolMark({ symbol, color }: { symbol: Props["symbol"]; color: string }) {
  if (symbol === "diamond") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1 L11 6 L6 11 L1 6 Z" stroke={color} strokeWidth="1" />
        <circle cx="6" cy="6" r="1.6" fill={color} />
      </svg>
    );
  }
  if (symbol === "dot") {
    return <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />;
  }
  if (symbol === "cross") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1 V13 M1 7 H13" stroke={color} strokeWidth="1" />
      </svg>
    );
  }
  if (symbol === "rose") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke={color} strokeOpacity="0.4" />
        <path
          d="M9 4.5c1.7 0 2.6 1.2 2.6 2.4 0 1.1-.9 2-2.1 2.1 0 .9.5 1.8 1.4 2.3-1.1.2-2.3-.2-3-1-.7.8-1.9 1.2-3 1 .9-.5 1.4-1.4 1.4-2.3-1.2-.1-2.1-1-2.1-2.1 0-1.2.9-2.4 2.6-2.4.9 0 1.6.4 2.2 1 .6-.6 1.3-1 2.2-1Z"
          fill={color}
        />
      </svg>
    );
  }
  return null;
}
