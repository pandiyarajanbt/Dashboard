export const OPERATIONS = ['Total Employees', 'Present', 'On Leave'] as const

const SummaryPanel = () => {
  return (
    <section className="mb-6 grid gap-4 md:grid-cols-3">
      {[
        { label: 'Total Employees', value: '128', tone: 'bg-cyan-100 text-cyan-700' },
        { label: 'Present', value: '96', tone: 'bg-emerald-100 text-emerald-700' },
        { label: 'On Leave', value: '12', tone: 'bg-amber-100 text-amber-700' },
      ].map((item) => (
        <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">{item.label}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-900">{item.value}</span>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.tone}`}>
              Live
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default SummaryPanel
