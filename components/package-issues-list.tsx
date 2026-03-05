'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { ExploitSignal, FeedRecord, Severity } from '@/lib/types'
import { formatExploitSignal } from '@/lib/data'
import { SeverityBadge } from '@/components/severity-badge'

type PackageIssuesListProps = {
  vulnerabilities: FeedRecord[]
}

const severityOptions: Array<'all' | Severity> = ['all', 'Critical', 'High', 'Medium', 'Low']
const exploitOptions: Array<'all' | ExploitSignal> = ['all', 'known_exploited', 'poc', 'unknown', 'none']

export const PackageIssuesList = ({ vulnerabilities }: PackageIssuesListProps) => {
  const [severity, setSeverity] = useState<'all' | Severity>('all')
  const [exploit, setExploit] = useState<'all' | ExploitSignal>('all')

  const filtered = useMemo(() => {
    return vulnerabilities.filter(item => {
      if (severity !== 'all' && item.severity !== severity) {
        return false
      }

      if (exploit !== 'all' && item.exploitSignal !== exploit) {
        return false
      }

      return true
    })
  }, [severity, exploit, vulnerabilities])

  return (
    <section className='rounded-xl border border-slate-200 bg-white p-5'>
      <h2 className='text-lg font-semibold text-slate-900'>Vulnerabilities affecting this package</h2>
      <div className='mt-3 grid gap-3 md:grid-cols-2'>
        <label className='text-xs font-medium text-slate-600'>
          Severity
          <select
            className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
            value={severity}
            onChange={event => setSeverity(event.target.value as 'all' | Severity)}
            aria-label='Package vulnerability severity filter'
          >
            {severityOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className='text-xs font-medium text-slate-600'>
          Exploitation signal
          <select
            className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
            value={exploit}
            onChange={event => setExploit(event.target.value as 'all' | ExploitSignal)}
            aria-label='Package vulnerability exploitation filter'
          >
            {exploitOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All' : formatExploitSignal(option)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className='mt-4 space-y-3'>
        {filtered.map(item => (
          <li key={item.id} className='rounded-lg border border-slate-200 p-3'>
            <div className='flex items-center justify-between gap-3'>
              <Link href={`/vulnerability-feed/vulnerabilities/${item.id}`} className='text-sm font-semibold text-brand-700 hover:text-brand-900'>
                {item.title}
              </Link>
              <SeverityBadge severity={item.severity} />
            </div>
            <p className='mt-1 text-sm text-slate-600'>{item.summary}</p>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? <p className='mt-4 text-sm text-slate-600'>No vulnerabilities match current filters.</p> : null}
    </section>
  )
}
