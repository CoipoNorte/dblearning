import { ChevronLeft, ChevronRight } from 'lucide-react'

const topicsByTab = {
  sql: [
    { id: 'sql-intro', label: 'Qué es SQL', icon: '📖' },
    { id: 'sql-select', label: 'SELECT', icon: '🔍' },
    { id: 'sql-where', label: 'WHERE y filtros', icon: '🎯' },
    { id: 'sql-insert', label: 'INSERT UPDATE DELETE', icon: '✏️' },
    { id: 'sql-joins', label: 'JOINs', icon: '🔗' },
    { id: 'sql-aggregate', label: 'Agregación', icon: '📊' },
    { id: 'sql-subqueries', label: 'Subqueries', icon: '🔄' },
    { id: 'sql-indexes', label: 'Índices', icon: '⚡' },
    { id: 'sql-design', label: 'Diseño de esquemas', icon: '🏗️' },
    { id: 'sql-tips', label: 'Tips', icon: '💡' },
  ],
  postgres: [
    { id: 'pg-intro', label: 'Qué es PostgreSQL', icon: '📖' },
    { id: 'pg-setup', label: 'Instalación', icon: '🚀' },
    { id: 'pg-types', label: 'Tipos de datos', icon: '📋' },
    { id: 'pg-json', label: 'JSON y arrays', icon: '📦' },
    { id: 'pg-functions', label: 'Funciones', icon: '⚙️' },
    { id: 'pg-transactions', label: 'Transacciones', icon: '🔒' },
    { id: 'pg-views', label: 'Views y CTEs', icon: '👁️' },
    { id: 'pg-security', label: 'Seguridad', icon: '🛡️' },
    { id: 'pg-performance', label: 'Performance', icon: '⚡' },
    { id: 'pg-node', label: 'PG + Node.js', icon: '🔌' },
  ],
  mongodb: [
    { id: 'mongo-intro', label: 'Qué es MongoDB', icon: '📖' },
    { id: 'mongo-crud', label: 'CRUD', icon: '🔄' },
    { id: 'mongo-query', label: 'Queries', icon: '🔍' },
    { id: 'mongo-schema', label: 'Schema design', icon: '🏗️' },
    { id: 'mongo-aggregation', label: 'Aggregation', icon: '📊' },
    { id: 'mongo-mongoose', label: 'Mongoose', icon: '🔧' },
  ],
  orm: [
    { id: 'orm-intro', label: 'Qué son ORMs', icon: '📖' },
    { id: 'orm-prisma', label: 'Prisma', icon: '💎' },
    { id: 'orm-drizzle', label: 'Drizzle', icon: '💧' },
    { id: 'orm-compare', label: 'Comparación', icon: '⚔️' },
  ],
}

const tabActiveColors = {
  sql: 'text-sql-blue border-sql-blue bg-sql-blue/10',
  postgres: 'text-pg-blue border-pg-blue bg-pg-blue/10',
  mongodb: 'text-mongo-green border-mongo-green bg-mongo-green/10',
  orm: 'text-orm-purple border-orm-purple bg-orm-purple/10',
}
const tabHoverColors = {
  sql: 'hover:text-sql-blue hover:bg-sql-blue/5',
  postgres: 'hover:text-pg-blue hover:bg-pg-blue/5',
  mongodb: 'hover:text-mongo-green hover:bg-mongo-green/5',
  orm: 'hover:text-orm-purple hover:bg-orm-purple/5',
}
const tabLabels = { sql: '📊 SQL', postgres: '🐘 PostgreSQL', mongodb: '🍃 MongoDB', orm: '💎 ORMs' }

export default function Sidebar({ activeTab, activeTopic, setActiveTopic, collapsed, setCollapsed }) {
  const topics = topicsByTab[activeTab] || []
  const isMobile = () => window.innerWidth < 1024
  const handleSelect = (id) => { setActiveTopic(id); if (isMobile()) setCollapsed(true) }

  return (
    <>
      {!collapsed && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setCollapsed(true)} />}
      <aside className={`fixed top-12 left-0 bottom-0 z-40 bg-db-surface border-r border-db-border transition-all duration-300 flex flex-col ${collapsed ? 'w-0 lg:w-11 overflow-hidden' : 'w-56'}`}>
        {!collapsed && (
          <div className="px-4 py-3 border-b border-db-border/50">
            <p className="text-[11px] text-prisma-muted font-medium uppercase tracking-wider">{tabLabels[activeTab]}</p>
          </div>
        )}
        <div className="flex-1 overflow-y-auto py-1">
          {!collapsed && topics.map(topic => (
            <button key={topic.id} onClick={() => handleSelect(topic.id)}
              className={`w-full text-left px-4 py-2 flex items-center gap-2.5 text-[12px] transition-all border-l-2 ${
                activeTopic === topic.id ? tabActiveColors[activeTab] : `text-prisma-gray border-transparent ${tabHoverColors[activeTab]}`
              }`}>
              <span className="text-xs w-5 text-center">{topic.icon}</span>
              <span className="truncate">{topic.label}</span>
            </button>
          ))}
          {collapsed && topics.map(topic => (
            <button key={topic.id}
              onClick={() => { setActiveTopic(topic.id); if (!isMobile()) setCollapsed(false) }}
              className={`hidden lg:block w-full py-2 text-center text-xs transition-all ${
                activeTopic === topic.id ? tabActiveColors[activeTab] : `text-prisma-muted ${tabHoverColors[activeTab]}`
              }`} title={topic.label}>{topic.icon}</button>
          ))}
        </div>
        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center py-2.5 border-t border-db-border/50 text-prisma-muted hover:text-prisma-purple transition-colors">
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>
    </>
  )
}
