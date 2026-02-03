export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-blue-600">User Profile</h1>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
                👤
              </div>
              <h2 className="text-2xl font-bold text-gray-900">User Name</h2>
              <p className="text-gray-600">user@example.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Statistics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Total XP</p>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Level</p>
                <p className="text-3xl font-bold text-purple-600">1</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Streak</p>
                <p className="text-3xl font-bold text-orange-500">0</p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Badges</h3>
            <div className="flex gap-4 flex-wrap">
              <div className="text-3xl">🥉</div>
              <div className="text-3xl opacity-30">🥈</div>
              <div className="text-3xl opacity-30">⭐</div>
              <div className="text-3xl opacity-30">🔥</div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h3>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-center">
              No projects yet. Complete sections to showcase your work!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
