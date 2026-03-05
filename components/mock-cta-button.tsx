'use client'

import { useState } from 'react'

type MockCtaButtonProps = {
  label: string
}

export const MockCtaButton = ({ label }: MockCtaButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        type='button'
        className='rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
        onClick={handleOpen}
        aria-label={`${label} mock cta`}
      >
        {label}
      </button>

      {isOpen ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4'>
          <div className='w-full max-w-sm rounded-xl bg-white p-5 shadow-xl' role='dialog' aria-modal='true' aria-label='Mock CTA modal'>
            <h3 className='text-base font-semibold text-slate-900'>Mock CTA</h3>
            <p className='mt-2 text-sm text-slate-600'>Mock CTA — available in Dynatrace products.</p>
            <div className='mt-4'>
              <button
                type='button'
                className='rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
                onClick={handleClose}
                aria-label='Close modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
