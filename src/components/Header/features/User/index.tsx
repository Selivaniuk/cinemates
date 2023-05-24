import UserInfo from './UserInfo'

import { User as UserType } from 'types/entities'

const User = async () => {
  const req = await fetch('http://localhost:3000/api/user')
  const user = (await req.json()) as UserType

  return <UserInfo user={user} />
}

export default User
