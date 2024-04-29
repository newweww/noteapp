'use server'

import Note from "@/app/models/noteModel"
import db from "../../lip/db"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await db();
        const notes = await Note.find();
        return new NextResponse(JSON.stringify(notes), {status: 200});
      } catch (error) {
        return NextResponse.error("Failed to fetch notes", { status: 500 });
      }
}

export async function POST(req) {
    await db();

    const { title, content, color } = await req.json();
    await Note.create({ title, content, color });

    return NextResponse.json({ message: "Note created" });
}

export async function DELETE(req) {
    await db();
    const id = req.nextUrl.searchParams.get("id");
    await Note.findByIdAndDelete(id);
    return NextResponse.json({ message: "Note deleted" });
}
