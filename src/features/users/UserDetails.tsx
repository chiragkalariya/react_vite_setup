import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '../../app/hooks'
import { fetchUser } from './api'

const UserDetails = () => {
  const selectedUserId = useAppSelector((state) => state.ui.selectedUserId)

  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => fetchUser(selectedUserId ?? 0),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(selectedUserId),
  })

  if (!selectedUserId) {
    return (
      <div className="glass-card h-full p-6 text-slate-300">
        <h3 className="text-lg font-semibold text-white">Profile focus</h3>
        <p className="mt-2 text-sm">
          Pick a teammate to inspect their profile. Each view reuses cached queries to
          stay instant.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-400">
          <span className="rounded-lg bg-white/5 px-3 py-2">Axios client</span>
          <span className="rounded-lg bg-white/5 px-3 py-2">Suspense mode</span>
          <span className="rounded-lg bg-white/5 px-3 py-2">Redux selection</span>
        </div>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="glass-card h-full p-6 text-slate-200">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Loading</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Fetching profile…</h3>
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div className="glass-card h-full p-6 text-slate-200">
        <h3 className="text-lg font-semibold text-white">Could not load profile</h3>
        <p className="mt-2 text-sm">Please select another user or retry in a moment.</p>
      </div>
    )
  }

  return (
    <div className="glass-card h-full p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected</p>
          <h3 className="text-2xl font-bold text-white">{user.name}</h3>
          <p className="text-sm text-slate-300">@{user.username}</p>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100">
          Cached
        </span>
      </div>

      <dl className="mt-5 space-y-3 text-sm text-slate-200">
        <div className="flex justify-between rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-400">Email</dt>
          <dd className="font-semibold">{user.email}</dd>
        </div>
        <div className="flex justify-between rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-400">Phone</dt>
          <dd className="font-semibold">{user.phone}</dd>
        </div>
        <div className="flex justify-between rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-400">Company</dt>
          <dd className="font-semibold">{user.company.name}</dd>
        </div>
        <div className="flex justify-between rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-400">Website</dt>
          <dd className="font-semibold">{user.website}</dd>
        </div>
        <div className="flex justify-between rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-400">City</dt>
          <dd className="font-semibold">{user.address.city}</dd>
        </div>
      </dl>
    </div>
  )
}

export default UserDetails
