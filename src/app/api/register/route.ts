import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user && password !== user.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        password,
      },
    })
  }

  const token = jwt.sign(
    {
      email: user.email,
    },
    'next13token',
    {
      expiresIn: 1,
    },
  )

  return NextResponse.json({ token })
}
