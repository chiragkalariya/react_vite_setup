type LoadingSectionProps = {
  title?: string
  lines?: number
}

const LoadingSection = ({ title = 'Loading', lines = 4 }: LoadingSectionProps) => {
  return (
    <div className="glass-card p-6">
      <div className="mb-3 h-4 w-24 animate-pulse rounded-full bg-white/10" />
      <p className="mb-6 text-sm text-slate-300">{title}</p>
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className="h-4 w-full animate-pulse rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10"
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingSection
