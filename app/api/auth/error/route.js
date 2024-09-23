import { NextResponse } from 'next/server';

export function GET(request) {
  const url = new URL(request.url);
  const error = url.searchParams.get('error');

  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  }

  return NextResponse.json({ error: 'No error message found' });
}

  