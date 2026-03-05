import feedData from '@/data/vulnerability-feed.json'
import type { ExploitSignal, FeedFilters, FeedRecord, FeedSort, Severity } from '@/lib/types'

const severityWeight: Record<Severity, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1
}

const exploitWeight: Record<ExploitSignal, number> = {
  known_exploited: 4,
  poc: 3,
  unknown: 2,
  none: 1
}

const blastWeight: Record<FeedRecord['runtimeContext']['blastRadiusTendency'], number> = {
  high: 3,
  medium: 2,
  low: 1
}

const confidenceWeight: Record<FeedRecord['runtimeContext']['confidence'], number> = {
  high: 3,
  verified: 2,
  experimental: 1
}

export const ecosystemOptions = ['npm', 'PyPI', 'Maven', 'NuGet', 'RubyGems', 'Go', 'Rust']

export const getFeedRecords = () => {
  return feedData as FeedRecord[]
}

export const getFeedRecordById = (id: string) => {
  return getFeedRecords().find(record => record.id === id)
}

export const getPackageRecords = (ecosystem: string, packageName: string) => {
  return getFeedRecords().filter(record => {
    return record.ecosystem.toLowerCase() === ecosystem.toLowerCase() && record.package.toLowerCase() === packageName.toLowerCase()
  })
}

export const getMostImpactedProxy = (record: FeedRecord) => {
  return blastWeight[record.runtimeContext.blastRadiusTendency] * 10 + confidenceWeight[record.runtimeContext.confidence] * 2 + exploitWeight[record.exploitSignal]
}

export const getSearchScore = (record: FeedRecord, query: string) => {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return 0
  }

  let score = 0

  const searchMap = [
    { value: record.identifiers.cve ?? '', weight: 6 },
    { value: record.identifiers.advisory ?? '', weight: 5 },
    { value: record.id, weight: 4 },
    { value: record.package, weight: 4 },
    { value: record.title, weight: 3 },
    { value: record.summary, weight: 2 },
    { value: record.runtimeContext.insightSnippet, weight: 2 },
    { value: record.runtimeContext.workloadTags, weight: 1 },
    { value: record.identifiers.other?.join(' ') ?? '', weight: 1 }
  ]

  searchMap.forEach(entry => {
    const candidate = entry.value.toLowerCase()

    if (candidate.includes(normalizedQuery)) {
      score += entry.weight
    }
  })

  return score
}

export const filterFeedRecords = (records: FeedRecord[], filters: FeedFilters) => {
  return records.filter(record => {
    if (filters.ecosystem !== 'all' && record.ecosystem !== filters.ecosystem) {
      return false
    }

    if (filters.severity !== 'all' && record.severity !== filters.severity) {
      return false
    }

    if (filters.exploitSignal !== 'all' && record.exploitSignal !== filters.exploitSignal) {
      return false
    }

    if (filters.findingType !== 'all' && record.type !== filters.findingType) {
      return false
    }

    if (filters.hasFix === 'yes' && !record.fixedVersions.trim()) {
      return false
    }

    if (filters.hasFix === 'no' && record.fixedVersions.trim()) {
      return false
    }

    return true
  })
}

export const sortFeedRecords = (records: FeedRecord[], sort: FeedSort, query: string) => {
  const sorted = [...records]

  if (sort === 'recent') {
    return sorted.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }

  if (sort === 'severity') {
    return sorted.sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity])
  }

  if (sort === 'impacted') {
    return sorted.sort((a, b) => getMostImpactedProxy(b) - getMostImpactedProxy(a))
  }

  return sorted.sort((a, b) => {
    const scoreDiff = getSearchScore(b, query) - getSearchScore(a, query)

    if (scoreDiff !== 0) {
      return scoreDiff
    }

    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

export const formatExploitSignal = (value: ExploitSignal) => {
  if (value === 'known_exploited') {
    return 'Known exploited'
  }

  if (value === 'poc') {
    return 'PoC available'
  }

  if (value === 'unknown') {
    return 'Unknown'
  }

  return 'None'
}
