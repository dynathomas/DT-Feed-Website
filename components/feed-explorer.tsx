'use client'

import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { ecosystemOptions, filterFeedRecords, formatExploitSignal, getSearchScore, sortFeedRecords } from '@/lib/data'
import type { FeedFilters, FeedRecord, FeedSort, Severity } from '@/lib/types'
import { SeverityBadge } from '@/components/severity-badge'
import { RuntimeContextPanel } from '@/components/runtime-context-panel'
import { LockTeaser } from '@/components/lock-teaser'

const severityOptions: Array<'all' | Severity> = ['all', 'Critical', 'High', 'Medium', 'Low']

const exploitOptions: Array<FeedFilters['exploitSignal']> = ['all', 'known_exploited', 'poc', 'unknown', 'none']

const initialFilters: FeedFilters = {
  ecosystem: 'all',
  severity: 'all',
  exploitSignal: 'all',
  findingType: 'all',
  hasFix: 'all'
}

type FeedExplorerProps = {
  records: FeedRecord[]
}

const mapSortLabel = (value: FeedSort) => {
  if (value === 'recent') {
    return 'Most recent'
  }

  if (value === 'severity') {
    return 'Highest severity'
  }

  if (value === 'impacted') {
    return 'Most impacted (Dynatrace insight)'
  }

  return 'Most relevant'
}

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const FeedExplorer = ({ records }: FeedExplorerProps) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [filters, setFilters] = useState<FeedFilters>(initialFilters)
  const [sortBy, setSortBy] = useState<FeedSort>('recent')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleFilterChange = <K extends keyof FeedFilters>(key: K, value: FeedFilters[K]) => {
    setFilters(previous => ({
      ...previous,
      [key]: value
    }))
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as FeedSort)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim())
    }, 220)

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  const visibleRecords = useMemo(() => {
    const filtered = filterFeedRecords(records, filters)
    const withSearch = filtered.filter(record => {
      if (!debouncedQuery) {
        return true
      }

      return getSearchScore(record, debouncedQuery) > 0
    })

    return sortFeedRecords(withSearch, sortBy, debouncedQuery)
  }, [records, filters, debouncedQuery, sortBy])

  return (
    <div className='space-y-6'>
      <section className='rounded-xl border border-slate-200 bg-white p-6'>
        <label htmlFor='global-search' className='text-sm font-semibold text-slate-900'>
          Global search
        </label>
        <input
          id='global-search'
          value={query}
          onChange={handleSearchChange}
          className='mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-brand-500 placeholder:text-slate-400 focus:ring-2'
          placeholder='Search CVE, advisory, package, or free text'
          aria-label='Search vulnerabilities by identifier, package, and text'
        />

        <div className='mt-4 grid gap-3 md:grid-cols-3 lg:grid-cols-6'>
          <label className='text-xs font-medium text-slate-600'>
            Ecosystem
            <select
              value={filters.ecosystem}
              onChange={event => handleFilterChange('ecosystem', event.target.value as FeedFilters['ecosystem'])}
              className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
              aria-label='Filter by ecosystem'
            >
              <option value='all'>All</option>
              {ecosystemOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className='text-xs font-medium text-slate-600'>
            Severity
            <select
              value={filters.severity}
              onChange={event => handleFilterChange('severity', event.target.value as FeedFilters['severity'])}
              className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
              aria-label='Filter by severity'
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
              value={filters.exploitSignal}
              onChange={event => handleFilterChange('exploitSignal', event.target.value as FeedFilters['exploitSignal'])}
              className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
              aria-label='Filter by exploitation signal'
            >
              {exploitOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All' : formatExploitSignal(option)}
                </option>
              ))}
            </select>
          </label>

          <label className='text-xs font-medium text-slate-600'>
            Finding type
            <select
              value={filters.findingType}
              onChange={event => handleFilterChange('findingType', event.target.value as FeedFilters['findingType'])}
              className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
              aria-label='Filter by finding type'
            >
              <option value='all'>All</option>
              <option value='vulnerability'>Vulnerability</option>
              <option value='malicious_package'>Malicious package</option>
            </select>
          </label>

          <label className='text-xs font-medium text-slate-600'>
            Has fix
            <select
              value={filters.hasFix}
              onChange={event => handleFilterChange('hasFix', event.target.value as FeedFilters['hasFix'])}
              className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
              aria-label='Filter by fix availability'
            >
              <option value='all'>All</option>
              <option value='yes'>Has fix</option>
              <option value='no'>No fix</option>
            </select>
          </label>

          <label className='text-xs font-medium text-slate-600'>
            Sort by
            <select
              value={sortBy}
              onChange={handleSortChange}
              className='mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500'
              aria-label='Sort feed results'
            >
              {(['recent', 'severity', 'relevant', 'impacted'] as FeedSort[]).map(option => (
                <option key={option} value={option}>
                  {mapSortLabel(option)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section aria-label='Search results' className='space-y-4'>
        <p className='text-sm text-slate-600'>{visibleRecords.length} results</p>
        {visibleRecords.map(record => (
          <article key={record.id} className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div>
                <h2 className='text-lg font-semibold text-slate-900'>
                  <Link
                    href={`/vulnerability-feed/vulnerabilities/${record.id}`}
                    className='hover:text-brand-700 focus:outline-none focus:underline'
                    aria-label={`Open details for ${record.title}`}
                  >
                    {record.title}
                  </Link>
                </h2>
                <p className='mt-1 text-sm text-slate-600'>
                  {record.package} · {record.ecosystem} · Published {formatDate(record.publishedAt)}
                </p>
              </div>
              <SeverityBadge severity={record.severity} />
            </div>

            <p className='mt-3 text-sm text-slate-700'>{record.runtimeContext.insightSnippet}</p>

            <div className='mt-4 grid gap-4 lg:grid-cols-2'>
              <RuntimeContextPanel runtimeContext={record.runtimeContext} />
              <div className='space-y-3'>
                <LockTeaser label='Dynatrace Risk Score' />
                <p className='text-sm text-slate-600'>
                  See package intelligence:{' '}
                  <Link
                    href={`/vulnerability-feed/packages/${record.ecosystem}/${record.package}`}
                    className='font-medium text-brand-700 hover:text-brand-900'
                    aria-label={`Open package page for ${record.package}`}
                  >
                    {record.package}
                  </Link>
                </p>
              </div>
            </div>
          </article>
        ))}

        {visibleRecords.length === 0 ? (
          <div className='rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600'>
            No records matched your search and filters.
          </div>
        ) : null}
      </section>
    </div>
  )
}
