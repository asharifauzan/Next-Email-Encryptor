import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    id: 1,
    name: "Fauzan Hibatullah Ashari",
    email: "asharifauzan.h@gmail.com",
    publicKey: "TILAKA-AKALIT",
  });
}
