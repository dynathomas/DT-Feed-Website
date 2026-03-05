export type FeedRecordType = 'vulnerability' | 'malicious_package'

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

export type ExploitSignal = 'known_exploited' | 'poc' | 'none' | 'unknown'

export type Ecosystem = 'npm' | 'PyPI' | 'Maven' | 'NuGet' | 'RubyGems' | 'Go' | 'Rust'

export type RuntimeContext = {
  typicalExposure: 'internet' | 'internal' | 'mixed' | 'unknown'
  workloadTags: string
  blastRadiusTendency: 'low' | 'medium' | 'high'
  confidence: 'experimental' | 'verified' | 'high'
  insightSnippet: string
}

export type FeedReference = {
  label: string
  url: string
}

export type FeedRecord = {
  id: string
  type: FeedRecordType
  title: string
  summary: string
  identifiers: {
    cve?: string
    advisory?: string
    other?: string[]
  }
  ecosystem: Ecosystem
  package: string
  severity: Severity
  publishedAt: string
  updatedAt: string
  affectedRanges: string
  fixedVersions: string
  exploitSignal: ExploitSignal
  references: FeedReference[]
  runtimeContext: RuntimeContext
  dtRiskScoreValue: number
  dtImpactedServicesExample: string
}

export type FeedFilters = {
  ecosystem: 'all' | Ecosystem
  severity: 'all' | Severity
  exploitSignal: 'all' | ExploitSignal
  findingType: 'all' | FeedRecordType
  hasFix: 'all' | 'yes' | 'no'
}

export type FeedSort = 'recent' | 'severity' | 'relevant' | 'impacted'
