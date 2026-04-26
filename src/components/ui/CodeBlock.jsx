import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ code, language = 'sql', title }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const langColors = {
    sql: 'text-sql-blue', postgresql: 'text-pg-blue', mongodb: 'text-mongo-green',
    js: 'text-prisma-orange', prisma: 'text-prisma-purple', bash: 'text-prisma-green',
    json: 'text-prisma-orange',
  }

  return (
    <div className="prisma-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-db-surface border-b border-db-border">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-prisma-red/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-prisma-orange/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-prisma-green/60" />
          </div>
          <span className="text-[11px] text-prisma-muted font-code">{title || `query.${language}`}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-code ${langColors[language] || 'text-prisma-gray'}`}>{language}</span>
          <button onClick={handleCopy}
            className="p-1 rounded-md hover:bg-db-hover text-prisma-muted hover:text-prisma-white transition-colors">
            {copied ? <Check size={12} className="text-prisma-green" /> : <Copy size={12} />}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto bg-db-input">
        <pre className="font-code text-[13px] leading-relaxed">
          <code className="text-prisma-white/90">{code.trim()}</code>
        </pre>
      </div>
    </div>
  )
}
