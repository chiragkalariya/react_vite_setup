import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser, toggleDensity } from '../ui/uiSlice'

const SettingsPanel = () => {
  const dispatch = useAppDispatch()
  const { compactCards, selectedUserId } = useAppSelector((state) => state.ui)

  return (
    <section className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Controls</p>
          <h3 className="text-xl font-semibold text-white">Stability levers</h3>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-200">
          Redux Toolkit
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <label className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm">
          <div>
            <p className="font-semibold text-white">Compact cards</p>
            <p className="text-xs text-slate-300">
              Toggles density via global Redux state.
            </p>
          </div>
          <input
            type="checkbox"
            checked={compactCards}
            onChange={() => dispatch(toggleDensity())}
            className="h-5 w-5 accent-sky-400"
          />
        </label>

        <button
          type="button"
          onClick={() => dispatch(selectUser(null))}
          disabled={!selectedUserId}
          className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Clear selection
        </button>

        <div className="rounded-xl border border-white/5 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 px-4 py-3 text-xs text-slate-200">
          <p className="font-semibold text-white">Stability + performance</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>Suspense-backed queries keep UI responsive.</li>
            <li>Axios client centralizes retries & timeouts.</li>
            <li>Lazy loaded panels trim the initial bundle.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SettingsPanel
