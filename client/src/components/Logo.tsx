/* Brand mark: rounded triangle outline with a dot. Same shape as public/favicon.svg */
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false" fill="none">
      <path
        d="M24 9.5c1.9 0 3.4 1 4.4 2.7l11 18.3c2 3.3-.4 7.5-4.3 7.5H12.9c-3.9 0-6.3-4.2-4.3-7.5l11-18.3c1-1.7 2.5-2.7 4.4-2.7Z"
        stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round"
      />
      <circle cx="41" cy="40" r="2.6" fill="var(--orange)" />
    </svg>
  );
}
