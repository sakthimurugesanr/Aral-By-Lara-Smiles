import { NextResponse } from 'next/server';
import { appointmentSchema } from '@/lib/appointment';
export async function POST(request: Request) {
    const headers = { 'Cache-Control': 'no-store' };
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin && origin !== process.env.NEXT_PUBLIC_SITE_URL) return NextResponse.json({ error: 'Origin not allowed.' }, { status: 403, headers });
    if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({ error: 'JSON required.' }, { status: 415, headers });
    try {
        const body = await request.text();
        if (new TextEncoder().encode(body).byteLength > 8000) return NextResponse.json({ error: 'Request too large.' }, { status: 413, headers });
        const parsed = appointmentSchema.safeParse(JSON.parse(body));
        if (!parsed.success) return NextResponse.json({ error: 'Please check your enquiry details.' }, { status: 400, headers });
        const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL; const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
        if (!url || !secret || !url.startsWith('https://script.google.com/')) return NextResponse.json({ error: 'Online enquiries are not configured. Please contact the clinic.' }, { status: 503, headers });
        const upstream = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret, enquiry: { ...parsed.data, website: undefined, createdAt: new Date().toISOString(), status: 'Enquiry — awaiting clinic confirmation' } }), signal: AbortSignal.timeout(12000) });
        if (!upstream.ok || !(await upstream.json()).ok) throw new Error('Upstream rejected enquiry');
        return NextResponse.json({ ok: true }, { headers });
    } catch { return NextResponse.json({ error: 'Unable to submit. Please call or use WhatsApp.' }, { status: 502, headers }); }
}
