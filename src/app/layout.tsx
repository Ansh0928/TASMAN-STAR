import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Tasman Star Market | Premium Seafood',
  description: 'Track your catch directly to the source with our interactive market experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-slate-300 font-sans min-h-screen flex justify-center selection:bg-[#FF8543]/30 selection:text-white antialiased">

        {/* Desktop Web Layout */}
        <div className="w-full bg-[#020C1B] min-h-screen flex flex-col relative overflow-x-hidden">

          {/* Web Header */}
          <header className="sticky top-0 z-50 w-full bg-[#0A192F]/90 backdrop-blur-md border-b border-[#FF8543]/20">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

              {/* Logo */}
              <div className="flex items-center gap-2">
                <a href="/" className="h-16 w-auto flex items-center">
                  <img src="/assets/tasman-star-logo.png" alt="Tasman Star Seafoods" className="h-full w-auto object-contain drop-shadow-md brightness-0 invert" />
                </a>
              </div>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-6 font-sans font-medium text-sm text-slate-300 ml-4 shrink-0">
                <a href="/deals" className="hover:text-[#E2743A] transition-colors flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
                  Deals
                </a>
                <a href="/our-business" className="hover:text-[#E2743A] transition-colors">Our Business</a>
              </nav>

              {/* Central Search Bar (Uber Eats Style) */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-focus-within:text-[#FF8543] transition-colors"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for fresh seafood, platters, or regions..."
                  className="w-full bg-[#112240] hover:bg-[#1A365D] border-2 border-transparent transition-all text-white rounded-full py-3.5 pl-12 pr-6 text-[15px] focus:outline-none focus:bg-[#0A192F] focus:border-[#FF8543] placeholder-slate-400 shadow-inner"
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button className="bg-[#FF8543] hover:bg-[#E2743A] text-white px-4 py-1.5 rounded-full text-sm font-bold transition-colors">Find</button>
                </div>
              </div>

              {/* Actions (Cart & Mobile Menu) */}
              <div className="flex items-center gap-4 shrink-0">
                <button className="flex items-center gap-2 bg-white hover:bg-slate-100 text-black px-5 py-3 rounded-full font-bold transition-transform hover:scale-105 text-sm font-sans shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  Cart
                  <span className="bg-[#FF8543] text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full ml-1">0</span>
                </button>
              </div>

            </div>
          </header>

          <main className="flex-grow w-full">
            {children}
          </main>

        </div>

      </body>
    </html>
  )
}
