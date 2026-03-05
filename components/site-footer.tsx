const footerColumns = [
  {
    heading: 'Product',
    links: ['Platform overview', 'Application security', 'Runtime observability']
  },
  {
    heading: 'Vulnerability Feed',
    links: ['Public vulnerability database', 'Package advisories', 'Methodology']
  },
  {
    heading: 'Resources',
    links: ['Security updates', 'Release notes', 'Support center']
  }
]

export const SiteFooter = () => {
  return (
    <footer className='border-t border-slate-200 bg-white'>
      <div className='mx-auto grid w-full max-w-7xl gap-6 px-6 py-10 md:grid-cols-3'>
        {footerColumns.map(column => (
          <section key={column.heading} aria-label={column.heading}>
            <h2 className='text-sm font-semibold text-slate-900'>{column.heading}</h2>
            <ul className='mt-3 space-y-2 text-sm text-slate-600'>
              {column.links.map(link => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </footer>
  )
}
