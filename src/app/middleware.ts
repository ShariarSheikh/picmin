import { NextRequest, NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function middleware(_request: NextRequest) {
  return NextResponse.next()
}
