import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/mongodb";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ status: "success", users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return NextResponse.json({ status: "error", message: "Failed to fetch users" }, { status: 500 });
  }
}