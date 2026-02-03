export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-blue-600">Learning Path</h1>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-600 text-center">
            Learning path content will be displayed here. Start your journey by completing lessons and unlocking new units!
          </p>
        </div>
      </main>
    </div>
  );
}
