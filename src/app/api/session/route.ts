import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import authOptions from 'lib/auth'

// eslint-disable-next-line import/prefer-default-export
export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions)

  return NextResponse.json({
    authenticated: !!session,
    session,
  })
}
