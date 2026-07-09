import type { Feature } from '../data/features.ts'

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 inline-flex rounded-lg bg-indigo-50 p-3 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  )
}

export default FeatureCard
