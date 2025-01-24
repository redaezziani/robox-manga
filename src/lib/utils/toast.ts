import { toast } from "sonner"

export const showToast = {
    success: (message: string) => {
        toast.success(message)
    },
    error: (message: string) => {
        toast.error(message)
    },
    loading: (message: string) => {
        toast.loading(message)
    },
    custom: ({
        title,
        description,
        action
    }: {
        title: string,
        description?: string,
        action?: () => void
    }) => {
        toast(title, {
            description,
            action: action ? {
                label: "تراجع",
                onClick: action
            } : undefined
        })
    }
}

export const toastMessages = {
    success: {
        subscribe: "تم الاشتراك بنجاح! 🎉",
        update: "تم التحديث بنجاح ✅",
        save: "تم الحفظ بنجاح 💾",
    },
    error: {
        general: "عذراً، حدث خطأ ما ❌",
        subscribe: "عذراً، فشل الاشتراك ❌",
        update: "عذراً، فشل التحديث ❌",
        validation: "يرجى التحقق من البيانات المدخلة ⚠️",
    },
    loading: {
        subscribe: "جاري الاشتراك...",
        update: "جاري التحديث...",
        save: "جاري الحفظ...",
    }
}
