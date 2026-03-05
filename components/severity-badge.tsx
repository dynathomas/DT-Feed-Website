import type { Severity } from '@/lib/types'

const severityClass: Record<Severity, string> = {
  Critical: 'bg-rose-100 text-rose-700 ring-rose-200',
  High: 'bg-orange-100 text-orange-700 ring-orange-200',
  Medium: 'bg-amber-100 text-amber-700 ring-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 ring-emerald-200'
}

type SeverityBadgeProps = {
  severity: Severity
}

export const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${severityClass[severity]}`} aria-label={`Severity ${severity}`}>
      {severity}
    </span>
  )
}
