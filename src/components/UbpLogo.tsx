import React from 'react';

interface UbpLogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const UbpLogo: React.FC<UbpLogoProps> = ({ variant = 'dark', compact = false }) => {
  const titleColor = variant === 'light' ? 'text-white' : 'text-[#0B1F3A]';
  const subColor = variant === 'light' ? 'text-slate-300' : 'text-slate-600';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        width={compact ? 36 : 42}
        height={compact ? 36 : 42}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Vertical pillar: green top, amber bottom */}
        <path d="M27 4L33 10V36H27V4Z" fill="#15803D" />
        <path d="M27 48H33V58L27 54V48Z" fill="#D97706" />

        {/* Left crimson U arc */}
        <path
          d="M11 22V34C11 43.3888 18.6112 51 28 51H30V43H28C23.0294 43 19 38.9706 19 34V22H11Z"
          fill="#DC2626"
        />

        {/* Right cobalt P ring */}
        <circle cx="40" cy="34" r="14" stroke="#1D4ED8" strokeWidth="7" />

        {/* Partnership emblem inside P ring */}
        <circle cx="40" cy="28" r="2.2" fill="#1D4ED8" />
        <circle cx="34.8" cy="36" r="2.2" fill="#D97706" />
        <circle cx="45.2" cy="36" r="2.2" fill="#15803D" />
        <path
          d="M36 31.5C37.5 30.2 42.5 30.2 44 31.5"
          stroke="#1D4ED8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M34 39.2C36 37.5 38.2 38 39 39.5"
          stroke="#D97706"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M46 39.2C44 37.5 41.8 38 41 39.5"
          stroke="#15803D"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`font-display text-base sm:text-lg font-extrabold tracking-tight ${titleColor}`}>
          UNIQUE
        </span>
        {!compact && (
          <span className={`text-[11px] font-medium tracking-wide ${subColor}`}>
            business partner
          </span>
        )}
      </span>
    </span>
  );
};
