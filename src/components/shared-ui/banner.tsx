import { ArrowLeft } from "lucide-react";

export default function Banner() {
    return (
        <div
        aria-label="New Manga Banner"
        className="dark bg-background px-4 py-3 text-white">
            <p className="flex justify-center text-sm" dir="rtl">
                <a href="#" className="group">
                    <span className="me-1 text-base leading-none">🎭</span>
                    مانجا جديدة! تصفح أحدث الإصدارات
                    <ArrowLeft
                        className="-mt-0.5 me-2 inline-flex opacity-60 transition-transform group-hover:-translate-x-0.5"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </a>
            </p>
        </div>
    );
}
