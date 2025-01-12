

export default function ChapterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <main suppressHydrationWarning={false}>
            {children}
        </main>
    );
}
