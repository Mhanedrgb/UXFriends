import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">UXFriends</h1>
          <div className="flex gap-4 items-center">
            <Link href="/learn" className="text-gray-700 hover:text-blue-600">
              Learn
            </Link>
            <Link href="/challenges" className="text-gray-700 hover:text-blue-600">
              Challenges
            </Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-blue-600">
              Leaderboard
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Welcome Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              Welcome, {session.user.name || "Designer"}! 👋
            </h2>
            <p className="text-blue-100 mb-6">
              Continue your UX/UI learning journey and level up your skills.
            </p>
            <Link
              href="/learn"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Continue Learning →
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total XP</span>
                <span className="font-bold text-2xl text-blue-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Level</span>
                <span className="font-bold text-2xl text-blue-600">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Streak 🔥</span>
                <span className="font-bold text-2xl text-orange-500">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Challenges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Today's Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Challenge {i}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete this challenge to earn 30 XP
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                  Start
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Progress
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">
              Start learning to see your progress here!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
