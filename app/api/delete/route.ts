import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  try {
    await prisma.heroes.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: 'Hero deleted successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

