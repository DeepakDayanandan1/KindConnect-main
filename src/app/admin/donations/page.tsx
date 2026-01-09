import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Donation } from "@/types";

// Mock Data
const donations: Donation[] = [
    {
        id: "DON-001",
        ngo_id: "NGO-1",
        ngo_name: "Hope Foundation",
        donor_name: "Alice Smith",
        amount: 150.00,
        date: "2023-10-25",
        status: "completed",
    },
    {
        id: "DON-002",
        ngo_id: "NGO-2",
        ngo_name: "Green Earth",
        donor_name: "Bob Jones",
        amount: 50.00,
        date: "2023-10-26",
        status: "pending",
    },
    {
        id: "DON-003",
        ngo_id: "NGO-1",
        ngo_name: "Hope Foundation",
        donor_name: "Charlie Brown",
        amount: 200.00,
        date: "2023-10-27",
        status: "failed",
    },
    {
        id: "DON-004",
        ngo_id: "NGO-3",
        ngo_name: "Animal Rescue",
        donor_name: "Diana Prince",
        amount: 75.00,
        date: "2023-10-28",
        status: "completed",
    },
];

export default function DonationHistoryPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Donation History</h1>
                <p className="text-muted-foreground">View and manage all donations made through the platform.</p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Donor</TableHead>
                            <TableHead>NGO</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {donations.map((donation) => (
                            <TableRow key={donation.id}>
                                <TableCell className="font-medium">{donation.id}</TableCell>
                                <TableCell>{donation.donor_name}</TableCell>
                                <TableCell>{donation.ngo_name}</TableCell>
                                <TableCell>{donation.date}</TableCell>
                                <TableCell>${donation.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        donation.status === "completed" ? "default" :
                                            donation.status === "pending" ? "secondary" : "destructive"
                                    }>
                                        {donation.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
