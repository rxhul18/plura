// Import the Next.js Response object
import { NextResponse } from 'next/server';

// Define the GET request handler
export async function GET() {
  return NextResponse.json({ message: "Hello, Next.js!" });
}
