import { v4 as uuid } from 'uuid'
import { User } from '../types/UserTypes'
import Chance from 'chance'

const chance = new Chance()

export const mockUser: User = {
  id: uuid(),
  email: chance.email(),
  username: chance.first(),
  verified: true,
  created_at: chance.timestamp().toString(),
  updated_at: chance.timestamp().toString(),
  sys_admin: true,
  profileUrl: 'https://i.pravatar.cc/150',
  institution: 'Great University',
}
