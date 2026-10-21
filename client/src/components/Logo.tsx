/* Brand mark: soft hexagon with the RH monogram. Same shape as public/favicon.svg */
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <polygon points="24,5 41,14.5 41,33.5 24,43 7,33.5 7,14.5" fill="currentColor" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      <text x="24" y="30.5" textAnchor="middle" fontWeight="800" fontSize="18" letterSpacing="-1.6" fill="var(--paper)" style={{ fontFamily: "var(--font-sans)" }}>
        RH
      </text>
    </svg>
  );
}
