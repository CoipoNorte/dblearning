import { Menu } from 'lucide-react'

const tabs = [
  { id: 'sql', label: 'SQL', icon: '📊', color: 'text-sql-blue border-sql-blue/30 bg-sql-blue/10' },
  { id: 'postgres', label: 'PostgreSQL', icon: '🐘', color: 'text-pg-blue border-pg-blue/30 bg-pg-blue/10' },
  { id: 'mongodb', label: 'MongoDB', icon: '🍃', color: 'text-mongo-green border-mongo-green/30 bg-mongo-green/10' },
  { id: 'orm', label: 'ORMs', icon: '💎', color: 'text-orm-purple border-orm-purple/30 bg-orm-purple/10' },
]

export default function TopNav({ activeTab, setActiveTab, onToggleSidebar }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-db-border"
      style={{ background: 'rgba(12, 13, 33, 0.9)', backdropFilter: 'blur(16px)' }}>
      <div className="flex items-center h-full px-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-1.5 mr-3 text-prisma-muted hover:text-prisma-purple transition-colors">
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-2 mr-6">
          <span className="text-xl">🗄️</span>
          <span className="font-bold gradient-text-prisma hidden sm:inline">dblearning</span>
        </div>
        <div className="h-5 w-px bg-db-border mr-3" />
        <div className="flex items-center gap-1.5">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                activeTab === tab.id ? tab.color : 'text-prisma-muted border-transparent hover:text-prisma-white hover:bg-db-hover'
              }`}>
              <span className="text-sm">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
