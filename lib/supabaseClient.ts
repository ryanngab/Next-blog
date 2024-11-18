// import { createClient } from '@supabase/supabase-js';

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_KEY!
// );

// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Key dari environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Membuat instance Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
