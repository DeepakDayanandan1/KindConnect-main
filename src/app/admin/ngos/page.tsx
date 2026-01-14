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
import { Search, ExternalLink, Plus } from "lucide-react";
import { ngos } from "@/lib/mock-data";

export default function NGOsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNgos = ngos.filter(ngo =>
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">NGOs</h1>
                <div className="flex items-center gap-4">
                    <Link href="/admin/ngos/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add NGO
                        </Button>
                    </Link>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                            placeholder="Search NGOs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[300px]"
                        />
                        <Button size="icon" variant="ghost">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>NGO List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact Person</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredNgos.map((ngo) => (
                                <TableRow key={ngo.id}>
                                    <TableCell className="font-medium">{ngo.id}</TableCell>
                                    <TableCell>{ngo.name}</TableCell>
                                    <TableCell>{ngo.contactPerson}</TableCell>
                                    <TableCell>{ngo.email}</TableCell>
                                    <TableCell>{ngo.phone}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/ngos/${ngo.id}`}>
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredNgos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No NGOs found.
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
