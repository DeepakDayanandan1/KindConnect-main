"use client";

import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DonationModal } from "./donation-modal";

interface Requirement {
  id: string;
  title: string;
  category: string;
  target_amount: number;
  current_amount: number;
  image_url: string;
}

export function NGORequirements({ requirements }: { requirements: Requirement[] }) {
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {requirements?.map((req) => (
          <div key={req.id} className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md">
            <div className="relative h-48 w-full">
              <Image
                src={req.image_url || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800"}
                alt={req.title}
                fill
                className="object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black backdrop-blur-sm">
                {req.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-4 text-xl font-bold">{req.title}</h3>
              
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">₹{req.current_amount.toLocaleString()}</span>
                  <span className="text-muted-foreground">of ₹{req.target_amount.toLocaleString()}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (req.current_amount / req.target_amount) * 100)}%` }} 
                  />
                </div>
              </div>

              <Button 
                onClick={() => setSelectedReq(req)}
                className="w-full bg-emerald-600 font-bold hover:bg-emerald-700"
              >
                Purchase Now
              </Button>
            </div>
          </div>
        ))}
        
        {/* Random Donation Card */}
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-8 text-center dark:border-emerald-900/30 dark:bg-emerald-950/10">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50">
            <Heart className="h-8 w-8 fill-current" />
          </div>
          <h3 className="mb-2 text-xl font-bold">General Support</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Don't see a specific item you want to fund? Contribute any amount to our general welfare fund.
          </p>
          <div className="flex w-full flex-col gap-3">
            <input 
              type="number" 
              placeholder="Enter amount (₹)" 
              className="h-10 rounded-lg border bg-background px-4 text-center text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="general-donation-input"
            />
            <Button 
              onClick={() => {
                const amount = (document.getElementById('general-donation-input') as HTMLInputElement).value || "500";
                setSelectedReq({
                  id: 'general',
                  title: 'General Support',
                  category: 'monetary',
                  target_amount: parseInt(amount),
                  current_amount: 0,
                  image_url: ''
                });
              }}
              variant="outline" 
              className="w-full border-emerald-600 font-bold text-emerald-600 hover:bg-emerald-50"
            >
              Donate Now
            </Button>
          </div>
        </div>
      </div>

      <DonationModal
        isOpen={!!selectedReq}
        onClose={() => setSelectedReq(null)}
        itemTitle={selectedReq?.title || ""}
        amount={selectedReq?.target_amount || 0}
        onSuccess={() => {
          // In a real app, we would revalidate data here
        }}
      />
    </>
  );
}
