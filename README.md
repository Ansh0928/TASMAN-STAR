# 🐟 TASMAN-STAR — Customer-Facing Seafood E-Commerce Frontend

> **Live:** [https://tasman-star.vercel.app](https://tasman-star.vercel.app)
>
> The public-facing storefront for **Tasman Star Seafoods**, a Gold Coast-based premium seafood retailer. Customers can browse products, view collections, search inventory, add items to cart, and check out — all powered by the **Shopify Storefront API** on the backend.
>
> ---
>
> ## ✨ What It Does
>
> - **Product Browsing** — Dynamic product pages with images, pricing, and variants pulled from Shopify
> - - **Collections** — Browse seafood by category (fish, prawns, oysters, crustaceans, etc.)
>   - - **Search** — Full-text product search across the entire catalog
>     - - **Shopping Cart** — Client-side cart with add/remove/quantity controls and a slide-out sidebar
>       - - **Checkout** — Seamless Shopify-powered checkout flow
>         - - **Deals Page** — Highlighted specials and discounted products
>           - - **Our Business** — Company story, sourcing info, and an interactive Australian fleet network map
>             - - **About Us** — Brand mission and values
>               - - **Dark/Light Mode** — Full theme toggle across the entire site
>                 - - **3D Landing Page** — Three.js / React Three Fiber hero section
>                   - - **Responsive** — Mobile-first design with hamburger menu navigation
>                    
>                     - ---
>
> ## 🛠️ Tech Stack
>
> | Category | Technology |
> |----------|-----------|
> | Framework | Next.js 16 (App Router) |
> | Language | TypeScript |
> | Styling | Tailwind CSS 4 |
> | E-Commerce | Shopify Storefront API |
> | 3D Graphics | Three.js, React Three Fiber, Drei |
> | Animations | Framer Motion |
> | Maps | react-simple-maps |
> | Data Parsing | PapaParse (CSV inventory import) |
> | Icons | Lucide React |
>
> ---
>
> ## 📁 Project Structure
>
> ```
> src/
> ├── app/
> │   ├── page.tsx              # Homepage (hero, featured products, map)
> │   ├── about/                # About page
> │   ├── about-us/             # About Us section
> │   ├── our-business/         # Company info with 5 sections
> │   ├── our-products/         # Full product catalog page
> │   ├── deals/                # Deals & promotions
> │   ├── product/[handle]/     # Dynamic product detail pages
> │   ├── collections/[handle]/ # Dynamic collection pages
> │   ├── search/               # Product search results
> │   ├── checkout/             # Checkout flow
> │   ├── actions/              # Server actions
> │   └── api/shopify-test/     # Shopify API test endpoint
> ├── components/
> │   ├── CartProvider.tsx       # Cart context provider
> │   ├── CartSidebar.tsx        # Slide-out cart drawer
> │   ├── CartIcon.tsx           # Cart icon with item count
> │   ├── AddToCartBar.tsx       # Add-to-cart button bar
> │   ├── SearchBar.tsx          # Product search component
> │   ├── FleetNetworkMap.tsx    # Interactive Australian map
> │   ├── ThemeProvider.tsx      # Dark/Light mode context
> │   ├── ThemeToggle.tsx        # Theme toggle button
> │   ├── MobileMenu.tsx         # Mobile navigation menu
> │   ├── Footer.tsx             # Site footer
> │   └── map/                   # Map sub-components
> ├── lib/
> │   ├── shopify/               # Shopify Storefront API client & queries
> │   ├── data.ts                # Static data / fallbacks
> │   └── cart-validation.ts     # Cart validation logic
> └── middleware.ts              # Next.js middleware
> ```
>
> ---
>
> ## 🚀 Getting Started
>
> ### Prerequisites
> - Node.js 18+
> - - A Shopify store with Storefront API access
>  
>   - ### Installation
>  
>   - ```bash
>     # Clone the repo
>     git clone https://github.com/Ansh0928/TASMAN-STAR.git
>     cd TASMAN-STAR
>
>     # Install dependencies
>     npm install
>
>     # Set up environment variables
>     cp .env.example .env.local
>     # Add your Shopify Storefront API credentials
>
>     # Run development server
>     npm run dev
>     ```
>
> Open [http://localhost:3000](http://localhost:3000) to view the app.
>
> ### Environment Variables
>
> ```
> NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
> NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
> ```
>
> ---
>
> ## 🚢 Deployment
>
> Deployed on **Vercel** with auto-deploys from the `master` branch.
>
> **Live URL:** [https://tasman-star.vercel.app](https://tasman-star.vercel.app)
>
> ---
>
> ## 🔗 Related Tasman Projects
>
> | Project | Description | Link |
> |---------|------------|------|
> | [TASMAN-ADMIN](https://github.com/Ansh0928/TASMAN-ADMIN) | Full admin panel + e-commerce backend (orders, wholesale, notifications) | [tasman-admin.vercel.app](https://tasman-admin.vercel.app) |
> | [TASMAN-STAR-transport](https://github.com/Ansh0928/TASMAN-STAR-transport) | Freight/transport booking app (mobile + admin web) | [tasman-transport-admin.vercel.app](https://tasman-transport-admin.vercel.app) |
> | [Tasman-Sales-Rep](https://github.com/Ansh0928/Tasman-Sales-Rep) | iOS sales rep visit tracker + admin dashboard | [tasman-sales-rep.vercel.app](https://tasman-sales-rep.vercel.app) |
> | [tasmanstarseafoodmarket](https://github.com/Ansh0928/tasmanstarseafoodmarket) | Marketing website (React + Vite) with product showcase | — |
>
> ---
>
> ## 📄 License
>
> MIT
