type LogoProps = {
  className?: string;
  size?: number;
};

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.15" />
      <circle
        cx="16"
        cy="16"
        r="15"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Mountain range */}
      <path
        d="M6 22L11 13L14 17L17 11L22 18L26 22H6Z"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Snow cap on tallest peak */}
      <path
        d="M17 11L14.5 15L16.2 14.2L17.8 15.5L19.5 14L17 11Z"
        fill="white"
        opacity="0.95"
      />

      {/* Small sun/moon */}
      <circle cx="24" cy="9" r="2" fill="currentColor" opacity="0.7" />

      {/* Ground line */}
      <path
        d="M4 24H28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}