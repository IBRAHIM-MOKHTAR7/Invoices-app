import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { PlusIcon, FileText, CheckCircle, Clock, WarningCircle } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { db } from '@/app/config/db'
import { Customers, Invoices } from '@/app/config/schema'
import { desc, eq, sum } from 'drizzle-orm'
import { currentUser } from '@clerk/nextjs/server'
import UserSyncer from './_components/UserSyncer'
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/stats-card"

export default async function Dashboard() {
  const user = await currentUser();

  const filteredResult = user ? await db.select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.userId, user?.id))
    .orderBy(desc(Invoices.id)) : [];

  // Calculate stats
  const totalInvoices = filteredResult.length;
  const totalValue = filteredResult.reduce((acc, curr) => acc + curr.invoices.value, 0);
  const paidInvoices = filteredResult.filter(r => r.invoices.status === 'paid');
  const paidValue = paidInvoices.reduce((acc, curr) => acc + curr.invoices.value, 0);
  const openInvoices = filteredResult.filter(r => r.invoices.status === 'open');
  const openValue = openInvoices.reduce((acc, curr) => acc + curr.invoices.value, 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalValue.toLocaleString()}`,
      description: `From ${totalInvoices} invoices`,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      title: "Paid Amount",
      value: `$${paidValue.toLocaleString()}`,
      description: `${paidInvoices.length} settled invoices`,
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      title: "Pending",
      value: `$${openValue.toLocaleString()}`,
      description: `${openInvoices.length} invoices waiting`,
      icon: <Clock className="w-4 h-4" />,
    },
    {
      title: "Collection Rate",
      value: `${totalValue > 0 ? Math.round((paidValue / totalValue) * 100) : 0}%`,
      description: "Efficiency of payments",
      icon: <WarningCircle className="w-4 h-4" />,
    },
  ];

  const statusColors = {
    open: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300",
    paid: "bg-green-100 text-green-800 hover:bg-green-200 border-green-300",
    void: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300",
    uncollectible: "bg-red-100 text-red-800 hover:bg-red-200 border-red-300",
  };

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-8'>
      <UserSyncer />

      <div className="flex justify-between items-center">
        <div>
          <h1 className='text-4xl font-extrabold tracking-tight'>Dashboard</h1>
          <p className="text-muted-foreground">Manage your billing and payments effortlessly.</p>
        </div>
        <Link href='/dashboard/invoices/new'>
          <Button size="lg" className="rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95">
            <PlusIcon className='mr-2 w-5 h-5' weight="bold" />
            Create Invoice
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
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
            {filteredResult.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No invoices found. Create your first one to get started!
                </TableCell>
              </TableRow>
            ) : (
              filteredResult.map((record) => (
                <TableRow key={record.invoices.id} className="group cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
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
                    <Link href={`/dashboard/invoices/${record.invoices.id}`} className="block text-muted-foreground group-hover:text-foreground transition-colors">
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
