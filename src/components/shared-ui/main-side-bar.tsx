'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pages } from '@/lib/route-pages';
import ArrowsIcon from '../icons/Arrows';
import { Button } from '../ui/button';
import CollapsibleMenuItem from './collapsible-menu-item';

const MainSideBar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const handleOpen = () => setOpen(!open);

  return (
    <motion.aside
      lang="ar"
      initial={false}
      animate={{
        width: open ? 384 : 40,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="bg-muted sticky left-0 top-0 hidden h-screen flex-col border-l border-slate-400/35 lg:flex"
    >
      <Button
        size="icon"
        variant="outline"
        onClick={handleOpen}
        className="absolute -left-3 top-4 flex size-6 items-center justify-center rounded-full border border-slate-400/45"
      >
        <motion.div animate={{ rotate: open ? 0 : 180 }} transition={{ duration: 0.3 }}>
          <ArrowsIcon />
        </motion.div>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex w-full items-center justify-start gap-x-2 border-b border-slate-400/35 py-3"
          >
            <img src="/logo.png" className="w-[3.2rem]" alt="Logo" />
            <h2 className="text-primary text-lg font-semibold">إدارة المخزون</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        animate={{
          x: open ? 0 : -10,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          delay: open ? 0.1 : 0,
        }}
        className="mt-20 size-full overflow-y-auto px-2"
      >
        <ul className="space-y-2">
          {Pages.map((page) => (
            <li key={page.title}>
              <CollapsibleMenuItem item={page} />
            </li>
          ))}
        </ul>
      </motion.nav>
    </motion.aside>
  );
};

export default MainSideBar;
