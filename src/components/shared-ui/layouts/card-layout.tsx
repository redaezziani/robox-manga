import { Card, CardContent } from "@/components/ui/card"

import React from 'react'
import { cn } from "@/lib/utils"

interface CardLayoutProps {
    title? : string
    children?: React.ReactNode
    className? : string
}
const CardLayout = ({title="Defalut Card",children,className} :CardLayoutProps) => {
    
    return (
        <Card className={cn("flex flex-col gap-1",className)}>
            <span>
                <div className="p-2.5">
                    <h2>
                    {title}
                    </h2>
                </div>
            </span>
            <CardContent>
              {children}
            </CardContent>
        </Card>
    )
}

export default CardLayout