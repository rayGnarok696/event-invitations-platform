import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/templates';

export async function GET() {
  const categories = getAllCategories();
  return NextResponse.json(categories);
}
