export interface User {
  id: string
  email: string
  username: string
  verified: boolean
  created_at: string
  updated_at: string
  sys_admin: boolean
  profileUrl?: string
  institution?: string
}
