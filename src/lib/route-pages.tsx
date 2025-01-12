import CampaignsIcon from '@/components/icons/Campaigns';
import NetworkIcon from '@/components/icons/Network';
import SettingsIcons from '@/components/icons/Settings';

export const Pages = [
  {
    type: 'group',
    title: 'الحملات',
    icon: <CampaignsIcon />,
    items: [
      {
        title: 'إنشاء جديد',
        href: '/campaigns/create-new',
      },
      {
        title: 'حملات البريد الإلكتروني',
        href: '/campaigns/email-campaigns',
      },
      {
        title: 'مجموعة فرعية',
        items: [
          {
            title: 'عنصر متداخل 1',
            href: '/campaigns/sub-group/nested-1',
          },
          {
            title: 'عنصر متداخل 2',
            href: '/campaigns/sub-group/nested-2',
          },
        ],
      },
    ],
  },
  {
    type: 'group',
    title: 'الرئيسية',
    icon: <NetworkIcon color="#475569" />,

    items: [
      {
        title: 'الصفحة الرئيسية',
        href: '/home/page-1',
      },
    ],
  },
  {
    type: 'group',
    title: 'الإعدادات',
    icon: <SettingsIcons color="#475569" />,
    items: [
      {
        title: 'إعدادات العميل',
        href: '/settings/client-settings',
      },
    ],
  },
];
