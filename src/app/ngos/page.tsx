import { supabase } from "@/lib/supabase";
import { Search, MapPin, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

async function getNGOs() {
  const { data } = await supabase.from("ngos").select("*");
  return data || [];
}

export default async function NGOList() {
  const ngos = await getNGOs();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Partner NGOs</h1>
          <p className="text-muted-foreground">Browse our verified partner NGOs and their current requirements.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search NGOs..."
              className="h-10 w-full rounded-lg border bg-background px-9 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ngos.map((ngo: any) => (
          <Link 
            key={ngo.id} 
            href={`/ngos/${ngo.id}`}
            className="group overflow-hidden rounded-3xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-56 w-full">
              <Image
                src={ngo.image_url || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"}
                alt={ngo.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                {ngo.type}
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <MapPin className="h-3 w-3" /> {ngo.location}
              </div>
              <h3 className="mb-3 text-2xl font-bold group-hover:text-emerald-600 transition-colors">{ngo.name}</h3>
              <p className="mb-6 line-clamp-2 text-sm text-muted-foreground">
                {ngo.description || "Connecting donors with specific needs to make a direct impact."}
              </p>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Verified Partner
                </div>
                <div className="flex items-center text-sm font-bold text-emerald-600">
                  View Profile <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
