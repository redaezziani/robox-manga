import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell } from "lucide-react";
import ThemeSwitcher from "./theme-ui";
import UserSettings from "./user-settings";

export default function MainTabs() {
    return (
        <Tabs
            className="dir-rtl"
            defaultValue="settings">
            <ScrollArea
                dir="rtl"
                className="dir-rtl"
            >
                <TabsList
                    dir="rtl"
                    className="mb-3 h-auto dir-rtl -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
                >
                    <TabsTrigger
                        value="settings"
                        className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                    >
                        <Settings
                            className="-ms-0.5 me-1.5 opacity-60"
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                        الإعدادات العامة
                    </TabsTrigger>
                    <TabsTrigger
                        value="notification-settings"
                        className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
                    >
                        <Bell
                            className="-ms-0.5 me-1.5 opacity-60"
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                        الإشعارات والتنبيهات
                    </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent
                className="w-full"
                value="settings"
                dir="rtl"
            >
                <div
                dir="rtl"
                className="space-y-8 w-full grid grid-cols-1 md:grid-cols-2 p-4">
                    
                    <div className="  ">
                        <UserSettings />
                    </div>
                    <div className="space-y-4 ">
                        <h3 className="text-lg font-medium">المظهر</h3>
                        <ThemeSwitcher />
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="notification-settings">
                <p className="p-4 pt-1 min-h-96 text-center text-xs text-muted-foreground">
                    محتوى إعدادات الإشعارات
                </p>
            </TabsContent>
        </Tabs>
    );
}
