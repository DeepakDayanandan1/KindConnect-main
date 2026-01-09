import { supabase } from "@/lib/supabase";
import { MapPin, Calendar, ShoppingBag, Heart, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MealCalendar } from "@/components/meal-calendar";
import { NGORequirements } from "@/components/ngo-requirements";

async function getNGO(id: string) {
  const { data } = await supabase
    .from("ngos")
    .select("*, requirements(*), meal_slots(*)")
    .eq("id", id)
    .single();
  return data;
}

export default async function NGODetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ngo = await getNGO(id);

  if (!ngo) notFound();

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Header Profile */}
      <section className="bg-emerald-950 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border-4 border-emerald-800 shadow-2xl md:h-64 md:w-64">
              <Image
                src={ngo.image_url || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"}
                alt={ngo.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300 ring-1 ring-emerald-500/30">
                  {ngo.type} NGO
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Verified Partner</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold md:text-6xl">{ngo.name}</h1>
              <div className="flex items-center gap-2 text-emerald-200/70">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{ngo.location}</span>
              </div>
              <p className="max-w-2xl text-lg text-emerald-100/80">
                {ngo.description || "Dedicated to making a difference through direct support and transparent operations. Join us in meeting the specific needs of our community."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <Tabs defaultValue="requirements" className="w-full">
          <div className="mb-8 border-b pb-4">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger 
                value="requirements" 
                className="rounded-none border-b-2 border-transparent px-8 py-3 text-lg font-bold data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Shopping List
              </TabsTrigger>
              <TabsTrigger 
                value="meals" 
                className="rounded-none border-b-2 border-transparent px-8 py-3 text-lg font-bold data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600"
              >
                <Calendar className="mr-2 h-5 w-5" /> Food Calendar
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="rounded-none border-b-2 border-transparent px-8 py-3 text-lg font-bold data-[state=active]:border-emerald-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-600"
              >
                <Info className="mr-2 h-5 w-5" /> About & Impact
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="requirements" className="mt-0">
            <NGORequirements requirements={ngo.requirements} />
          </TabsContent>

          <TabsContent value="meals" className="mt-0">
            <div className="rounded-3xl border bg-card p-8 shadow-sm">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Book a Meal</h2>
                  <p className="text-muted-foreground">Choose a date and meal type to sponsor for our residents.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-muted" />
                    <span className="text-xs font-medium">Booked</span>
                  </div>
                </div>
              </div>
              
              <MealCalendar initialSlots={ngo.meal_slots} ngoId={ngo.id} />
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-0">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400">Our Mission</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  At {ngo.name}, we believe in direct action and radical transparency. Every donation made through this platform goes directly towards the specific items or meals you choose.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our team ensures that every requirement is fulfilled with quality and that proof of impact is shared with every donor within 48 hours of fulfillment.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="rounded-2xl bg-muted/50 p-6">
                    <div className="text-3xl font-bold text-emerald-600">98%</div>
                    <div className="text-sm font-medium text-muted-foreground">Transparency Score</div>
                  </div>
                  <div className="rounded-2xl bg-muted/50 p-6">
                    <div className="text-3xl font-bold text-emerald-600">2.4k+</div>
                    <div className="text-sm font-medium text-muted-foreground">Donors Impacted</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1469571483350-06223599564d?q=80&w=1000"
                  alt="Impact"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
