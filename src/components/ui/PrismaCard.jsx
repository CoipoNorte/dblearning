export default function PrismaCard({ title, icon, variant = 'default', children }) {
  const variants = {
    default: 'border-db-border', purple: 'border-prisma-purple/25 bg-prisma-purple/5',
    blue: 'border-prisma-blue/25 bg-prisma-blue/5', green: 'border-prisma-green/25 bg-prisma-green/5',
    cyan: 'border-prisma-cyan/25 bg-prisma-cyan/5', orange: 'border-prisma-orange/25 bg-prisma-orange/5',
    pink: 'border-prisma-pink/25 bg-prisma-pink/5', red: 'border-prisma-red/25 bg-prisma-red/5',
  }
  const titleColors = {
    default: 'text-prisma-white', purple: 'text-prisma-purple-light', blue: 'text-prisma-blue',
    green: 'text-prisma-green', cyan: 'text-prisma-cyan', orange: 'text-prisma-orange',
    pink: 'text-prisma-pink', red: 'text-prisma-red',
  }
  return (
    <div className={`prisma-card p-4 ${variants[variant]}`}>
      {title && (
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-db-border/50">
          {icon && <span className="text-sm">{icon}</span>}
          <h4 className={`text-sm font-semibold ${titleColors[variant]}`}>{title}</h4>
        </div>
      )}
      <div className="text-sm text-prisma-gray leading-relaxed">{children}</div>
    </div>
  )
}
