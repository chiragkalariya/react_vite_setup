import { useQuery } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser } from '../ui/uiSlice'
import { fetchUsers, type User } from './api'

const densityClass = (compact: boolean) =>
  compact ? 'py-2.5 px-3 text-sm' : 'py-3 px-4 text-base'

const UserCard = ({
  user,
  isActive,
  compact,
  onSelect,
}: {
  user: User
  isActive: boolean
  compact: boolean
  onSelect: (id: number) => void
}) => (
  <button
    type="button"
    onClick={() => onSelect(user.id)}
    className={`text-left transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500/60 ${
      isActive ? 'bg-sky-500/20 ring-1 ring-sky-500/70' : 'bg-white/5 ring-1 ring-white/5'
    } ${densityClass(compact)} rounded-xl backdrop-blur-lg`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-white">{user.name}</p>
        <p className="text-xs text-slate-300">@{user.username}</p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100">
        {user.company.name}
      </span>
    </div>
    <div className="mt-3 flex items-center gap-3 text-xs text-slate-300">
      <span>{user.email}</span>
      <span className="h-1 w-1 rounded-full bg-slate-400" />
      <span>{user.address.city}</span>
    </div>
  </button>
)

const UserList = () => {
  const dispatch = useAppDispatch()
  const { selectedUserId, compactCards } = useAppSelector((state) => state.ui)
  const {
    data: users,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const handleSelect = (id: number) => {
    dispatch(selectUser(id))
  }

  if (isPending) {
    return (
      <section className="glass-card p-6 text-slate-200">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Loading</p>
        <h2 className="mt-1 text-2xl font-bold text-white">Fetching users…</h2>
        <p className="mt-2 text-sm text-slate-300">Hang tight while we load the directory.</p>
      </section>
    )
  }

  if (isError || !users) {
    return (
      <section className="glass-card p-6 text-slate-200">
        <h2 className="text-xl font-semibold text-white">Unable to load users</h2>
        <p className="mt-2 text-sm text-slate-300">
          Please check your connection and try again.
        </p>
      </section>
    )
  }

  return (
    <section className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Live data via Axios + TanStack
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">Team Directory</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-100">
          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-glow" />
          Stable queries
        </div>
      </div>

      <div
        className={`mt-5 grid gap-3 transition-all ${
          compactCards ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-1 lg:grid-cols-2'
        }`}
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            compact={compactCards}
            isActive={selectedUserId === user.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  )
}

export default UserList
