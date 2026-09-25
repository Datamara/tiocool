export function IconNeural({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v3M12 14.5v2.5M10 11.5 7 15.5M14 11.5l3 4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
    </svg>
  );
}

export function IconChip({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7V4M12 7V3M15 7V4M9 17v3M12 17v4M15 17v3M7 9H4M7 12H3M7 15H4M17 9h3M17 12h4M17 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBot({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" />
      <path d="M12 4v4M8 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

export function IconSpark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2l1.8 5.5L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M19 15l.9 2.7L22.5 18l-2.6.8L19 21.5l-.9-2.7L15.5 18l2.6-.8L19 15z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeOpacity="0.6" />
    </svg>
  );
}

export function IconNetwork({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 7.5 9.5 10M18 7.5 14.5 10M6 16.5 9.5 14M18 16.5 14.5 14" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.55" />
    </svg>
  );
}

export function IconShield({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3 4 7v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 12.5 11.5 14.5 15 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
