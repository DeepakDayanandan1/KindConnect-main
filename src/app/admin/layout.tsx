import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-muted/40 p-8">
                <div className="max-w-7xl mx-auto space-y-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
