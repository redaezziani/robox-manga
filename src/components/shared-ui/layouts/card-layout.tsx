import { Card, CardContent } from "@/components/ui/card"

import React from 'react'
import { cn } from "@/lib/utils"

interface CardLayoutProps {
    children?: React.ReactNode
    className? : string
}
const CardLayout = ({children,className} :CardLayoutProps) => {
    
    return (
        <Card className={cn("flex flex-col gap-1 p-0 border-t-2 border-t-primary",className)}>
           
            <CardContent className="p-0">
              {children}
            </CardContent>
        </Card>
    )
}

export default CardLayout