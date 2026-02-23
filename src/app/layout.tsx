import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import CartIcon from '@/components/CartIcon';
import CartSidebar from '@/components/CartSidebar';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Tasman Star Market | Premium Seafood',
  description: 'Fresh from the ocean, delivered to your door. Premium seafood from Tasman Star — prawns, oysters, salmon, platters & more.',
  openGraph: {
    title: 'Tasman Star Seafood Market',
    description: 'Fresh from the ocean, delivered to your door. Premium seafood — prawns, oysters, salmon, platters & more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tasman Star Seafood Market' }],
    type: 'website',
    siteName: 'Tasman Star Seafood Market',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tasman Star Seafood Market',
    description: 'Fresh from the ocean, delivered to your door. Premium seafood — prawns, oysters, salmon & more.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-theme="dark" suppressHydrationWarning>
      <body className="bg-theme-primary text-theme-secondary font-sans min-h-screen flex justify-center selection:bg-[#FF8543]/30 selection:text-white antialiased">
        <ThemeProvider>
          <CartProvider>
            {/* Desktop Web Layout */}
            <div className="w-full bg-theme-primary min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300">

              {/* Web Header */}
              <header className="sticky top-0 z-50 w-full bg-theme-header backdrop-blur-md border-b border-theme-accent transition-colors duration-300">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                  {/* Logo */}
                  <div className="flex items-center gap-2">
                    <a href="/" className="h-16 w-auto flex items-center bg-theme-primary rounded-xl px-2 transition-colors duration-300">
                      <img src="/assets/tasman-star-logo.png" alt="Tasman Star Seafoods" className="h-12 w-auto object-contain" />
                    </a>
                  </div>

                  {/* Desktop Nav Links */}
                  <nav className="hidden lg:flex items-center gap-6 font-sans font-medium text-sm text-theme-secondary ml-4 shrink-0">
                    <a href="/deals" className="hover:text-[#E2743A] transition-colors flex items-center gap-1 bg-theme-toggle border border-theme-toggle-border px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse"></span>
                      Deals
                    </a>
                    <a href="/our-business" className="hover:text-[#E2743A] transition-colors">Our Business</a>
                  </nav>

                  {/* Central Search Bar */}
                  <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-muted group-focus-within:text-[#FF8543] transition-colors"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for fresh seafood, platters, or regions..."
                      className="w-full bg-theme-tertiary hover:bg-theme-secondary border-2 border-transparent transition-all text-theme-primary rounded-full py-3.5 pl-12 pr-6 text-[15px] focus:outline-none focus:border-[#FF8543] placeholder:text-theme-muted shadow-inner"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <button className="bg-[#FF8543] hover:bg-[#E2743A] text-white px-4 py-1.5 rounded-full text-sm font-bold transition-colors">Find</button>
                    </div>
                  </div>

                  {/* Actions (Theme Toggle, Cart & Mobile Menu) */}
                  <div className="flex items-center gap-3 shrink-0">
                    <ThemeToggle />
                    <CartIcon />
                  </div>

                </div>
              </header>

              <main className="flex-grow w-full">
                {children}
              </main>

              <CartSidebar />
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
