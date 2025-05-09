
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ScheduleBuilder() {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    const fetchMatchups = async () => {
      const { data, error } = await supabase.rpc('suggest_matchups');
      if (error) console.error('Matchup error:', error);
      else setMatchups(data);
    };

    fetchMatchups();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">AI Schedule Suggestions</h1>

      {matchups.length > 0 ? (
        <ul>
          {matchups.map((m, i) => (
            <li key={i} className="border p-4 rounded-lg shadow-sm">
              <p><strong>{m.home_team}</strong> vs <strong>{m.away_team}</strong></p>
              <p className="text-sm text-gray-500">{m.reason}</p>
              <p className="text-sm">Suggested Date: {m.suggested_date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No suggestions yet. Check if your teams have stats!</p>
      )}
    </div>
  );
}
