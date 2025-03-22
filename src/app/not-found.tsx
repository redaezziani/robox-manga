"use client"

import Link from "next/link"
import { ArrowRight, Home, FileX2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container flex max-w-[64rem] flex-col items-center gap-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-muted/50 blur-xl" />
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-muted/20">
            <FileX2 className="h-10 w-10 text-muted-foreground" />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">404</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">الصفحة غير موجودة</h1>
          <p className="max-w-[42rem] text-lg leading-normal text-muted-foreground">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-4 w-4" />
              العودة للرئيسية
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="gap-2">
            <ArrowRight className="h-4 w-4" />
            الرجوع للخلف
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}

