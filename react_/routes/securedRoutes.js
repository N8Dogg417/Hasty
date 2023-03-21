import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../pages/dashboard/admindash/AdminDashboard'));
const ActiveDutyDashboard = lazy(() => import('../pages/dashboard/activeduty/ActiveDutyDashboard'));
const Apps = lazy(() => import('../pages/dashboard/apps/AppsDashboard'));
const Chat = lazy(() => import('../components/messages/chat/Chat'));
const CivilianDashboard = lazy(() => import('../pages/dashboard/civilian/CivilianDashboard'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Locations = lazy(() => import('../components/locations/Locations'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const GoogleAnalytics = lazy(() => import('../pages/googleanalytics/GoogleAnalytics'));
const LandlordDashboard = lazy(() => import('../pages/dashboard/landlord/LandlordDashboard'));
const Comments = lazy(() => import('../components/comments/Comments'));
const MilitaryProfiles = lazy(() => import('../components/military/MilitaryProfiles'));
const CivilianList = lazy(() => import('../components/civilian/CivilianListings'));
const FileManager = lazy(() => import('../components/files/FileManager'));
const NewsletterSub = lazy(() => import('../pages/dashboard/newslettersubscription/NewsletterSubDash'));
const UserProfile = lazy(() => import('../pages/user/UserProfile'));
const ListingsMap = lazy(() => import('../components/listings/ListingsMap'));
const ListingWizard = lazy(() => import('../components/listings/ListingWizard'));
const VeteranDashboard = lazy(() => import('../pages/dashboard/veteran/VeteranDashboard'));
const VideoChat = lazy(() => import('../components/messages/videochat/VideoChat'));
const Invoice = lazy(() => import('../components/payment/Invoice'));
const CheckoutButton = lazy(() => import('../components/payment/CheckoutButton'));
const PaymentSuccess = lazy(() => import('../components/payment/PaymentSuccess'));
const NewBlog = lazy(() => import('../components/blogs/BlogForm'));
const EditBlog = lazy(() => import('../components/blogs/BlogForm'));
const MilitaryDashboard = lazy(() => import('../pages/dashboard/military/MilitaryDashboard'));
const Podcast = lazy(() => import('../components/podcast/Podcast'));
const PodcastForm = lazy(() => import('../components/podcast/PodcastForm'));
const NewsletterTemplates = lazy(() => import('../components/newslettertemplates/NewsletterTemplates'));
const AddTemplate = lazy(() => import('../components/newslettertemplates/AddTemplate'));
const FAQForm = lazy(() => import('../components/faq/FAQForm'));
const FAQAdmin = lazy(() => import('../components/faq/FAQAdmin'));

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
      {
        path: '/dashboard/analytics',
        name: 'Analytics',
        element: GoogleAnalytics,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/admin',
        name: 'AdminDashboard',
        element: AdminDashboard,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/activeduty',
        name: 'ActiveDutyDashboard',
        element: ActiveDutyDashboard,
        roles: ['Admin', 'Active Duty'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/civilian',
        name: 'CivilianDashboard',
        element: CivilianDashboard,
        roles: ['Admin', 'Civilian'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/newslettersubscriptions',
        name: 'Newsletter Subscriptions',
        element: NewsletterSub,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/landlord',
        name: 'LandlordDashboard',
        element: LandlordDashboard,
        roles: ['Admin', 'Proprietor'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/veteran',
        name: 'VeteranDashboard',
        element: VeteranDashboard,
        roles: ['Admin', 'Veteran'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/military',
        name: 'Military Dashboard',
        element: MilitaryDashboard,
        roles: ['Admin', 'Veteran', 'Active Duty'],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
      {
        path: '/dashboard/analytics',
        name: 'Analytics',
        element: GoogleAnalytics,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/activeduty',
        name: 'ActiveDutyDashboard',
        element: ActiveDutyDashboard,
        roles: ['Admin', 'Active Duty'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/civilian',
        name: 'CivilianDashboard',
        element: CivilianDashboard,
        roles: ['Admin', 'Civilian'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/newslettersubscriptions',
        name: 'Newsletter Subscriptions',
        element: NewsletterSub,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/newslettertemplates',
        name: 'Newsletter Templates',
        element: NewsletterTemplates,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/landlord',
        name: 'LandlordDashboard',
        element: LandlordDashboard,
        roles: ['Admin', 'Proprietor'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/dashboard/veteran',
        name: 'VeteranDashboard',
        element: VeteranDashboard,
        roles: ['Admin', 'Veteran'],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

const profilesRoute = [
  {
    path: '/profiles/military',
    name: 'Military Profiles',
    element: MilitaryProfiles,
    roles: ['Admin'],
    exact: true,
    isAnonymous: false,
  },
  {
    path: '/profiles/civilian',
    name: 'Civilian Profiles',
    element: CivilianList,
    roles: ['Admin'],
    exact: true,
    isAnonymous: false,
  },
];

const paymentRoutes = [
  {
    path: '/checkout',
    name: 'Checkout',
    exact: true,
    element: CheckoutButton,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    isAnonymous: false,
  },
  {
    path: '/success',
    name: 'Payment Success',
    exact: true,
    element: PaymentSuccess,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    isAnonymous: false,
  },
  {
    path: '/invoice',
    name: 'Invoice',
    exact: true,
    element: Invoice,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    isAnonymous: false,
  },
];

const appRoutes = [
  {
    path: '/apps',
    name: 'Apps',
    element: Apps,
    icon: 'uil-home-alt',
    header: 'Apps',
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    children: [
      {
        path: '/apps/chat',
        name: 'Chat',
        element: Chat,
        roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: 'apps/comments',
        name: 'Comments',
        exact: true,
        element: Comments,
        roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
        isAnonymous: false,
      },
      {
        path: '/apps/file',
        name: 'File Manager',
        element: FileManager,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/apps/locations',
        name: 'Locations',
        element: Locations,
        roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/apps/videochat',
        name: 'Video Chat',
        element: VideoChat,
        roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/apps/videochat/:roomname',
        name: 'Join a Video Chat Room',
        element: VideoChat,
        roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
        exact: true,
        isAnonymous: false,
      },
      {
        path: '/podcast',
        name: 'Podcast',
        element: Podcast,
        roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
        exact: true,
        isAnonymous: true,
      },
      {
        path: '/podcast/new',
        name: 'PodcastForm',
        element: PodcastForm,
        roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
        exact: true,
        isAnonymous: true,
      },
    ],
  },
];

const userRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    element: UserProfile,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    exact: true,
    isAnonymous: false,
  },
];

const listingRoutes = [
  {
    path: '/listing/create',
    name: 'Listing Wizard',
    exact: true,
    element: ListingWizard,
    roles: ['Admin', 'Proprietor'],
    isAnonymous: false,
  },
  {
    path: '/listings/map',
    name: 'Listings Map',
    exact: true,
    element: ListingsMap,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    isAnonymous: false,
  },
];

const blogRoutes = [
  {
    path: '/blogs/new',
    name: 'Create a Blog',
    exact: true,
    element: NewBlog,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran'],
    isAnonymous: false,
  },
  {
    path: '/blogs/:id/edit',
    name: 'Edit a Blog',
    exact: true,
    element: EditBlog,
    roles: ['Admin', 'Proprietor', 'Civilian', 'Active Duty', 'Veteran', 'Proprietor'],
    isAnonymous: false,
  },
];

const newsletterTemplatesRoutes = [
  {
    path: '/newslettertemplates',
    name: 'Newsletter Templates',
    exact: true,
    element: NewsletterTemplates,
    roles: ['Admin'],
    isAnonymous: false,
  },

  {
    path: '/templates/new',
    name: 'Create New Template',
    exact: true,
    element: AddTemplate,
    roles: ['Admin'],
    isAnonymous: false,
  },
  {
    path: '/templates/new/:id',
    name: 'Edit Template',
    exact: true,
    element: AddTemplate,
    roles: ['Admin'],
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: '*',
    name: 'Error - 404',
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];

const faqRoutes = [
  {
    path: '/faq/new',
    name: 'FAQs',
    exact: true,
    element: FAQForm,
    roles: ['Admin'],
    isAnonymous: false,
  },
  {
    path: '/faq/admin',
    name: 'FAQs',
    exact: true,
    element: FAQAdmin,
    roles: ['Admin'],
    isAnonymous: false,
  },
  {
    path: '/faq/edit/:id',
    name: 'Edit FAQ',
    exact: true,
    element: FAQForm,
    roles: ['Admin'],
    isAnonymous: false,
  },
];

const allRoutes = [
  ...dashboardRoutes,
  ...errorRoutes,
  ...profilesRoute,
  ...appRoutes,
  ...userRoutes,
  ...listingRoutes,
  ...newsletterTemplatesRoutes,
  ...paymentRoutes,
  ...blogRoutes,
  ...faqRoutes,
];

export default allRoutes;
