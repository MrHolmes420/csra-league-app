import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Matchup = {
  home_team: string;
  away_team: string;
  reason: string;
  suggested_date: string;
};

export default function ScheduleBuilder() {
  const [matchups, setMatchups] = useState<Matchup[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data } = await supabase.rpc('suggest_matchups');
      setMatchups((data as Matchup[]) || []);
    };
    fetchSuggestions();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Schedule Suggestions</h1>
      {matchups.length === 0 ? (
        <p className="text-gray-400">No suggestions yet. Check if your teams have stats!</p>
      ) : (
        <ul className="space-y-4">
          {matchups.map((m, i) => (
            <li key={i} className="border p-4 rounded-lg shadow-sm">
              <p><strong>{m.home_team}</strong> vs <strong>{m.away_team}</strong></p>
              <p className="text-sm text-gray-500">{m.reason}</p>
              <p className="text-sm">Suggested Date: {m.suggested_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
