interface TirumalaLogoProps {
  className?: string
  showText?: boolean
  textColor?: string
  showCorporate?: boolean
  variant?: 'vector' | 'image'
}

export default function TirumalaLogo({
  className = 'h-7 sm:h-8',
  showText = true,
  textColor = 'text-navy',
  showCorporate = true,
  variant = 'vector',
}: TirumalaLogoProps) {
  if (variant === 'image') {
    return (
      <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
        <img
          src="/logo.jpg"
          alt="Tirumala Meadows Private Limited"
          className="h-7 sm:h-8 w-auto object-contain rounded-xs"
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      {/* 
        Exact geometric mark from official logo:
        - Top bar: Primary Red #E63422
        - Bottom Left: Royal Blue #0100F3
        - Bottom Right: Forest Green #2B6116
      */}
      <svg
        viewBox="0 0 100 100"
        className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 shrink-0 rounded-xs shadow-xs"
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
          <span className={`text-[11px] sm:text-[13px] font-extrabold tracking-[0.16em] sm:tracking-[0.20em] uppercase ${textColor} font-serif font-display whitespace-nowrap`}>
            TIRUMALA
          </span>
          <div className="flex items-center gap-1 mt-0.5 whitespace-nowrap">
            <span className={`text-[8.5px] sm:text-[10px] font-semibold tracking-[0.22em] sm:tracking-[0.26em] uppercase ${textColor} opacity-85 font-serif font-display`}>
              MEADOWS
            </span>
            {showCorporate && (
              <span className={`text-[6.5px] sm:text-[7px] font-bold tracking-[0.12em] uppercase ${textColor} opacity-60 font-sans border-l border-current/30 pl-1`}>
                PVT LTD
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
