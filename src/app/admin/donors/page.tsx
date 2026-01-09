"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ExternalLink, Filter } from "lucide-react";
import { donors } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DonorsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name-asc");

    const filteredDonors = donors.filter(donor =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "amount-desc") {
            return b.totalAmount - a.totalAmount;
        } else if (sortBy === "amount-asc") {
            return a.totalAmount - b.totalAmount;
        } else if (sortBy === "count-desc") {
            return b.totalDonations - a.totalDonations;
        }
        return 0;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Donors</h1>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search donors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                <SelectItem value="amount-desc">Amount (High-Low)</SelectItem>
                                <SelectItem value="amount-asc">Amount (Low-High)</SelectItem>
                                <SelectItem value="count-desc">Donation Count</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Donor List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Total Donations</TableHead>
                                <TableHead className="text-right">Total Amount</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDonors.map((donor) => (
                                <TableRow key={donor.id}>
                                    <TableCell className="font-medium">{donor.id}</TableCell>
                                    <TableCell>{donor.name}</TableCell>
                                    <TableCell>{donor.email}</TableCell>
                                    <TableCell>{donor.phone}</TableCell>
                                    <TableCell className="text-right">{donor.totalDonations}</TableCell>
                                    <TableCell className="text-right">${donor.totalAmount.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/donors/${donor.id}`}>
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredDonors.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No donors found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
