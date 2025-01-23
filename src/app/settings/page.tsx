import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout'

import React from 'react'
import MainTabs from './ui/tabs-list'
const SettingsPage = () => {
    return (
        <MainPageLayout>
            <div className="container relative mx-auto mt-10 flex w-full flex-col gap-2 px-4">
                <section className="my-6 flex flex-col items-start justify-start">
                    <h3 lang="ar" className="mt-2 text-lg font-semibold text-gray-600">
                        عالمك المفضل للمانجا العربية
                    </h3>
                    <p lang="ar" className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                        انضم إلينا في رحلة استكشاف عالم المانجا الساحر. نقدم لك أفضل القصص المصورة بترجمة عربية
                        احترافية،
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