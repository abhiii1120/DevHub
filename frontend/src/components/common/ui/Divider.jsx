import { Separator } from '@/components/ui/separator'
import React from 'react'

const Divider = ({label}) => {
  return (
     <div className="flex items-center gap-3">
    <Separator className="flex-1 bg-border" />
    <span className="font-mono text-[10px] text-muted-foreground
                     tracking-widest uppercase shrink-0">
      {label}
    </span>
    <Separator className="flex-1 bg-border" />
  </div>
  )
}

export default Divider