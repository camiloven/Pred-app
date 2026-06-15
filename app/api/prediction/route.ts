import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const matchId = url.searchParams.get('matchId') || '';
  
  const res = await fetch(`https://api.football-data.org/v4/matches/${matchId}`, {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY || '' }
  });
  
  const data = res.ok ? await res.json() : null;
  return NextResponse.json({ ok: res.ok, data });
}
