import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from './api'

const UsersTable = () => {
  const {
    data: users,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isPending) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Loading users…</p>
      </section>
    )
  }

  if (isError || !users) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-800">Unable to load users</p>
        <p className="mt-1 text-sm text-slate-500">Please check your connection and try again.</p>
      </section>
    )
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">User List</h2>
        <p className="mt-1 text-sm text-slate-500">{users.length} users found</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="border-b border-slate-200 px-6 py-3 font-semibold">#</th>
              <th className="border-b border-slate-200 px-6 py-3 font-semibold">Name</th>
              <th className="border-b border-slate-200 px-6 py-3 font-semibold">Email</th>
              <th className="border-b border-slate-200 px-6 py-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-3 text-slate-500">{index + 1}</td>
                <td className="px-6 py-3 font-medium text-slate-800">{user.name}</td>
                <td className="px-6 py-3 text-slate-600">{user.email}</td>
                <td className="px-6 py-3 text-slate-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UsersTable
