"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ArrowLeft, FilePlus2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  billingName: z.string().min(2, {
    message: "Billing name must be at least 2 characters.",
  }),
  billingEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  value: z.number().positive({
    message: "Value must be a positive number.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(250, {
    message: "Description must not be longer than 250 characters.",
  }),
  status: z.enum(["open", "paid", "void", "uncollectible"]),
})

export default function NewInvoicePage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billingName: "",
      billingEmail: "",
      value: 0,
      description: "",
      status: "open",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      toast.error("Failed to create invoice")
      return;
    }

    toast.success("Invoice created successfully")
    router.push("/dashboard")
    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight">Create Invoice</h1>
        <p className="text-muted-foreground">Send a professional payment request to your client.</p>
      </div>

      <Card className="border-none shadow-2xl bg-card">
        <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FilePlus2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Invoice Details</CardTitle>
              <CardDescription>Fill in the information below to generate your invoice.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="billingName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Client Name" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billingEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Email</FormLabel>
                      <FormControl>
                        <Input placeholder="client@example.com" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Amount ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="h-11"
                          {...field}
                          onChange={event => field.onChange(parseFloat(event.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 capitalize">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="void">Void</SelectItem>
                          <SelectItem value="uncollectible">Uncollectible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description / Item Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What is this invoice for? (e.g., Web Design Services)"
                        className="resize-none min-h-[120px] p-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex items-center justify-end gap-4">
                <Link href="/dashboard">
                  <Button variant="ghost" type="button">Cancel</Button>
                </Link>
                <Button type="submit" size="lg" className="px-10 rounded-full shadow-lg transition-all hover:scale-105">
                  Generate Invoice
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
