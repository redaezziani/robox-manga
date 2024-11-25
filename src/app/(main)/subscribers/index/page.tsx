import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout'
import React from 'react'
import { returnHello } from '../logic/test'

const page = () => {
  const str = returnHello()
  return (
    <MainPageLayout>
        <p>
            hello world {str}
        </p>
    </MainPageLayout>
  )
}

export default page
