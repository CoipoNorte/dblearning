import { useState } from 'react'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'

function App() {
  const [activeTab, setActiveTab] = useState('sql')
  const [activeTopic, setActiveTopic] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const handleTabChange = (tab) => { setActiveTab(tab); setActiveTopic(null) }

  return (
    <div className="min-h-screen bg-db-bg">
      <TopNav activeTab={activeTab} setActiveTab={handleTabChange}
        onToggleSidebar={() => setSidebarCollapsed(c => !c)} />
      <Sidebar activeTab={activeTab} activeTopic={activeTopic}
        setActiveTopic={setActiveTopic} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <ContentArea activeTab={activeTab} activeTopic={activeTopic}
        setActiveTopic={setActiveTopic} setActiveTab={setActiveTab} sidebarCollapsed={sidebarCollapsed} />
    </div>
  )
}

export default App
