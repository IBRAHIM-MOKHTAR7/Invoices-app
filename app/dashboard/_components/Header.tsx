import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'
import { ModeToggle } from '@/components/mode-toggle'

function Header() {
    return (
        <div className='flex items-center justify-end shadow-sm border-b p-4 bg-background h-16 sticky top-0 z-50'>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </div>
    )
}

export default Header