import { createClient } from '@/lib/supabase/server';
import { CreateJournalEntry } from '@/types/payload/journal_entries';

export async function GET() {
  const supabase = await createClient();

  const { data: journal_entries } = await supabase.from('journal_entries').select('*');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return new Response(JSON.stringify(journal_entries), { status: 200, headers });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const req = await request.json();
  const { user_id, content, date } = req as CreateJournalEntry;

  const { data } = await supabase.from('journal_entries').upsert({ user_id, content, date }).select();

  return new Response(JSON.stringify(data), { status: 200 });
}
