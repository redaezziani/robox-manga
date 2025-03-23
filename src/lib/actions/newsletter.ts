'use server'

import axios from 'axios'
import { newsletterSchema } from "../validations/newsletter"

const API_URL =  'https://redaezziani.com'

export async function subscribeToNewsletter(email: string) {
    try {
        const requestBody = {
            email,
            topics: ["manga", "chapters"]
        }

        const validatedFields = newsletterSchema.parse(requestBody)

        const response = await axios.post(
            `${API_URL}/api/subscriptions`,
            validatedFields,
            {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            }
        )

        if (response.status === 200 || response.status === 201) {
            return { 
                success: true,
                message: "تم الاشتراك بنجاح في النشرة الإخبارية! 🎉" 
            }
        }

        throw new Error(response.data?.message || 'حدث خطأ أثناء الاشتراك')

    } catch (error) {
        console.error('Subscription error:', error)
        if (axios.isAxiosError(error)) {
            return { 
                success: false,
                error: error.response?.data?.message || 'فشل الاشتراك في النشرة الإخبارية' 
            }
        }
        return { 
            success: false,
            error: 'حدث خطأ غير متوقع' 
        }
    }
}
