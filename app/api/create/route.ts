import prisma from '@/lib/prisma';
import { HeroPayload } from '@/types/heroPayload';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data: HeroPayload = await request.json();
  const { nickname, realName, originDescription, superpowers, catchPhrase, images} = data;

  try {
    await prisma.heroes.create({
      data: {
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        images,
      },
    });
    return NextResponse.json({ message: 'Hero created successfully' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

