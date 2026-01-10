"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Activity, CheckCircle, Search, Filter, Download, MoreHorizontal, Check, X } from "lucide-react";
import { recentDonations } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const stats = [
    {
        title: "Total Donations",
        value: "6",
        description: "",
        icon: DollarSign,
    },
    {
        title: "Total Amount",
        value: "$900.00",
        description: "",
        icon: DollarSign,
    },
    {
        title: "Pending proof Count",
        value: "1",
        description: "",
        icon: Activity,
    },
    {
        title: "Completed Count",
        value: "2",
        description: "",
        icon: CheckCircle,
    },
];

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-4 pb-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Donations Dashboard</h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by ID, donor, or welfare home..."
                            className="pl-8 bg-background"
                        />
                    </div>
                    <Select defaultValue="all-time">
                        <SelectTrigger className="w-[140px] bg-background">
                            <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-time">All Time</SelectItem>
                            <SelectItem value="this-month">This Month</SelectItem>
                            <SelectItem value="last-month">Last Month</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all-homes">
                        <SelectTrigger className="w-[180px] bg-background">
                            <SelectValue placeholder="Welfare Homes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-homes">All Welfare Homes</SelectItem>
                            <SelectItem value="sunshine">Sunshine Haven</SelectItem>
                            <SelectItem value="hope">Hope Foundation</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all-donors">
                        <SelectTrigger className="w-[160px] bg-background">
                            <SelectValue placeholder="Donors" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-donors">All Donors</SelectItem>
                            <SelectItem value="verified">Verified Donors</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all-statuses">
                        <SelectTrigger className="w-[140px] bg-background">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-statuses">All Statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Donations</h2>
                <Button variant="outline" className="gap-2 bg-background">
                    <Download className="h-4 w-4" /> Export Excel
                </Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="uppercase text-xs hover:bg-transparent">
                            <TableHead className="font-bold text-muted-foreground w-[100px]">Donation ID</TableHead>
                            <TableHead className="font-bold text-muted-foreground">Donor Name</TableHead>
                            <TableHead className="font-bold text-muted-foreground">Donor ID</TableHead>
                            <TableHead className="font-bold text-muted-foreground">Welfare Home</TableHead>
                            <TableHead className="font-bold text-muted-foreground">Particular</TableHead>
                            <TableHead className="font-bold text-muted-foreground text-right">Amount</TableHead>
                            <TableHead className="font-bold text-muted-foreground">Date</TableHead>
                            <TableHead className="font-bold text-muted-foreground text-center">Proof From NGO</TableHead>
                            <TableHead className="font-bold text-muted-foreground text-center">Proof Approved</TableHead>
                            <TableHead className="font-bold text-muted-foreground">Donor Feedback</TableHead>
                            <TableHead className="font-bold text-muted-foreground">Feedback to NGO</TableHead>
                            <TableHead className="font-bold text-muted-foreground text-right">Status</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentDonations.map((donation) => (
                            <TableRow key={donation.id} className="text-sm">
                                <TableCell className="font-medium text-blue-500">{donation.id}</TableCell>
                                <TableCell className="font-medium text-blue-500">{donation.donorName}</TableCell>
                                <TableCell className="text-blue-500">{donation.donorId}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span>{donation.welfareHome}</span>
                                        <span className="text-xs text-muted-foreground">{donation.welfareHomeId}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{donation.particular}</TableCell>
                                <TableCell className="text-right font-medium">${donation.amount.toFixed(2)}</TableCell>
                                <TableCell className="text-xs">{donation.date}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center">
                                        {donation.proofFromNgo ? (
                                            <div className="h-6 w-6 rounded-full border flex items-center justify-center bg-transparent">
                                                <Check className="h-3 w-3 text-foreground" />
                                            </div>
                                        ) : (
                                            <div className="h-6 w-6 rounded-full border-2 border-red-100 flex items-center justify-center bg-red-50">
                                                <X className="h-3 w-3 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center">
                                        {donation.proofApproved ? (
                                            <div className="h-6 w-6 rounded-full border bg-muted/30 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-foreground" />
                                            </div>
                                        ) : (
                                            <div className="h-6 w-6 rounded-full border border-red-100 flex items-center justify-center bg-transparent">
                                                <X className="h-3 w-3 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{donation.donorFeedback}</TableCell>
                                <TableCell className="font-medium">{donation.feedbackToNgo}</TableCell>
                                <TableCell className="text-right">
                                    {donation.status}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between px-4 py-4 border-t">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Showing {recentDonations.length} of {recentDonations.length} entries
                    </div>

                </div>
            </div>
        </div>
    );
}
