import UserList from './UserList'
import { useRefetchOnInvalidate } from '../../hooks/useRefetchOnInvalidate'

const UsersSection = () => {
  useRefetchOnInvalidate('users', ['users'], {
    additionalQueryKeys: [['user']],
  })

  return <UserList />
}

export default UsersSection
