"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";

// Placeholder data
const initialEmergencies = [
    {
        id: "1",
        title: "Urgent Medical Appeal: Save Aarav Sharma's Life",
        category: "Urgent Liver Transplant",
        targetAmount: 5000000,
        raisedAmount: 1750000,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
        date: "2024-01-08"
    }
];

export default function EmergencyPage() {
    const [emergencies, setEmergencies] = useState(initialEmergencies);

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this emergency case?")) {
            setEmergencies(emergencies.filter(e => e.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Emergency Requirements</h1>
                    <p className="text-muted-foreground">Manage urgent fund appeals displayed on the home page.</p>
                </div>
                <Link href="/admin/emergency/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Case
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {emergencies.map((item) => (
                    <Card key={item.id} className="overflow-hidden flex flex-col">
                        <div className="relative h-48 w-full bg-muted">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{item.category}</p>
                                    <CardTitle className="text-lg font-bold leading-tight mt-1 line-clamp-2">{item.title}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2 flex-grow">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Raised: ₹{(item.raisedAmount / 100000).toFixed(2)} Lakhs</span>
                                        <span className="text-muted-foreground">Goal: ₹{(item.targetAmount / 100000).toFixed(2)} Lakhs</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${Math.min((item.raisedAmount / item.targetAmount) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2 border-t pt-4 bg-muted/20">
                            <Button variant="outline" size="sm" className="flex-1">
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive hover:text-white"
                                onClick={() => handleDelete(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {emergencies.length === 0 && (
                    <div className="col-span-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                        No emergency cases found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
