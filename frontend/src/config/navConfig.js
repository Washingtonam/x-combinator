const navConfig = [
  {
    label: 'Overview',
    path: '/dashboard',
    roles: ['superadmin', 'admin', 'user'],
  },
  {
    label: 'Profile',
    path: '/dashboard/profile',
    roles: ['superadmin', 'admin', 'user'],
  },
  {
    label: 'Users',
    path: '/dashboard/users',
    roles: ['superadmin', 'admin'],
  },
  {
    label: 'Settings',
    path: '/dashboard/settings',
    roles: ['superadmin'],
  },
]

export default navConfig
