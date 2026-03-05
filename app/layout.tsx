import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Vulnerability Feed Demo',
  description: 'Mock vulnerability feed with qualitative runtime insights and gated Dynatrace teasers.'
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body className='min-h-screen'>
        <div className='flex min-h-screen flex-col'>
          <SiteHeader />
          <main className='flex-1'>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

export default RootLayout
