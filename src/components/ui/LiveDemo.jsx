export default function LiveDemo({ title, children }) {
  return (
    <div className="prisma-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-db-surface border-b border-db-border">
        <span className="w-2 h-2 rounded-full bg-prisma-green animate-pulse" />
        <span className="text-[11px] text-prisma-muted">{title || 'Output'}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
