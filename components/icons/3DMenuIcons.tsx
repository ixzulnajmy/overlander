// 3D-style icons inspired by Airbnb design system

export function HomeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L4 9V21H20V9L12 3Z" fill="url(#home-gradient)" />
      <path d="M9 21V13H15V21" fill="url(#home-shadow)" />
      <defs>
        <linearGradient id="home-gradient" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="home-shadow" x1="12" y1="13" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CompassIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="url(#compass-gradient)" />
      <path d="M12 8L10 14L16 12L14 6L12 8Z" fill="url(#compass-needle)" />
      <defs>
        <linearGradient id="compass-gradient" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="compass-needle" x1="13" y1="6" x2="13" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function MapIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" fill="url(#map-gradient)" />
      <path d="M9 3V18M15 6V21" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="map-gradient" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function MotorcycleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="17" r="3" fill="url(#moto-wheel1)" />
      <circle cx="18" cy="17" r="3" fill="url(#moto-wheel2)" />
      <path d="M12 8L14 12H18L15 17M12 8L10 12L8 14" stroke="url(#moto-body)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="moto-wheel1" x1="6" y1="14" x2="6" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="moto-wheel2" x1="18" y1="14" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="moto-body" x1="12" y1="8" x2="12" y2="17" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function UserIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" fill="url(#user-head)" />
      <path d="M6 21C6 17.6863 8.68629 15 12 15C15.3137 15 18 17.6863 18 21" fill="url(#user-body)" />
      <defs>
        <linearGradient id="user-head" x1="12" y1="4" x2="12" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="user-body" x1="12" y1="15" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SettingsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="url(#settings-center)" />
      <path fillRule="evenodd" clipRule="evenodd" d="M13.5 3H10.5L10 5L8 6L6 5L4 7L5 9L4 11H2V13H4L5 15L4 17L6 19L8 18L10 19L10.5 21H13.5L14 19L16 18L18 19L20 17L19 15L20 13H22V11H20L19 9L20 7L18 5L16 6L14 5L13.5 3Z" fill="url(#settings-gear)" />
      <defs>
        <linearGradient id="settings-center" x1="12" y1="9" x2="12" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="settings-gear" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
