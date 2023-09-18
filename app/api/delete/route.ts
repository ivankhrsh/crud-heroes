import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  const { id } = data;

  try {
    await prisma.heroes.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: 'Hero deleted successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

