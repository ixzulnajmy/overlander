type BikeIconProps = {
  make?: string
  model?: string
  year?: number
  className?: string
}

type BikeCategory = 'scooter' | 'sport' | 'cruiser' | 'adventure' | 'naked' | 'default'

function categorizeBike(make?: string, model?: string): BikeCategory {
  const modelLower = (model || '').toLowerCase()
  const makeLower = (make || '').toLowerCase()

  // Scooters
  if (modelLower.includes('xmax') || modelLower.includes('nmax') ||
      modelLower.includes('pcx') || modelLower.includes('vespa') ||
      modelLower.includes('scoopy') || modelLower.includes('aerox')) {
    return 'scooter'
  }

  // Sport bikes
  if (modelLower.includes('r1') || modelLower.includes('r6') ||
      modelLower.includes('cbr') || modelLower.includes('gsxr') ||
      modelLower.includes('ninja') || modelLower.includes('yzf')) {
    return 'sport'
  }

  // Adventure bikes
  if (modelLower.includes('gs') || modelLower.includes('adventure') ||
      modelLower.includes('africa') || modelLower.includes('tenere') ||
      modelLower.includes('tiger') || modelLower.includes('versys')) {
    return 'adventure'
  }

  // Cruisers
  if (makeLower.includes('harley') || modelLower.includes('shadow') ||
      modelLower.includes('vulcan') || modelLower.includes('rebel') ||
      modelLower.includes('sportster') || modelLower.includes('softail')) {
    return 'cruiser'
  }

  // Naked/Standard
  if (modelLower.includes('mt') || modelLower.includes('z') ||
      modelLower.includes('duke') || modelLower.includes('street')) {
    return 'naked'
  }

  return 'default'
}

function getBrandColor(make?: string): string {
  const makeLower = (make || '').toLowerCase()

  const colorMap: Record<string, string> = {
    'yamaha': '#0D3C8C',
    'honda': '#CC0000',
    'kawasaki': '#00AA00',
    'suzuki': '#0066CC',
    'bmw': '#0066B1',
    'harley': '#FF6600',
    'ducati': '#CC0000',
    'ktm': '#FF6600',
    'triumph': '#002855',
    'royal enfield': '#8B4513',
  }

  for (const [brand, color] of Object.entries(colorMap)) {
    if (makeLower.includes(brand)) return color
  }

  return '#6B7280' // default gray
}

export function BikeIcon({ make, model, year, className = '' }: BikeIconProps) {
  const category = categorizeBike(make, model)
  const brandColor = getBrandColor(make)

  const icons: Record<BikeCategory, JSX.Element> = {
    scooter: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="50" cy="140" r="25" stroke={brandColor} strokeWidth="6" fill="none"/>
        <circle cx="150" cy="140" r="25" stroke={brandColor} strokeWidth="6" fill="none"/>
        <path d="M75 140 L125 140" stroke={brandColor} strokeWidth="8" strokeLinecap="round"/>
        <path d="M80 140 L95 80 L130 80" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="90" y="90" width="35" height="30" rx="5" fill={brandColor} opacity="0.3"/>
        <path d="M130 80 L145 100 L140 140" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="130" cy="65" r="8" fill={brandColor}/>
      </svg>
    ),
    sport: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="45" cy="145" r="25" stroke={brandColor} strokeWidth="6" fill="none"/>
        <circle cx="155" cy="145" r="25" stroke={brandColor} strokeWidth="6" fill="none"/>
        <path d="M70 145 L130 145" stroke={brandColor} strokeWidth="6"/>
        <path d="M75 145 L90 90 L150 70" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M150 70 L165 90 L160 145" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="85" y="75" width="45" height="25" rx="5" fill={brandColor} opacity="0.3"/>
        <path d="M120 65 L135 55 L145 70" stroke={brandColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    adventure: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="50" cy="150" r="28" stroke={brandColor} strokeWidth="7" fill="none"/>
        <circle cx="150" cy="150" r="28" stroke={brandColor} strokeWidth="7" fill="none"/>
        <path d="M78 150 L122 150" stroke={brandColor} strokeWidth="8"/>
        <path d="M80 150 L95 70 L145 60" stroke={brandColor} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M145 60 L165 95 L158 150" stroke={brandColor} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="88" y="80" width="50" height="35" rx="5" fill={brandColor} opacity="0.3"/>
        <path d="M140 50 L155 40 L160 55" stroke={brandColor} strokeWidth="7" strokeLinecap="round"/>
        <circle cx="145" cy="45" r="10" fill={brandColor}/>
      </svg>
    ),
    cruiser: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="55" cy="155" r="30" stroke={brandColor} strokeWidth="7" fill="none"/>
        <circle cx="145" cy="155" r="30" stroke={brandColor} strokeWidth="7" fill="none"/>
        <path d="M85 155 L115 155" stroke={brandColor} strokeWidth="7"/>
        <path d="M90 155 L105 100 L135 95" stroke={brandColor} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M135 95 L145 120 L145 155" stroke={brandColor} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="100" y="105" width="40" height="28" rx="4" fill={brandColor} opacity="0.3"/>
        <path d="M105 95 L105 70 L125 65" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    naked: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="48" cy="148" r="26" stroke={brandColor} strokeWidth="6" fill="none"/>
        <circle cx="152" cy="148" r="26" stroke={brandColor} strokeWidth="6" fill="none"/>
        <path d="M74 148 L126 148" stroke={brandColor} strokeWidth="7"/>
        <path d="M78 148 L92 85 L140 75" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M140 75 L158 105 L155 148" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="88" y="90" width="45" height="30" rx="5" fill={brandColor} opacity="0.3"/>
        <path d="M130 70 L130 50" stroke={brandColor} strokeWidth="7" strokeLinecap="round"/>
        <circle cx="130" cy="45" r="8" fill={brandColor}/>
      </svg>
    ),
    default: (
      <svg viewBox="0 0 200 200" fill="none" className={className}>
        <circle cx="50" cy="145" r="26" stroke={brandColor} strokeWidth="6" fill="none"/>
        <circle cx="150" cy="145" r="26" stroke={brandColor} strokeWidth="6" fill="none"/>
        <path d="M76 145 L124 145" stroke={brandColor} strokeWidth="7"/>
        <path d="M80 145 L95 80 L140 75" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M140 75 L160 105 L155 145" stroke={brandColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="90" y="85" width="45" height="30" rx="5" fill={brandColor} opacity="0.3"/>
        <path d="M135 65 L135 50" stroke={brandColor} strokeWidth="6" strokeLinecap="round"/>
        <circle cx="135" cy="45" r="7" fill={brandColor}/>
      </svg>
    )
  }

  return (
    <div className="relative">
      {icons[category]}
      {year && (
        <div
          className="absolute bottom-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: brandColor, color: 'white' }}
        >
          {year}
        </div>
      )}
    </div>
  )
}
