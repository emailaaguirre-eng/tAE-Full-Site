import { NextResponse } from 'next/server';
import { artKeyStore } from '@/lib/artKeyStore';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  const record = artKeyStore.get(id);

  if (!record) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: record.id,
    status: record.status,
    productId: record.productId,
    cartItemId: record.cartItemId,
    artKeyData: record.artKeyData,
    createdAt: record.createdAt,
    activatedAt: record.activatedAt,
  });
}

