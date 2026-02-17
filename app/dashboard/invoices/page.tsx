import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { db } from '@/app/config/db'
import { Customers, Invoices } from '@/app/config/schema'
import { desc, eq } from 'drizzle-orm'
import { currentUser } from '@clerk/nextjs/server'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default async function InvoicesPage() {
    const user = await currentUser();

    const invoices = user ? await db.select()
        .from(Invoices)
        .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
        .where(eq(Invoices.userId, user?.id))
        .orderBy(desc(Invoices.id)) : [];

    const statusColors = {
        open: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300",
        paid: "bg-green-100 text-green-800 hover:bg-green-200 border-green-300",
        void: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300",
        uncollectible: "bg-red-100 text-red-800 hover:bg-red-200 border-red-300",
    };

    return (
        <div className='max-w-7xl mx-auto p-6 space-y-8'>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className='text-4xl font-extrabold tracking-tight'>All Invoices</h1>
                    <p className="text-muted-foreground">Detailed history of all your billing records.</p>
                </div>
                <Link href='/dashboard/invoices/new'>
                    <Button size="lg" className="rounded-full shadow-lg">
                        <PlusIcon className='mr-2 w-5 h-5' weight="bold" />
                        Create Invoice
                    </Button>
                </Link>
            </div>

            <Card className="border-none shadow-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                        <TableRow>
                            <TableHead className="w-32">Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    No invoices found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            invoices.map((record) => (
                                <TableRow key={record.invoices.id} className="group cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                                    <TableCell className="font-medium">
                                        <Link href={`/dashboard/invoices/${record.invoices.id}`} className="block">
                                            {record.invoices.createTs.toLocaleDateString()}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/invoices/${record.invoices.id}`} className="block">
                                            {record.customers.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/invoices/${record.invoices.id}`} className="block text-muted-foreground">
                                            {record.customers.email}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Link href={`/dashboard/invoices/${record.invoices.id}`} className="inline-block">
                                            <Badge variant="outline" className={`text-xs px-2.5 py-0.5 capitalize shadow-sm ${statusColors[record.invoices.status]}`}>
                                                {record.invoices.status}
                                            </Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right font-bold">
                                        <Link href={`/dashboard/invoices/${record.invoices.id}`} className="block">
                                            ${record.invoices.value.toLocaleString()}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
