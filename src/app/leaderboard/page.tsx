export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Weekly Leaderboard</h1>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">XP</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3, 4, 5].map((rank) => (
                <tr key={rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className={`font-bold text-lg ${
                      rank === 1 ? 'text-yellow-500' :
                      rank === 2 ? 'text-gray-400' :
                      rank === 3 ? 'text-orange-500' :
                      'text-gray-600'
                    }`}>
                      #{rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">User {rank}</td>
                  <td className="px-6 py-4 text-gray-600">{(rank * 100)} XP</td>
                  <td className="px-6 py-4">
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
