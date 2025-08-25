"use client"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-indigo-800 to-slate-900 border-t border-blue-600/30 mt-auto shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-white/90">
        © {new Date().getFullYear()} SIGNA. Todos los derechos reservados.
      </div>
    </footer>
  )
}
