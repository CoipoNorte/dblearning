import { ChevronLeft, ChevronRight } from 'lucide-react'

const allTopicsOrdered = [
  { id: 'sql-intro', label: 'Qué es SQL', tab: 'sql' },
  { id: 'sql-select', label: 'SELECT', tab: 'sql' },
  { id: 'sql-where', label: 'WHERE y filtros', tab: 'sql' },
  { id: 'sql-insert', label: 'INSERT UPDATE DELETE', tab: 'sql' },
  { id: 'sql-joins', label: 'JOINs', tab: 'sql' },
  { id: 'sql-aggregate', label: 'Agregación', tab: 'sql' },
  { id: 'sql-subqueries', label: 'Subqueries', tab: 'sql' },
  { id: 'sql-indexes', label: 'Índices', tab: 'sql' },
  { id: 'sql-design', label: 'Diseño de esquemas', tab: 'sql' },
  { id: 'sql-tips', label: 'Tips', tab: 'sql' },
  { id: 'pg-intro', label: 'Qué es PostgreSQL', tab: 'postgres' },
  { id: 'pg-setup', label: 'Instalación', tab: 'postgres' },
  { id: 'pg-types', label: 'Tipos de datos', tab: 'postgres' },
  { id: 'pg-json', label: 'JSON y arrays', tab: 'postgres' },
  { id: 'pg-functions', label: 'Funciones', tab: 'postgres' },
  { id: 'pg-transactions', label: 'Transacciones', tab: 'postgres' },
  { id: 'pg-views', label: 'Views y CTEs', tab: 'postgres' },
  { id: 'pg-security', label: 'Seguridad', tab: 'postgres' },
  { id: 'pg-performance', label: 'Performance', tab: 'postgres' },
  { id: 'pg-node', label: 'PG + Node.js', tab: 'postgres' },
  { id: 'mongo-intro', label: 'Qué es MongoDB', tab: 'mongodb' },
  { id: 'mongo-crud', label: 'CRUD', tab: 'mongodb' },
  { id: 'mongo-query', label: 'Queries', tab: 'mongodb' },
  { id: 'mongo-schema', label: 'Schema design', tab: 'mongodb' },
  { id: 'mongo-aggregation', label: 'Aggregation', tab: 'mongodb' },
  { id: 'mongo-mongoose', label: 'Mongoose', tab: 'mongodb' },
  { id: 'orm-intro', label: 'Qué son ORMs', tab: 'orm' },
  { id: 'orm-prisma', label: 'Prisma', tab: 'orm' },
  { id: 'orm-drizzle', label: 'Drizzle', tab: 'orm' },
  { id: 'orm-compare', label: 'Comparación', tab: 'orm' },
]

const tabColors = {
  sql: 'border-sql-blue/30 text-sql-blue hover:bg-sql-blue/10',
  postgres: 'border-pg-blue/30 text-pg-blue hover:bg-pg-blue/10',
  mongodb: 'border-mongo-green/30 text-mongo-green hover:bg-mongo-green/10',
  orm: 'border-orm-purple/30 text-orm-purple hover:bg-orm-purple/10',
}

export default function TopicNav({ currentTopic, onNavigate, onTabChange }) {
  const idx = allTopicsOrdered.findIndex(t => t.id === currentTopic)
  if (idx === -1) return null
  const prev = idx > 0 ? allTopicsOrdered[idx - 1] : null
  const next = idx < allTopicsOrdered.length - 1 ? allTopicsOrdered[idx + 1] : null
  const progress = Math.round(((idx + 1) / allTopicsOrdered.length) * 100)

  const handleNav = (topic) => {
    if (topic.tab !== allTopicsOrdered[idx].tab) onTabChange(topic.tab)
    onNavigate(topic.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mt-8 pt-5 border-t border-db-border">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] text-prisma-muted">{idx + 1}/{allTopicsOrdered.length}</span>
        <div className="flex-1 h-1.5 bg-db-surface rounded-full overflow-hidden prisma-border">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)' }} />
        </div>
        <span className="text-[11px] gradient-text-prisma font-semibold">{progress}%</span>
      </div>
      <div className="flex justify-between gap-3">
        {prev ? (
          <button onClick={() => handleNav(prev)}
            className={`flex items-center gap-2 flex-1 text-left px-4 py-3 rounded-xl prisma-card border ${tabColors[prev.tab]} text-xs transition-all`}>
            <ChevronLeft size={14} />
            <div><div className="text-[10px] text-prisma-muted">← anterior</div><div>{prev.label}</div></div>
          </button>
        ) : <div className="flex-1" />}
        {next ? (
          <button onClick={() => handleNav(next)}
            className={`flex items-center justify-end gap-2 flex-1 text-right px-4 py-3 rounded-xl prisma-card border ${tabColors[next.tab]} text-xs transition-all`}>
            <div><div className="text-[10px] text-prisma-muted">siguiente →</div><div>{next.label}</div></div>
            <ChevronRight size={14} />
          </button>
        ) : (
          <div className="flex-1 prisma-card rounded-xl p-3 text-center border border-prisma-purple/30">
            <span className="gradient-text-prisma text-xs font-semibold">🎓 ¡Curso completado!</span>
          </div>
        )}
      </div>
    </div>
  )
}
