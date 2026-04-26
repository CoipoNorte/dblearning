import { sqlTopics } from '../data/sqlTopics'
import { pgTopics } from '../data/pgTopics'
import { mongoTopics } from '../data/mongoTopics'
import { ormTopics } from '../data/ormTopics'
import TopicNav from './ui/TopicNav'

const allTopics = { ...sqlTopics, ...pgTopics, ...mongoTopics, ...ormTopics }

export default function ContentArea({ activeTab, activeTopic, setActiveTopic, setActiveTab, sidebarCollapsed }) {
  const TopicComponent = allTopics[activeTopic]
  const info = {
    sql: { icon: '📊', name: 'SQL', desc: 'El lenguaje de las bases de datos', color: 'text-sql-blue' },
    postgres: { icon: '🐘', name: 'PostgreSQL', desc: 'La base de datos más avanzada', color: 'text-pg-blue' },
    mongodb: { icon: '🍃', name: 'MongoDB', desc: 'Base de datos NoSQL documental', color: 'text-mongo-green' },
    orm: { icon: '💎', name: 'ORMs', desc: 'Mapeo objeto-relacional', color: 'text-orm-purple' },
  }
  const t = info[activeTab]

  return (
    <div className={`pt-12 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-11' : 'lg:pl-56'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {TopicComponent ? (
          <div className="animate-fade-in prisma-card p-6">
            <TopicComponent />
            <TopicNav currentTopic={activeTopic} onNavigate={setActiveTopic} onTabChange={setActiveTab} />
          </div>
        ) : (
          <div className="prisma-card p-10 text-center prisma-glow">
            <div className="text-5xl mb-4">{t.icon}</div>
            <h2 className={`text-2xl font-bold ${t.color} mb-2`}>{t.name}</h2>
            <p className="text-prisma-gray mb-8">{t.desc}</p>
            <div className="prisma-card p-4 max-w-sm mx-auto text-left text-sm text-prisma-muted">
              <p>👈 Selecciona un tema del sidebar para comenzar.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
