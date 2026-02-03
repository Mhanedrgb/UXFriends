export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Daily Challenges</h1>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">
                {["🎨", "📝", "🎯", "📐", "🧭"][i - 1]}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Daily Challenge {i}
              </h3>
              <p className="text-gray-600 mb-4">
                Complete this challenge to earn XP and badges!
              </p>
              <div className="text-sm text-blue-600 font-semibold">
                +30 XP
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
