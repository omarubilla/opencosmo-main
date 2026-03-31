/*
  Archived rectangle/circle background experiment from LandingHero.
  Kept here for reference, intentionally commented out.

  <div
    className="absolute left-0 right-0 top-0"
    style={{
      height: `${firstHeroBarsHeight}px`,
      WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 82%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, black 0%, black 62%, transparent 82%, transparent 100%)'
    }}
  >
    <div className="absolute inset-y-0 left-0 w-1/2 flex items-stretch gap-[2px] px-3">
      {[...Array(10)].map((_, i) => (
        <div
          key={`left-${i}`}
          className="w-[50px] flex-shrink-0 border-r border-white/40"
          style={{
            background: [
              'radial-gradient(70% 34% at 50% 58%, rgba(122, 98, 98, 0.18) 0%, rgba(122, 98, 98, 0) 100%)',
              'linear-gradient(to bottom, rgba(255, 241, 241, 0.28) 0%, rgba(255, 241, 241, 0) 14%)',
              'linear-gradient(to bottom, rgba(239, 184, 184, 0.86) 0%, rgba(229, 171, 171, 0.7) 26%, rgba(205, 181, 181, 0.46) 58%, rgba(184, 177, 177, 0.38) 74%, rgba(233, 230, 230, 0.2) 100%)'
            ].join(', ')
          }}
        />
      ))}
    </div>

    <div className="absolute inset-y-0 right-0 w-1/2 flex items-stretch justify-end gap-[2px] px-3">
      {[...Array(11)].map((_, i) => (
        <div
          key={`right-${i}`}
          className="w-[50px] bg-[#4a4540] opacity-15 flex-shrink-0 border-r border-white/20"
        />
      ))}
    </div>

    <div
      className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full"
      style={{
        width: 'min(42rem, 92vw)',
        height: 'min(42rem, 92vw)',
        background: 'radial-gradient(circle at 50% 40%, rgba(244,239,230,0.99) 0%, rgba(244,239,230,0.94) 46%, rgba(244,239,230,0.62) 74%, rgba(244,239,230,0.18) 90%, rgba(244,239,230,0) 100%)',
        filter: 'blur(10px)'
      }}
    />
  </div>
*/
