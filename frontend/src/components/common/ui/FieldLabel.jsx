import { Label } from '@/components/ui/label'
import React from 'react'

const FieldLabel = ({htmlFor,icon:Icon,children}) => {
  return (
    <Label htmlFor={htmlFor} className="flex items-center gap-1.5 cursor-pointer">
    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
    <span className="font-mono text-[10px] font-semibold tracking-widest
                     text-muted-foreground uppercase">
      {children}
    </span>
  </Label>
  )
}

export default FieldLabel