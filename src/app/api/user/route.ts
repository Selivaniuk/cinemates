import { NextResponse } from 'next/server'

import user from '../user.json'

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  return NextResponse.json(user)
}

// const getData = async (req: Request) => {
// //   const { searchParams } = new URL(req.url)
// //   const name = searchParams.get('name')
//   // user.filter
//   return  NextResponse.json(user)
// }
// export default getData
