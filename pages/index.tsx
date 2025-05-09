
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">CSRA Basketball League</h1>
          <p className="text-lg text-gray-300 mt-2">Where the Region’s Best Compete</p>
        </header>

        <section className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">🔥 See AI-Powered Matchups</h2>
            <p className="text-sm text-gray-300 mb-4">Smart scheduling based on performance.</p>
            <Link href="/schedule-builder" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 inline-block">
              View Matchups
            </Link>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">📊 Explore Stats & Games</h2>
            <p className="text-sm text-gray-300 mb-4">Player rankings, scores, and highlights.</p>
            <Link href="/dashboard" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 inline-block">
              Go to Dashboard
            </Link>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">🏀 League Highlights</h2>
          <div className="relative w-full h-[300px] bg-white/10 rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/example1"
              title="League Highlight Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm pt-10">
          &copy; {new Date().getFullYear()} CSRA League. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
