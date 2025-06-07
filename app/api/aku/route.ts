import { getOrCreateUser } from "@/lib/actions/getOrCreateUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getOrCreateUser();
    return NextResponse.json(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
