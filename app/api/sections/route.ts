import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createSectionSchema = z.object({
  eventId: z.string(),
  templateId: z.string(),
  title: z.string(),
  content: z.string().optional(),
  customData: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createSectionSchema.parse(body);

    // Get the highest order number for this event
    const lastSection = await prisma.section.findFirst({
      where: { eventId: validatedData.eventId },
      orderBy: { order: 'desc' },
    });

    const order = (lastSection?.order ?? -1) + 1;

    const section = await prisma.section.create({
      data: {
        ...validatedData,
        order,
      },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error('Error creating section:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    );
  }
}
