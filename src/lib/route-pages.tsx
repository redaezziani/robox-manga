import CampaignsIcon from "@/components/icons/Campaigns";
import SubscribersIcon from "@/components/icons/Subscribers";
import NetworkIcon from "@/components/icons/Network";
import DeliverabilityIcon from "@/components/icons/Deliverability";
export const Pages = [
  {
    type: "group",
    title: "campaigns",
    icon: <CampaignsIcon color="" />,

    items: [
      {
        title: "create new",
        href: "/campaigns/create-new",
      },
      {
        title: "email compaigns",
        href: "/campaigns/email-compaigns",
      },
      {
        title: "test history",
        href: "/campaigns/test-history",
      },
      {
        title: "custom tags",
        href: "/campaigns/custom-tags",
      },
    ],
  },

  {
    type: "group",
    title: "subscribers",
    icon: <SubscribersIcon color="#475569" />,

    items: [
      {
        title: "Categories (ESP/ISP)",
        href: "/subscribers/categories",
      },
      {
        title: "Geos",
        href: "/subscribers/geos",
      },
      {
        title: "Engagements",
        href: "/subscribers/engagements",
      },
      {
        title: "Verticals",
        href: "/subscribers/verticals",
      },
      {
        title: "Email Lists",
        href: "/subscribers/email-lists",
      },
      {
        title: "Upload Center",
        href: "/subscribers/upload-center",
      },
      {
        title: "Download Center",
        href: "/subscribers/download-center",
      },
      {
        title: "Find Emails (Black-List)",
        href: "/subscribers/find-emails-blacklist",
      },
      {
        title: "Email Lists Mixer",
        href: "/subscribers/email-lists-mixer",
      },
      {
        title: "Email Lists Duplicate Mng",
        href: "/subscribers/email-lists-duplicate-mng",
      },
      {
        title: "Email Lists Splitter",
        href: "/subscribers/email-lists-splitter",
      },
      {
        title: "Conversion Emails Collector",
        href: "/subscribers/conversion-emails-collector",
      },
    ],
  },
  {
    type: "group",
    title: "deliverability",
    icon: <DeliverabilityIcon color="#475569" />,

    items: [
      {
        title: "Domains",
        href: "/domains",
      },
      {
        title: "Single Page Installer",
        href: "/single-page-installer",
      },
      {
        title: "Bulk Installer",
        href: "/bulk-installer",
      },
      {
        title: "Cloud Installer",
        href: "/cloud-installer",
      },
      {
        title: "Re-Install",
        href: "/re-install",
      },
      {
        title: "Delivery Servers",
        href: "/delivery-servers",
      },
      {
        title: "Allowed Interfaces/Domains",
        href: "/allowed-interfaces-domains",
      },
      {
        title: "Delivery Server Interfaces",
        href: "/delivery-server-interfaces",
      },
      {
        title: "Remote Commands",
        href: "/remote-commands",
      },
      {
        title: "PowerMTA Config",
        href: "/powermta-config",
      },
      {
        title: "PowerMTA Manager",
        href: "/powermta-manager",
      },
      {
        title: "PowerMTA Queues",
        href: "/powermta-queues",
      },
      {
        title: "PowerMTA Global Config",
        href: "/powermta-global-config",
      },
      {
        title: "Delivery Servers Status",
        href: "/delivery-servers-status",
      },
    ],
  },
  {
    type: "group",
    title: "networks & offers",
    icon: <NetworkIcon color="#475569" />, // Adjust color as needed

    items: [
      {
        title: "Sponsors",
        href: "/networks-offers/sponsors",
      },
      {
        title: "Offers",
        href: "/networks-offers/offers",
      },
      {
        title: "Suppression Manager",
        href: "/networks-offers/suppression-manager",
      },
      {
        title: "Global Suppression List",
        href: "/networks-offers/global-suppression-list",
      },
      {
        title: "Offers Unsubscribes",
        href: "/networks-offers/offers-unsubscribes",
      },
    ],
  },
];
