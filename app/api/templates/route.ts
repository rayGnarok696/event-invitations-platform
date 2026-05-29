import { NextResponse } from 'next/server';
import { PREDEFINED_TEMPLATES, getAllCategories } from '@/lib/templates';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (category) {
    const templates = PREDEFINED_TEMPLATES.filter(
      (t) => t.category === category
    );
    return NextResponse.json(templates);
  }

  return NextResponse.json(PREDEFINED_TEMPLATES);
}
