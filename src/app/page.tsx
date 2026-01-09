"use client";

import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ngos } from "@/lib/mock-data";

import Link from "next/link"; /* Added Link import */

export default function Home() {
  // Flatten requirements from all NGOs for display
  const emergencyRequirements = ngos.flatMap(ngo =>
    ngo.requirements.filter(req => req.status === "Urgent").map(req => ({ ...req, ngoName: ngo.name }))
  );

  // Latest requests - adding placeholder text/images for visual parity if missing
  const latestRequests = ngos.flatMap(ngo =>
    ngo.requirements.map(req => ({ ...req, ngoName: ngo.name }))
  ).slice(0, 6);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. Minimal Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              KindConnect Platform
            </div>
            <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
              Empowering Change, <br />
              <span className="text-primary mt-2 block">One Donation at a Time.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Directly support verified NGOs and track your impact. Simple, transparent, and built for trust.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row pt-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full">Explore Causes</Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">How it works</Button>
            </div>
          </div>

          {/* Hero Image - Minimal/Collage Style */}
          <div className="relative h-[400px] lg:h-[600px] w-full">
            <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-[40px] overflow-hidden shadow-2xl z-10">
              <Image
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000"
                alt="Happy Children"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute left-0 bottom-10 w-2/5 h-2/5 rounded-[30px] overflow-hidden shadow-xl border-4 border-background z-20">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600"
                alt="Helping Hand"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute right-10 bottom-0 w-64 h-64 bg-primary/5 rounded-full -z-10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* 2. Emergency Requirements */}
      <section className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-3xl font-bold text-red-600">Emergency Requirements</h2>
          </div>
          <Link href="/ngos"><Button variant="link">View All</Button></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {emergencyRequirements.map((req) => (
            <Link href={`/cause/${req.id}`} key={req.id} className="block group">
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={req.image || "/placeholder.svg"}
                    alt={req.item}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-sm z-10">
                    URGENT
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-medium text-primary">
                      <MapPin className="h-3 w-3" /> {req.ngoName}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{req.category}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors" title={req.item}>{req.item}</h3>

                  <div className="mt-auto space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-primary">₹{req.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground">of ₹{req.target.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                        <div
                          className="h-full bg-primary transition-all duration-500 ease-out"
                          style={{ width: `${Math.min(100, (req.raised / req.target) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <Button className="w-full font-semibold rounded-xl">Donate Now</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Filter Section */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold">Find a specific cause</h2>
            <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row shadow-lg p-4 rounded-xl bg-card border">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search requirements..."
                  className="h-11 w-full rounded-lg bg-background px-10 ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                />
              </div>
              <div className="flex gap-4 flex-1">
                <select className="h-11 flex-1 rounded-lg bg-background px-3 ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary pointer-events-auto cursor-pointer">
                  <option>All Locations</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Delhi</option>
                </select>
                <select className="h-11 flex-1 rounded-lg bg-background px-3 ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-primary pointer-events-auto cursor-pointer">
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Medical</option>
                  <option>Essentials</option>
                </select>
              </div>
              <Button className="h-11 px-8 shadow-md">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest NGO Requests */}
      <section className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Latest NGO Requests</h2>
          <Button variant="link" className="hidden md:flex">View Updates</Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestRequests.map((req) => (
            <Link href={`/cause/${req.id}`} key={req.id} className="block group">
              <div className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 h-full">
                {/* Added Image to Latest Requests as requested */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={req.image || "/placeholder.svg"}
                    alt={req.item}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                    {req.category}
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="mb-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {req.ngoName}
                  </div>
                  <h3 className="mb-2 text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">{req.item}</h3>
                  <div className="mt-auto pt-4 border-t w-full">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Target</p>
                        <p className="font-semibold text-primary">{req.cost}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-medium">{req.quantity}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground group-hover:border-primary">View Details</Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <Button variant="ghost" size="lg">Load More Requests</Button>
        </div>
      </section>
    </div>
  );
}
