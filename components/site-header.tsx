import Link from 'next/link'

const navItems = ['Platform', 'Security', 'Resources']

export const SiteHeader = () => {
  return (
    <header className='border-b border-slate-200 bg-white'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4'>
        <Link
          href='/'
          className='flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700'
          aria-label='Go to homepage'
        >
          <span className='inline-block h-2.5 w-2.5 rounded-full bg-brand-500' />
          Feed Insights
        </Link>

        <nav aria-label='Primary' className='flex items-center gap-3 text-sm font-medium'>
          {navItems.map(item => (
            <span key={item} className='rounded-md px-3 py-2 text-slate-600' aria-hidden='true'>
              {item}
            </span>
          ))}
          <Link
            href='/vulnerability-feed'
            className='rounded-md bg-brand-50 px-3 py-2 text-brand-700 ring-1 ring-brand-100'
            aria-label='Navigate to vulnerability feed'
          >
            Vulnerability Feed
          </Link>
        </nav>
      </div>
    </header>
  )
}
