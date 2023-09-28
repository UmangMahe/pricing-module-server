import { 
  DashboardOutlined, 
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  FileImageOutlined,
  StopOutlined,
  DotChartOutlined,
  MailOutlined,
  SisternodeOutlined,
  MessageOutlined,
  CloudUploadOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  FileUnknownOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from '@configs/AppConfig'



const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'dashboards',
      path: `${APP_PREFIX_PATH}`,
      title: 'sidenav.dashboard.default',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    // {
    //   key: 'dashboards-analytic',
    //   path: `${APP_PREFIX_PATH}/analytic`,
    //   title: 'sidenav.dashboard.analytic',
    //   icon: DotChartOutlined,
    //   breadcrumb: false,
    //   submenu: []
    // },
    // {
    //   key: 'dashboards-sales',
    //   path: `${APP_PREFIX_PATH}/dashboards/sales`,
    //   title: 'sidenav.dashboard.sales',
    //   icon: FundOutlined,
    //   breadcrumb: false,
    //   submenu: []
    // }
  ]
}]

const componentsNavTree = [
  {
    key: 'components',
    path: `${APP_PREFIX_PATH}`,
    title: 'sidenav.components',
    icon: AntDesignOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'components-configurations',
        path: `${APP_PREFIX_PATH}/configurations`,
        title: 'sidenav.components.configurations',
        icon: SisternodeOutlined,
        breadcrumb: true,
        submenu: [
          
        ]
      },
      {
        key: 'components-uploads',
        path: `${APP_PREFIX_PATH}/uploads`,
        title: 'sidenav.components.uploads',
        icon: CloudUploadOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'components-uploads-cv',
            path: `${APP_PREFIX_PATH}/uploads/cv`,
            title: 'sidenav.components.uploads.cv',
            icon: FileTextOutlined,
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'components-uploads-images',
            path: `${APP_PREFIX_PATH}/uploads/images`,
            title: 'sidenav.components.uploads.images',
            icon: FileImageOutlined,
            breadcrumb: true,
            submenu: []
          },
        ]
      },
      
      // {
      //   key: 'components-data-entry',
      //   path: `${APP_PREFIX_PATH}/components/data-entry`,
      //   title: 'sidenav.components.dataEntry',
      //   icon: FileDoneOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'components-data-entry-auto-complete',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/auto-complete`,
      //       title: 'sidenav.components.dataEntry.autoComplete',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-checkbox',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/checkbox`,
      //       title: 'sidenav.components.dataEntry.checkbox',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-cascader',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/cascader`,
      //       title: 'sidenav.components.dataEntry.cascader',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-date-picker',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/date-picker`,
      //       title: 'sidenav.components.dataEntry.datePicker',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-form',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/form`,
      //       title: 'sidenav.components.dataEntry.form',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-input-number',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/input-number`,
      //       title: 'sidenav.components.dataEntry.inputNumber',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-input',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/input`,
      //       title: 'sidenav.components.dataEntry.input',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-mentions',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/mentions`,
      //       title: 'sidenav.components.dataEntry.mentions',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-rate',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/rate`,
      //       title: 'sidenav.components.dataEntry.rate',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-radio',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/radio`,
      //       title: 'sidenav.components.dataEntry.radio',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-switch',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/switch`,
      //       title: 'sidenav.components.dataEntry.switch',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-slider',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/slider`,
      //       title: 'sidenav.components.dataEntry.slider',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-select',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/select`,
      //       title: 'sidenav.components.dataEntry.select',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-tree-select',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/tree-select`,
      //       title: 'sidenav.components.dataEntry.treeSelect',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-transfer',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/transfer`,
      //       title: 'sidenav.components.dataEntry.transfer',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-time-picker',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/time-picker`,
      //       title: 'sidenav.components.dataEntry.timePicker',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-entry-upload',
      //       path: `${APP_PREFIX_PATH}/components/data-entry/upload`,
      //       title: 'sidenav.components.dataEntry.upload',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //   ]
      // },
      // {
      //   key: 'components-data-display',
      //   path: `${APP_PREFIX_PATH}/components/data-display`,
      //   title: 'sidenav.components.dataDisplay',
      //   icon: DesktopOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'components-data-display-avatar',
      //       path: `${APP_PREFIX_PATH}/components/data-display/avatar`,
      //       title: 'sidenav.components.dataDisplay.avatar',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-badge',
      //       path: `${APP_PREFIX_PATH}/components/data-display/badge`,
      //       title: 'sidenav.components.dataDisplay.badge',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-comment',
      //       path: `${APP_PREFIX_PATH}/components/data-display/comment`,
      //       title: 'sidenav.components.dataDisplay.comment',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-collapse',
      //       path: `${APP_PREFIX_PATH}/components/data-display/collapse`,
      //       title: 'sidenav.components.dataDisplay.collapse',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-carousel',
      //       path: `${APP_PREFIX_PATH}/components/data-display/carousel`,
      //       title: 'sidenav.components.dataDisplay.carousel',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-card',
      //       path: `${APP_PREFIX_PATH}/components/data-display/card`,
      //       title: 'sidenav.components.dataDisplay.card',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-calendar',
      //       path: `${APP_PREFIX_PATH}/components/data-display/calendar`,
      //       title: 'sidenav.components.dataDisplay.calendar',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-descriptions',
      //       path: `${APP_PREFIX_PATH}/components/data-display/descriptions`,
      //       title: 'sidenav.components.dataDisplay.descriptions',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-empty',
      //       path: `${APP_PREFIX_PATH}/components/data-display/empty`,
      //       title: 'sidenav.components.dataDisplay.empty',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-list',
      //       path: `${APP_PREFIX_PATH}/components/data-display/list`,
      //       title: 'sidenav.components.dataDisplay.list',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-popover',
      //       path: `${APP_PREFIX_PATH}/components/data-display/popover`,
      //       title: 'sidenav.components.dataDisplay.popover',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-statistic',
      //       path: `${APP_PREFIX_PATH}/components/data-display/statistic`,
      //       title: 'sidenav.components.dataDisplay.statistic',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-tree',
      //       path: `${APP_PREFIX_PATH}/components/data-display/tree`,
      //       title: 'sidenav.components.dataDisplay.tree',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-tooltip',
      //       path: `${APP_PREFIX_PATH}/components/data-display/tooltip`,
      //       title: 'sidenav.components.dataDisplay.tooltip',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-timeline',
      //       path: `${APP_PREFIX_PATH}/components/data-display/timeline`,
      //       title: 'sidenav.components.dataDisplay.timeline',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-tag',
      //       path: `${APP_PREFIX_PATH}/components/data-display/tag`,
      //       title: 'sidenav.components.dataDisplay.tag',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-tabs',
      //       path: `${APP_PREFIX_PATH}/components/data-display/tabs`,
      //       title: 'sidenav.components.dataDisplay.tabs',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-data-display-table',
      //       path: `${APP_PREFIX_PATH}/components/data-display/table`,
      //       title: 'sidenav.components.dataDisplay.table',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //   ]
      // },
      // {
      //   key: 'components-feedback',
      //   path: `${APP_PREFIX_PATH}/components/feedback`,
      //   title: 'sidenav.components.feedback',
      //   icon: CommentOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'components-feedback-alert',
      //       path: `${APP_PREFIX_PATH}/components/feedback/alert`,
      //       title: 'sidenav.components.feedback.alert',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-drawer',
      //       path: `${APP_PREFIX_PATH}/components/feedback/drawer`,
      //       title: 'sidenav.components.feedback.drawer',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-modal',
      //       path: `${APP_PREFIX_PATH}/components/feedback/modal`,
      //       title: 'sidenav.components.feedback.modal',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-message',
      //       path: `${APP_PREFIX_PATH}/components/feedback/message`,
      //       title: 'sidenav.components.feedback.message',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-notification',
      //       path: `${APP_PREFIX_PATH}/components/feedback/notification`,
      //       title: 'sidenav.components.feedback.notification',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-progress',
      //       path: `${APP_PREFIX_PATH}/components/feedback/progress`,
      //       title: 'sidenav.components.feedback.progress',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-popconfirm',
      //       path: `${APP_PREFIX_PATH}/components/feedback/popconfirm`,
      //       title: 'sidenav.components.feedback.popconfirm',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-result',
      //       path: `${APP_PREFIX_PATH}/components/feedback/result`,
      //       title: 'sidenav.components.feedback.result',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-spin',
      //       path: `${APP_PREFIX_PATH}/components/feedback/spin`,
      //       title: 'sidenav.components.feedback.spin',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-feedback-skeleton',
      //       path: `${APP_PREFIX_PATH}/components/feedback/skeleton`,
      //       title: 'sidenav.components.feedback.skeleton',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     }
      //   ]
      // },
      // {
      //   key: 'components-other',
      //   path: `${APP_PREFIX_PATH}/components/other`,
      //   title: 'sidenav.components.other',
      //   icon: RobotOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'components-other-anchor',
      //       path: `${APP_PREFIX_PATH}/components/other/anchor`,
      //       title: 'sidenav.components.other.anchor',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-other-backtop',
      //       path: `${APP_PREFIX_PATH}/components/other/backtop`,
      //       title: 'sidenav.components.other.backtop',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-other-config-provider',
      //       path: `${APP_PREFIX_PATH}/components/other/config-provider`,
      //       title: 'sidenav.components.other.configProvider',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-other-divider',
      //       path: `${APP_PREFIX_PATH}/components/other/divider`,
      //       title: 'sidenav.components.other.divider',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     }
      //   ]
      // },
      // {
      //   key: 'components-charts',
      //   path: `${APP_PREFIX_PATH}/components/charts`,
      //   title: 'sidenav.charts',
      //   icon: PieChartOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'components-charts-apex',
      //       path: `${APP_PREFIX_PATH}/components/charts/apex-charts`,
      //       title: 'sidenav.charts.apex',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-charts-chartjs',
      //       path: `${APP_PREFIX_PATH}/components/charts/chartjs`,
      //       title: 'sidenav.charts.chartjs',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     }
      //   ]
      // },
      // {
      //   key: 'components-maps',
      //   path: `${APP_PREFIX_PATH}/components/maps`,
      //   title: 'sidenav.maps',
      //   icon: EnvironmentOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'components-maps-google',
      //       path: `${APP_PREFIX_PATH}/components/maps/google-map`,
      //       title: 'sidenav.maps.google',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-maps-simple',
      //       path: `${APP_PREFIX_PATH}/components/maps/simple-map`,
      //       title: 'sidenav.maps.simple',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     }
      //   ]
      // }
    ]
  },
  {
    key: 'chat',
    path: `${APP_PREFIX_PATH}/chat`,
    title: 'sidenav.apps.chat',
    icon: MessageOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'chat',
        path: `${APP_PREFIX_PATH}/chat`,
        title: 'sidenav.apps.chat.default',
        icon: MessageOutlined,
        breadcrumb: false,
        submenu: [],
        badgeCount: true
      },
    ]}
]



const navigationConfig = [
  ...dashBoardNavTree,
  ...componentsNavTree,
  
  
]

export default navigationConfig;
