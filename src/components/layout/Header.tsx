"use client"

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 shadow-lg border-b-2 border-blue-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-blue-100 rounded-xl mr-3 shadow-md flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-sm">TRADEMARK</h1>
              <span className="text-sm font-medium text-blue-100 ml-1">Brand Control</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Inicio
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
