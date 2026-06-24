const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Realtime invalidations
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Socket events invalidate cached queries once, then refresh the active data without
          duplicate fetches.
        </p>
      </section>

      <section className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white">Overview</h2>
        <p className="mt-2 text-sm text-slate-300">
          Open Branch Management in the sidebar and select Users to manage your team.
        </p>
      </section>
    </div>
  )
}

export default DashboardPage
