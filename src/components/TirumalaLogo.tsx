interface TirumalaLogoProps {
  className?: string
  showText?: boolean
  textColor?: string
  variant?: 'vector' | 'image'
}

export default function TirumalaLogo({
  className = 'h-8',
  showText = true,
  textColor = 'text-navy',
  variant = 'vector',
}: TirumalaLogoProps) {
  if (variant === 'image') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img
          src="/logo.jpg"
          alt="Tirumala Meadows"
          className="h-8 w-auto object-contain rounded-sm"
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 
        Exact geometric mark from official logo:
        - Top bar: Primary Red #E63422
        - Bottom Left: Royal Blue #0100F3
        - Bottom Right: Forest Green #2B6116
      */}
      <svg
        viewBox="0 0 100 100"
        className="h-8 w-8 shrink-0 rounded-xs shadow-xs"
        aria-label="Tirumala Meadows Official Emblem"
      >
        {/* Top Red block (#E63422) */}
        <rect x="0" y="0" width="100" height="44" fill="#E63422" rx="2" />
        {/* Bottom Left Blue block (#0100F3) */}
        <rect x="0" y="52" width="46" height="48" fill="#0100F3" rx="2" />
        {/* Bottom Right Green block (#2B6116) */}
        <rect x="54" y="52" width="46" height="48" fill="#2B6116" rx="2" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-[13px] font-extrabold tracking-[0.22em] uppercase ${textColor} font-serif font-display`}>
            TIRUMALA
          </span>
          <span className={`text-[10px] font-semibold tracking-[0.28em] uppercase ${textColor} opacity-85 font-serif font-display mt-0.5`}>
            MEADOWS
          </span>
        </div>
      )}
    </div>
  )
}
