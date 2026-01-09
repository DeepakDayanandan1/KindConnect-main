import { supabase } from "@/lib/supabase";
import { Heart, Trophy, Calendar, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {
  // Mock data for now since we don't have a logged in user yet in this environment
  const stats = {
    totalDonated: 12500,
    needsMet: 8,
    impactScore: 450,
    tier: "Silver",
    nextTier: "Gold",
    progress: 65,
  };

  const recentDonations = [
    { id: 1, item: "Wheelchair", ngo: "Grace Welfare Center", amount: 5000, date: "2024-03-10", status: "completed", proof: true },
    { id: 2, item: "School Kit", ngo: "Happy Kids Home", amount: 500, date: "2024-03-05", status: "completed", proof: true },
    { id: 3, item: "Heart Surgery Fund", ngo: "Heart Care Foundation", amount: 2000, date: "2024-02-28", status: "completed", proof: true },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Welcome back, Kind Soul</h1>
          <p className="text-muted-foreground">Your generosity is changing lives every day.</p>
        </div>
        <div className="flex items-center gap-4 rounded-3xl border bg-card p-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Tier</div>
            <div className="text-xl font-bold text-amber-600">{stats.tier} Member</div>
          </div>
          <div className="ml-8 hidden h-2 w-32 overflow-hidden rounded-full bg-muted md:block">
            <div className="h-full bg-amber-500" style={{ width: `${stats.progress}%` }} />
          </div>
          <div className="hidden text-xs font-bold text-muted-foreground md:block">
            {100 - stats.progress}% to {stats.nextTier}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Stats Cards */}
        <div className="col-span-1 space-y-8 lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Total Contributed", value: `₹${stats.totalDonated.toLocaleString()}`, icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
              { label: "Needs Fulfilled", value: stats.needsMet, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Impact Score", value: stats.impactScore, icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Impact</h2>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="text-emerald-600">View All</Button>
              </Link>
            </div>
            
            <div className="space-y-6">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="group flex items-center justify-between rounded-2xl border p-4 transition-all hover:bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <Heart className="h-6 w-6 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold">{donation.item}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{donation.ngo}</span>
                        <span>•</span>
                        <span>{donation.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">₹{donation.amount.toLocaleString()}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Completed</div>
                    </div>
                    {donation.proof && (
                      <Button size="sm" variant="outline" className="hidden border-emerald-200 text-emerald-700 hover:bg-emerald-50 md:flex">
                        View Proof <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-8">
          {/* Rewards Card */}
          <div className="overflow-hidden rounded-3xl border bg-emerald-950 p-8 text-white">
            <div className="relative z-10">
              <h3 className="mb-2 text-xl font-bold">Impact Rewards</h3>
              <p className="mb-6 text-sm text-emerald-100/60">Unlock exclusive benefits and higher tiers as you help more people.</p>
              <div className="space-y-4">
                {[
                  { tier: "Silver", requirement: "Completed", current: true },
                  { tier: "Gold", requirement: "Donate ₹20k total", current: false },
                  { tier: "Platinum", requirement: "10 Monthly Meals", current: false },
                ].map((tier, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-xl p-3 ${tier.current ? 'bg-emerald-800/50 ring-1 ring-emerald-500/50' : 'bg-white/5 opacity-50'}`}>
                    <div className="flex items-center gap-3">
                      <Trophy className={`h-4 w-4 ${tier.current ? 'text-amber-400' : 'text-zinc-500'}`} />
                      <span className="text-sm font-bold">{tier.tier}</span>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider">{tier.requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-bold">Quick Actions</h3>
            <div className="grid gap-3">
              <Link href="/ngos">
                <Button className="w-full justify-between bg-emerald-600 hover:bg-emerald-700">
                  Find new causes <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-between">
                Refer a friend <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full justify-between text-muted-foreground">
                Settings & Profile <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
