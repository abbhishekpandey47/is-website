import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative flex items-center justify-center mb-8">
        <div className="animate-bounce text-blue-800 text-[125px] font-bold mr-8">
          4
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin text-blue-800"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div className="animate-bounce text-blue-800 text-[125px] font-bold ml-8">
          4
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">Oops! You seem lost in space...</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for might have drifted away into the unknown.
      </p>
      <Link href="/">
        <button className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900 transition-colors">
          Take me Home
        </button>
      </Link>
    </div>
  );
}
