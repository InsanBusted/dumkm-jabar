import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const kategori = await prisma.kategori.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(kategori);
  } catch (error) {
    console.error("Prisma Error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
