import { apiClient } from '../../api/client'

export type User = {
  id: number
  name: string
  email: string
  phone: string
  username: string
  website: string
  company: { name: string }
  address: { city: string }
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get<User[]>('/users')
  return data
}

export const fetchUser = async (id: number): Promise<User> => {
  const { data } = await apiClient.get<User>(`/users/${id}`)
  return data
}
