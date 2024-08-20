import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Pegar apenas usuarios com pagamento aprovado' }, { status: 200 });
}