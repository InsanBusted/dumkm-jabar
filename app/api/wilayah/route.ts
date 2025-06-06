import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wilayah = await prisma.wilayah.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(wilayah);
  } catch (error) {
    console.error("Error fetching wilayah:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
