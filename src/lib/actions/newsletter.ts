'use server'

import axios from 'axios'
import { newsletterSchema } from "../validations/newsletter"

export async function subscribeToNewsletter(email: string) {
    try {
        const validatedFields = newsletterSchema.parse({ email })
        const response = await axios.post('YOUR_API_ENDPOINT/subscribe', validatedFields, {
            headers: { 'Content-Type': 'application/json' }
        })

        return { success: true }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { error: error.response?.data?.message || 'حدث خطأ أثناء الاشتراك' }
        }
        return { error: 'حدث خطأ غير متوقع' }
    }
}
