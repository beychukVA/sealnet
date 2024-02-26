export interface Access {
  id: string
  observation_id: string
  role: string
  user_id: string
  user_name: string
}

export interface UserAccess {
  accessId: string
  userName: string
  email: string
  role: string
}
