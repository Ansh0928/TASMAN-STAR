import { ClipboardList, Phone } from 'lucide-react';

export default function WholesalePage() {
    return (
        <div className="min-h-screen bg-theme-primary flex flex-col transition-colors duration-300">

            {/* Hero */}
            <div className="w-full h-[40vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img src="/assets/wholesale.png" className="absolute inset-0 w-full h-full object-cover" alt="Wholesale Fish Market" />
                <div className="relative z-20 text-center px-6">
                    <span className="text-[#FF8543] font-bold tracking-widest uppercase text-sm mb-2 block">Our Business</span>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Wholesale Supply</h1>
                    <p className="text-xl text-slate-200 font-light max-w-xl mx-auto">Providing chefs and grocers with uncompromised quality.</p>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">

                {/* Two Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card 1: Sign Up for Daily Products */}
                    <div className="bg-theme-card rounded-3xl border border-theme-subtle shadow-lg overflow-hidden flex flex-col">
                        <div className="bg-[#0A192F] p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-[#FF8543]/10 flex items-center justify-center mx-auto mb-4">
                                <ClipboardList size={32} className="text-[#FF8543]" />
                            </div>
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Daily Product List</h2>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <p className="text-theme-muted text-center mb-6">
                                Sign up to receive our daily wholesale product list so you always know what&apos;s fresh and available straight off the boats.
                            </p>
                            <ul className="space-y-3 text-theme-secondary text-sm mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF8543] font-bold mt-0.5">&#10003;</span>
                                    Daily updates on available catch
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF8543] font-bold mt-0.5">&#10003;</span>
                                    Wholesale pricing for registered partners
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF8543] font-bold mt-0.5">&#10003;</span>
                                    First access to limited &amp; rare species
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF8543] font-bold mt-0.5">&#10003;</span>
                                    Custom filleting &amp; portion control
                                </li>
                            </ul>
                            <div className="mt-auto text-center">
                                <a
                                    href="https://app.fresho.com/tasman-star-seafoods"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#FF8543] hover:bg-[#E2743A] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg text-lg"
                                >
                                    Sign Up on Fresho
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Contact the Sales Team */}
                    <div className="bg-theme-card rounded-3xl border border-theme-subtle shadow-lg overflow-hidden flex flex-col">
                        <div className="bg-[#0A192F] p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-[#FF8543]/10 flex items-center justify-center mx-auto mb-4">
                                <Phone size={32} className="text-[#FF8543]" />
                            </div>
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Contact Sales Team</h2>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <p className="text-theme-muted text-center mb-6">
                                For more information about wholesale accounts, pricing, delivery schedules, or custom orders — get in touch with our sales team directly.
                            </p>
                            <div className="bg-[#0A192F] rounded-2xl p-6 text-center mb-8">
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Call The Sales Team</p>
                                <a href="tel:04222222" className="text-3xl md:text-4xl font-bold text-[#FF8543] hover:text-[#E2743A] transition-colors">
                                    04222222
                                </a>
                            </div>
                            <ul className="space-y-3 text-theme-secondary text-sm mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF8543] font-bold mt-0.5">&#10003;</span>
                                    Dedicated account manager
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF8543] font-bold mt-0.5">&#10003;</span>
                                    Flexible delivery schedules
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF8543] font-bold mt-0.5">&#10003;</span>
                                    Volume-based pricing
                                </li>
                            </ul>
                            <div className="mt-auto text-center">
                                <a
                                    href="tel:04222222"
                                    className="inline-block bg-[#0A192F] hover:bg-[#112240] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg text-lg border border-[#FF8543]/30"
                                >
                                    Call Now
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}
