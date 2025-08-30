import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();

    const { chatId, name } = await req.json();

    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { name },
      { new: true } // return updated doc
    );

    if (!updatedChat) {
      return NextResponse.json(
        { success: false, message: "Chat not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Chat renamed", chat: updatedChat });
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
