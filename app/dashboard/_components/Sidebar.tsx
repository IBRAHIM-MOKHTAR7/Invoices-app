"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Zap,
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    PlusCircle,
} from "lucide-react"

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: "text-sky-500"
    },
    {
        label: 'Invoices',
        icon: FileText,
        href: '/dashboard/invoices',
        color: "text-violet-500",
    },
    {
        label: 'Customers',
        icon: Users,
        href: '/dashboard/customers',
        color: "text-pink-700",
    },
    {
        label: 'New Invoice',
        icon: PlusCircle,
        color: "text-orange-700",
        href: '/dashboard/invoices/new',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/dashboard/settings',
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-50 dark:bg-slate-950 border-r">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-10">
                    <Zap className="h-8 w-8 text-primary fill-current mr-3" />
                    <h1 className="text-2xl font-bold tracking-tight">
                        Invoicely
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition",
                                pathname === route.href ? "bg-slate-200/50 dark:bg-slate-800/50 text-primary" : "text-slate-500",
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
