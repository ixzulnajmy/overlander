type BikeIconProps = {
  make?: string
  model?: string
  year?: number
  className?: string
}

type BrandInfo = {
  color: string
  bgColor: string
  textColor: string
}

function getBrandInfo(make?: string): BrandInfo {
  const makeLower = (make || '').toLowerCase()

  const brandMap: Record<string, BrandInfo> = {
    'yamaha': { color: '#0D3C8C', bgColor: '#0D3C8C', textColor: '#FFFFFF' },
    'honda': { color: '#CC0000', bgColor: '#CC0000', textColor: '#FFFFFF' },
    'kawasaki': { color: '#00AA00', bgColor: '#00AA00', textColor: '#FFFFFF' },
    'suzuki': { color: '#0066CC', bgColor: '#0066CC', textColor: '#FFFFFF' },
    'bmw': { color: '#0066B1', bgColor: '#0066B1', textColor: '#FFFFFF' },
    'harley': { color: '#FF6600', bgColor: '#FF6600', textColor: '#FFFFFF' },
    'ducati': { color: '#CC0000', bgColor: '#CC0000', textColor: '#FFFFFF' },
    'ktm': { color: '#FF6600', bgColor: '#FF6600', textColor: '#000000' },
    'triumph': { color: '#002855', bgColor: '#002855', textColor: '#FFFFFF' },
    'royal enfield': { color: '#000000', bgColor: '#000000', textColor: '#FFD700' },
    'aprilia': { color: '#CC0000', bgColor: '#CC0000', textColor: '#FFFFFF' },
    'mv agusta': { color: '#CC0000', bgColor: '#CC0000', textColor: '#FFFFFF' },
    'husqvarna': { color: '#0066CC', bgColor: '#0066CC', textColor: '#FFD700' },
  }

  for (const [brand, info] of Object.entries(brandMap)) {
    if (makeLower.includes(brand)) return info
  }

  return { color: '#6B7280', bgColor: '#374151', textColor: '#FFFFFF' } // default gray
}

export function BikeIcon({ make, model, year, className = '' }: BikeIconProps) {
  const brandInfo = getBrandInfo(make)
  const displayMake = make || 'BIKE'

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div
        className="w-full h-full rounded-xl flex flex-col items-center justify-center p-3"
        style={{ backgroundColor: brandInfo.bgColor }}
      >
        <div
          className="text-2xl font-black tracking-tight text-center leading-none"
          style={{ color: brandInfo.textColor }}
        >
          {displayMake.toUpperCase()}
        </div>
        {model && (
          <div
            className="text-[10px] font-semibold mt-1 text-center opacity-80 leading-tight"
            style={{ color: brandInfo.textColor }}
          >
            {model.toUpperCase()}
          </div>
        )}
      </div>
      {year && (
        <div
          className="absolute -bottom-1 -right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-black shadow-lg"
        >
          {year}
        </div>
      )}
    </div>
  )
}
