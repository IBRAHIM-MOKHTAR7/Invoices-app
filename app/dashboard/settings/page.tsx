import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs/server"

export default async function SettingsPage() {
    const user = await currentUser();

    return (
        <div className='max-w-4xl mx-auto p-6 space-y-8'>
            <div>
                <h1 className='text-4xl font-extrabold tracking-tight'>Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences.</p>
            </div>

            <div className="grid gap-6">
                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Review your account details provided by Clerk.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={user?.fullName || ""} disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" value={user?.primaryEmailAddress?.emailAddress || ""} disabled />
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                            * Profile management is handled through Clerk. Click on your profile icon in the header to change your details.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Organization</CardTitle>
                        <CardDescription>Manage your business branding and details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="org">Organization Name</Label>
                            <Input id="org" placeholder="Acme Inc." />
                        </div>
                        <Button>Save Preferences</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
