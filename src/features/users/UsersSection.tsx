import UserDetails from './UserDetails'
import UserList from './UserList'
import { useRefetchOnInvalidate } from '../../hooks/useRefetchOnInvalidate'

const UsersSection = () => {
  useRefetchOnInvalidate('users', ['users'], {
    additionalQueryKeys: [['user']],
  })

  return (
    <section className="grid gap-5 lg:grid-cols-[2fr,1fr]">
      <UserList />
      <UserDetails />
    </section>
  )
}

export default UsersSection
