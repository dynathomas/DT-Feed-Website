import type { RuntimeContext } from '@/lib/types'

type RuntimeContextPanelProps = {
  runtimeContext: RuntimeContext
}

const labelValueRows = (runtimeContext: RuntimeContext) => {
  return [
    { label: 'Typical exposure', value: runtimeContext.typicalExposure },
    { label: 'Blast radius tendency', value: runtimeContext.blastRadiusTendency },
    { label: 'Detection confidence', value: runtimeContext.confidence }
  ]
}

export const RuntimeContextPanel = ({ runtimeContext }: RuntimeContextPanelProps) => {
  return (
    <section className='rounded-lg border border-slate-200 bg-white p-4' aria-label='Runtime context'>
      <h3 className='text-sm font-semibold text-slate-900'>Runtime Context</h3>
      <div className='mt-3 grid gap-2 text-sm text-slate-700'>
        {labelValueRows(runtimeContext).map(item => (
          <p key={item.label}>
            <span className='font-medium text-slate-900'>{item.label}:</span> {item.value}
          </p>
        ))}
      </div>
      <div className='mt-3'>
        <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>Likely affected workload types</p>
        <div className='mt-2 flex flex-wrap gap-2'>
          {runtimeContext.workloadTags.split(',').map(tag => (
            <span key={tag} className='rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700'>
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
