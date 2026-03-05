import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function AppHeader() {
    return (
        <header className="fixed w-full z-50 p-3 flex justify-between items-center">
            <div className="p-2 rounded-full bg-black dark:bg-white">
                <SidebarTrigger className="cursor-pointer text-white dark:text-black" />
            </div>
        </header>
    )
}

export default AppHeader
