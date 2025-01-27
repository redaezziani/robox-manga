import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout'

import React from 'react'
import MainTabs from './ui/tabs-list'
const SettingsPage = () => {
    return (
        <MainPageLayout>
            <div className="container relative mx-auto mt-10 flex w-full flex-col gap-2 px-4">
                <section className="my-6 flex flex-col items-start justify-start">
                    <h3 className="mt-2 text-lg font-semibold text-gray-600">
                        الإعدادات
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                        إدارة تفضيلات حسابك وإعدادات التطبيق
                    </p>
                </section>
           <div className="w-full">
           <MainTabs/>
           </div>
            </div>
        </MainPageLayout>
    )
}

export default SettingsPage