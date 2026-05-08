"use client";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 select-none"
      style={{
        backgroundImage: "url(/grain.svg)",
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        opacity: 0.04,
      }}
    />
  );
}
