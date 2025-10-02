import Link from "next/link";

export default function Screen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-100 via-indigo-100 to-white">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-800 mb-6 text-center">
        Welcome to the Second Screen 🎉
      </h2>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-gray-700 mb-8 text-center max-w-xl">
        This is where your next content goes.
      </p>

      {/* Back Button */}
      <Link href="/thermo-two" passHref>
        <button className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-md bg-indigo-700 px-6 font-medium text-white shadow-lg transition active:scale-95 hover:bg-indigo-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>
      </Link>
    </div>
  );
}
