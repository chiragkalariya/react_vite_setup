import { apiClient } from '../../api/client'

export type User = {
  id: number
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await apiClient.get<User[]>('/api/users')
  return data
}

export const fetchUser = async (id: number): Promise<User> => {
  const { data } = await apiClient.get<User>(`/api/users/${id}`)
  return data
}
