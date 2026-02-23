import { Snowflake, MapPin, Truck } from 'lucide-react';

export default function FleetsPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Image Header Banner */}
            <div className="w-full h-[60vh] relative overflow-hidden bg-[#0A192F]">
                <img src="/assets/tasman-star-fleet.png" alt="Tasman Star Seafoods Fleet" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-10 z-10">
                    <div className="container mx-auto px-6">
                        <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">Our Fleet</h1>
                        <p className="text-xl text-slate-200 font-light drop-shadow-md">
                            Specialized vehicles to guarantee uncompromised quality from the docks to your door.
                        </p>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-8 py-16 flex flex-col gap-16 max-w-5xl">

                <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="w-12 h-12 bg-[#fff3ec] rounded-full flex items-center justify-center mb-6">
                            <Snowflake className="text-[#FF8543]" size={24} />
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-black mb-4">Unbroken Cold Chain</h2>
                        <p className="text-slate-600 leading-relaxed">
                            A pristine fillet of fish can be ruined by an hour of improper temperatures. Our entire fleet of 15 vehicles are custom-fitted with advanced refrigeration units that maintain a constant, optimal temperature from the moment the fish leaves our processing floor to the moment it hits your kitchen or doorstep.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img src="https://images.unsplash.com/photo-1549416878-b9ca95e26903?auto=format&fit=crop&q=80&w=800&h=600" className="w-full h-full object-cover" alt="Refrigerated Truck" />
                    </div>
                </section>



            </main>
        </div>
    );
}
