import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import UserInfo from './UserInfo'

import authOptions from 'lib/auth'
import prisma from 'lib/prisma'

const User = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/signin')
  }
  const userEmail = session.user?.email ?? undefined
  if (!userEmail) return null
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { name: true, image: true },
  })

  return <UserInfo image={user?.image} name={user?.name} />
}

export default User
