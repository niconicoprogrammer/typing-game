import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log('🧑‍💻 User:', user);
  if (userError || !user) {
    console.error('❌ User not authenticated');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { score } = await req.json();
  console.log('📥 Received score:', score);

  // email から @より前を username として使う
  const username = user.email?.split('@')[0] ?? 'unknown';

  const { error } = await supabase.from('scores').insert({
    user_id: user.id,
    user_name: username, // ← 追加！
    score,
  });

  if (error) {
    console.error('❌ Insert error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('✅ Score inserted successfully');
  return NextResponse.json({ message: 'Success' });
}
