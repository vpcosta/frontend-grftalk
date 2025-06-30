"use client"
import { useEffect } from 'react'

import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { io } from 'socket.io-client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'


export const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

export const Providers = ({ children }: { children: React.ReactNode  }) => {
    useEffect(() => {
        dayjs.locale('pt-br')
    }, [])

    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            { children }

            <ProgressBar
                height='4px'
                color='#007cc4'
                shallowRouting
            />

            <Toaster />
        </ThemeProvider>
    )
}