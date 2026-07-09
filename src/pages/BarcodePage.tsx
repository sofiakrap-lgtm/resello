import { useState } from 'react'
import BarcodeSvg from '../components/BarcodeSvg.tsx'

function BarcodePage() {
  const [value, setValue] = useState('RESELLO-0001')

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Viivakoodi</h1>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-slate-700">Arvo</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full max-w-sm rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </label>

      <div className="inline-flex rounded-lg border border-slate-200 bg-white p-6">
        <BarcodeSvg value={value} />
      </div>
    </section>
  )
}

export default BarcodePage
