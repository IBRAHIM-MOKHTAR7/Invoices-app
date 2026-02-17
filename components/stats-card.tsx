"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
    title: string
    value: string
    description: string
    icon: React.ReactNode
    index: number
}

export function StatsCard({ title, value, description, icon, index }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className="overflow-hidden border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl ring-1 ring-zinc-950/5 dark:ring-white/10 hover:ring-zinc-950/20 dark:hover:ring-white/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</CardTitle>
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                        {icon}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold tracking-tight">{value}</div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}
