import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const prisma = new PrismaClient();
	const users = await prisma.user.findMany({ where: {} });
	prisma.$disconnect();
	return NextResponse.json({ success: true, data: users });
}
