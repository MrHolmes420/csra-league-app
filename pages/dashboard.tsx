import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

type Game = any;
type Highlight = any;
type TopPlayer = any;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [games, setGames] = useState<Game[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [topPlayers, setTopPlayers] = useState<TopPlayer[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await supabase
        .from('games')
        .select('*, home_team:home_team_id(name), away_team:away_team_id(name)')
        .order('game_date');
      setGames((data as Game[]) || []);
    };

    const fetchHighlights = async () => {
      const { data } = await supabase
        .from('highlights')
        .select('*, games!inner(game_date)')
        .limit(3)
        .order('created_at', { ascending: false });
      setHighlights((data as Highlight[]) || []);
    };

    const fetchTopPlayers = async () => {
      const { data } = await supabase.rpc('top_scorers');
      setTopPlayers((data as TopPlayer[]) || []);
    };

    fetchGames();
    fetchHighlights();
    fetchTopPlayers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">CSRA Basketball Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold">Upcoming Games</h2>
        <ul>
          {games.map((g) => (
            <li key={g.id} className="mt-2">
              {g.home_team.name} vs {g.away_team.name} on {g.game_date}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Recent Highlights</h2>
        <ul>
          {highlights.map((h) => (
            <li key={h.id} className="mt-4">
              <p>{h.description}</p>
              <iframe
                width="100%"
                height="315"
                src={h.video_url.replace('watch?v=', 'embed/')}
                title="Highlight Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Top Scorers</h2>
        <ul>
          {topPlayers.map((p) => (
            <li key={p.player_id} className="mt-1">
              {p.player_name}: {p.total_points} pts
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
