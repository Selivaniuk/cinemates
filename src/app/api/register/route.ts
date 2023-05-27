/* eslint-disable import/prefer-default-export */
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

import prisma from 'lib/prisma'

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string
      email: string
      password: string
    }

    const duplicate = await prisma.user.findUnique({ where: { email } })
    if (duplicate) {
      const exception = new Error()
      exception.name = 'Duplicate_user'
      exception.message = 'This email is already in use'

      throw exception
    }

    const hashed_password = await hash(password, 12)
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    })
    console.log('user', user)

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    if (error.name === 'Duplicate_user') {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'This email is already in use',
        }),
        { status: 400 },
      )
    }

    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 },
    )
  }
}
