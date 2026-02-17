import React from 'react'
import Header from './_components/Header'
import Sidebar from './_components/Sidebar'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full relative min-h-screen">
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-80">
                <Sidebar />
            </div>
            <main className="md:pl-64 flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 bg-white dark:bg-slate-950">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default layout