import UsersSection from '../features/users/UsersSection'

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Branch Management
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-800">Users</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          View and manage users from your organization directory.
        </p>
      </section>
      <UsersSection />
    </div>
  )
}

export default UsersPage
