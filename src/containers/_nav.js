export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Staff',
        route: '/staff',
        icon: 'cil-user',
        items: [
          {
            name: 'Manage Staff',
            to: '/staff/staff'
          },
          {
            name: 'View Staff',
            to: '/staff/view_staff'
          },
        
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Users',        
        route: '/users',
        icon: 'cil-user',
        items: [
          {
            name: 'Manage Users',
            to: '/users/users'
          },
          {
            name: 'View Users',
            to: '/users/view_users'
          },
        
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Business',        
        route: '/business',
        icon: 'cil-user',
        items: [
          {
            name: 'Manage Business',
            to: '/business/business'
          },
          {
            name: 'View Business',
            to: '/business/view_business'
          },
        
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Complaints',        
        route: '/complaints',
        icon: 'cil-file',
        CBadge: [{color:'success', class:'mfs-auto', value:5}],
        items: [
          {
            name: 'Manage Complaints',
            to: '/complaints/complaints'
          },
          {
            name: 'My Complaints',
            to: '/complaints/view_complaints'
          },
          {
            name: 'All Complaints',
            to: '/complaints/allcomplaints'
          },
        
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Reports',
        to: '/reports',
        icon: 'cil-file',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Audits',
        to: '/audits',
        icon: 'cil-file',
      },
    ]
  }
]