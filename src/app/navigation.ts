export type NavItem = {
  label: string
  path: string
  icon?: string
  badge?: string
  description?: string
  children?: NavItem[]
}

export type NavGroup = {
  title: string
  items: NavItem[]
}

export type ModuleNav = {
  id: string
  name: string
  description: string
  icon?: string
  accent?: string
  groups: NavGroup[]
}

const dashboardRoot = '/dashboard'

const pathFor = (moduleId: string, slug = '') => {
  if (!moduleId) return dashboardRoot
  return `${dashboardRoot}/${moduleId}${slug ? `/${slug.replace(/^\//, '')}` : ''}`
}

export const modulesNavigation: ModuleNav[] = [
  {
    id: 'master',
    name: 'Master',
    description: 'Master data management for products, vendors, and customers.',
    icon: '🧭',
    accent: '#5c7cfa',
    groups: [
      {
        title: 'Overview',
        items: [
          { label: 'Summary', path: pathFor('master', 'overview'), icon: '📊' },
          { label: 'Audit Trail', path: pathFor('master', 'audit'), icon: '🧾' },
        ],
      },
      {
        title: 'Catalog',
        items: [
          { label: 'Products', path: pathFor('master', 'products'), icon: '📦' },
          { label: 'Categories', path: pathFor('master', 'categories'), icon: '🗂️' },
          { label: 'Vendors', path: pathFor('master', 'vendors'), icon: '🏭' },
          { label: 'Customers', path: pathFor('master', 'customers'), icon: '👥' },
        ],
      },
      {
        title: 'Governance',
        items: [
          { label: 'Rules', path: pathFor('master', 'rules'), icon: '⚖️' },
          { label: 'Quality', path: pathFor('master', 'quality'), icon: '✅' },
        ],
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Creative workflows, briefs, assets, and approvals for design teams.',
    icon: '🎨',
    accent: '#f59e0b',
    groups: [
      {
        title: 'Workflows',
        items: [
          { label: 'Briefs', path: pathFor('design', 'briefs'), icon: '📝' },
          { label: 'Sprints', path: pathFor('design', 'sprints'), icon: '⏱️' },
          { label: 'Approvals', path: pathFor('design', 'approvals'), icon: '✅' },
        ],
      },
      {
        title: 'Assets',
        items: [
          { label: 'Libraries', path: pathFor('design', 'libraries'), icon: '📚' },
          { label: 'Components', path: pathFor('design', 'components'), icon: '🧩' },
          { label: 'Brand Kits', path: pathFor('design', 'brand-kits'), icon: '🎯' },
        ],
      },
    ],
  },
  {
    id: 'production',
    name: 'Production',
    description: 'Track manufacturing orders, shop floor activity, and QC.',
    icon: '🏭',
    accent: '#22c55e',
    groups: [
      {
        title: 'Execution',
        items: [
          { label: 'Orders', path: pathFor('production', 'orders'), icon: '📦' },
          { label: 'Work Centers', path: pathFor('production', 'work-centers'), icon: '🛠️' },
          { label: 'Scheduling', path: pathFor('production', 'schedule'), icon: '📅' },
        ],
      },
      {
        title: 'Quality',
        items: [
          { label: 'Inspections', path: pathFor('production', 'inspections'), icon: '🔍' },
          { label: 'Non-Conformance', path: pathFor('production', 'nc'), icon: '⚠️' },
          { label: 'Reporting', path: pathFor('production', 'reports'), icon: '📈' },
        ],
      },
    ],
  },
]

export const indexNavGroups: NavGroup[] = [
  {
    title: 'Modules',
    items: [
      {
        label: 'Branch Management',
        path: '/dashboard/branch-management',
        icon: '🏢',
        description: 'Manage branches and users',
        children: [
          {
            label: 'Users',
            path: pathFor('users'),
            icon: '👥',
            description: 'View and manage users',
          },
        ],
      },
      ...modulesNavigation.map((module) => ({
        label: module.name,
        path: pathFor(module.id),
        icon: module.icon,
        description: module.description,
      })),
    ],
  },
]

export const getModuleNav = (moduleId?: string) =>
  modulesNavigation.find((module) => module.id.toLowerCase() === (moduleId ?? '').toLowerCase())

export const modulePath = pathFor
