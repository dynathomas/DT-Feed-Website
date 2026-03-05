type LockTeaserProps = {
  label: string
  helperText?: string
}

export const LockTeaser = ({ label, helperText = 'Available in Dynatrace' }: LockTeaserProps) => {
  return (
    <div className='rounded-lg border border-slate-200 bg-slate-50 p-3' aria-label={`${label} locked teaser`}>
      <div className='flex items-center gap-2'>
        <span className='text-sm' aria-hidden='true'>
          🔒
        </span>
        <p className='text-sm font-semibold text-slate-900'>{label}</p>
      </div>
      <p className='mt-1 text-xs text-slate-600'>{helperText}</p>
    </div>
  )
}
