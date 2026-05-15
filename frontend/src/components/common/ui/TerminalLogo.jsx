import { Terminal } from 'lucide-react'
import React from 'react'

const TerminalLogo = ({name,tagline}) => {
  return (
     <div className="flex flex-col items-center mb-8">
    <div className="w-14 h-14 rounded-xl bg-muted border border-border flex items-center justify-center mb-4">
      <Terminal className="w-6 h-6 text-primary" />
    </div>
    <h1 className="text-2xl font-bold text-foreground tracking-tight">{name}</h1>
    <p className="text-sm text-muted-foreground mt-1 tracking-wide">{tagline}</p>
  </div>
  )
}

export default TerminalLogo