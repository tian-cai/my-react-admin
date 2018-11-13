const menu = [
  {
    text: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard',
    role: ["admin", "guest"]
  },
  {
    text: 'UI积累',
    icon: 'bars',
    role: ["admin", "guest"],
    children: [
      {
        text: '富文本编辑器',
        icon: 'edit',
        link: '/ui/editor',
        role: ["admin", "guest"]
      },
      {
        text: '表格',
        icon: 'table',
        link: '/ui/table',
        role: ["admin", "guest"]
      },
      {
        text: '拖拽',
        icon: 'drag',
        link: '/ui/drag',
        role: ["admin", "guest"]
      },
      {
        text: '图表',
        icon: 'line-chart',
        link: '/ui/chart',
        role: ["admin", "guest"]
      },
    ]
  },
  {
    text: '权限管理',
    icon: 'lock',
    role: ["admin", "guest"],
    children: [
      {
        text: '超管页面',
        icon: 'key',
        link: '/role/admin',
        role: ["admin"]
      },
      {
        text: '游客页面',
        icon: 'unlock',
        link: '/role/guest',
        role: ["admin", "guest"]
      },
    ]
  }
]
export default menu