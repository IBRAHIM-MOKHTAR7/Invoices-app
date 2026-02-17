import { db } from "@/app/config/db";
import { Customers, Invoices } from "@/app/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, count } from "drizzle-orm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"

export default async function CustomersPage() {
    const user = await currentUser();

    const customers = user ? await db.select({
        id: Customers.id,
        name: Customers.name,
        email: Customers.email,
        createTs: Customers.createTs,
    })
        .from(Customers)
        .where(eq(Customers.userId, user.id))
        .orderBy(desc(Customers.id)) : [];

    return (
        <div className='max-w-7xl mx-auto p-6 space-y-8'>
            <div>
                <h1 className='text-4xl font-extrabold tracking-tight'>Customers</h1>
                <p className="text-muted-foreground">View and manage your client list.</p>
            </div>

            <Card className="border-none shadow-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Added On</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                                    No customers found yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.createTs.toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
