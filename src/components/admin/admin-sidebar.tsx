"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, FileCheck, MessageSquare, LogOut, HeartHandshake, Building2, Siren } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const sidebarItems = [
    {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Donors",
        href: "/admin/donors",
        icon: HeartHandshake,
    },
    {
        title: "NGOs",
        href: "/admin/ngos",
        icon: Building2,
    },
    {
        title: "Emergency Case",
        href: "/admin/emergency",
        icon: Siren,
    },
    {
        title: "Donation History",
        href: "/admin/donations",
        icon: History,
    },
    {
        title: "Verification",
        href: "/admin/verification",
        icon: FileCheck,
    },
    {
        title: "Feedback",
        href: "/admin/feedback",
        icon: MessageSquare,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <span>SamoohamKart Admin</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-2 text-sm font-medium">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
