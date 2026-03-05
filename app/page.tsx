import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='mx-auto w-full max-w-7xl px-6 py-20'>
      <section className='rounded-2xl border border-slate-200 bg-white p-10 shadow-sm'>
        <p className='mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700'>
          Public vulnerability intelligence
        </p>
        <h1 className='max-w-2xl text-4xl font-bold text-slate-900'>
          Search vulnerabilities with runtime and business-impact context
        </h1>
        <p className='mt-4 max-w-2xl text-base text-slate-600'>
          Explore a mock vulnerability feed that combines advisory data with qualitative runtime insights and
          clear visibility into what more can be unlocked in Dynatrace.
        </p>
        <div className='mt-8'>
          <Link
            href='/vulnerability-feed'
            className='inline-flex rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
            aria-label='Open vulnerability feed page'
          >
            Open Vulnerability Feed
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage