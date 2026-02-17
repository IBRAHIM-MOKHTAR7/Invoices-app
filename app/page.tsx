"use client"

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Globe, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/91 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
      >
        <div className="container mx-auto flex items-center justify-between w-full">
          <Link className="flex items-center justify-center group" href="#">
            <Zap className="h-6 w-6 text-primary fill-current transition-transform group-hover:scale-110" />
            <span className="ml-2 text-xl font-bold tracking-tight">Invoicely</span>
          </Link>
          <nav className="ml-auto flex gap-4 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign In</Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </SignedIn>
          </nav>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center space-y-8 text-center"
            >
              <motion.div variants={fadeIn} className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Invoicing Made <span className="text-primary italic">Simple</span> for Modern Teams
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create professional invoices, track payments, and grow your business with our all-in-one billing platform.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="lg" className="px-8 rounded-full h-14 text-lg font-semibold transition-all hover:scale-105 shadow-xl hover:shadow-primary/25">
                      Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button size="lg" className="px-8 rounded-full h-14 text-lg font-semibold transition-all hover:scale-105 shadow-xl hover:shadow-primary/25">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </SignedIn>
                <Button size="lg" variant="outline" className="px-8 rounded-full h-14 text-lg font-semibold">
                  View Demo
                </Button>
              </motion.div>
              <motion.div variants={fadeIn} className="pt-10 flex items-center justify-center gap-8 text-muted-foreground/60 grayscale dark:invert opacity-70">
                <span className="font-bold text-xl">TRUSTED BY 10,000+ FREELANCERS</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-background border-t">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Built for Your Growth</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Powerful features to help you manage your business like a pro.</p>
            </motion.div>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { title: "Lightning Fast", desc: "Generate professional invoices in under 60 seconds.", icon: Zap, color: "text-primary", bg: "bg-primary/10" },
                { title: "Secure Payments", desc: "Integrated with Stripe for industry-leading security.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
                { title: "Smart Insights", desc: "Track your revenue and customer trends with intuitive dashboards.", icon: BarChart3, color: "text-emerald-500", bg: "bg-emerald-500/10" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group flex flex-col items-center space-y-4 text-center p-8 rounded-3xl border bg-card transition-all hover:shadow-2xl"
                >
                  <div className={`p-4 ${feature.bg} rounded-2xl group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-10 w-10 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t bg-slate-50 dark:bg-slate-950">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg">Invoicely</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Invoicely Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Twitter</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">GitHub</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}