import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Staff
const Staff = () => import('@/views/staff/Staff')
const ViewStaff = () => import('@/views/staff/view_staff')

// Views - Complaints
const Complaints = () => import('@/views/complaints/Complaints')
const ViewComplaints = () => import('@/views/complaints/view_complaints')
const AddComplaints = () => import('@/views/complaints/add_complaints')
const AllComplaints = () => import('@/views/complaints/allcomplaints')
const ComplaintsDetails = () => import('@/views/complaints/complaintdetails')

// Views - Pages
const Login = () => import('@/views/Login')
const Audits = () => import('@/views/Audits')
const Reports = () => import('@/views/Reports')
const UpdatePassword = () => import('@/views/updatepassword')
const PasswordReset = () => import('@/views/passwordreset')

// Users
const Users = () => import('@/views/users/Users')
const ViewUsers = () => import('@/views/users/view_users')
const SetPermission = () => import('@/views/users/Settings')

// Business
const Business = () => import('@/views/business/Business')
const ViewBusiness = () => import('@/views/business/view_business')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: 'login',
      name: 'Dashboard',
      component: TheContainer,
      children: [
        
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'staff',
          redirect: '/staff/staff',
          name: 'Staff',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'staff',
              name: 'Manage Staff',
              component: Staff
            },
            {
              path: 'view_staff',
              name: 'View Staff',
              component: ViewStaff
            }
          ]
        },
        {
          path: 'users',
          redirect: '/users/users',
          name: 'Users',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'users',
              name: 'Manage Users',
              component: Users
            },
            {
              path: 'view_users',
              name: 'View Users',
              component: ViewUsers
            },
            {
              path: '/settings',
              name: 'SetPermission',
              component: SetPermission
            },
          ]
        },
        {
          path: 'business',
          redirect: '/business/business',
          name: 'Business',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'business',
              name: 'Manage Business',
              component: Business
            },
            {
              path: 'view_business',
              name: 'View Business',
              component: ViewBusiness
            }
          ]
        },
        {
          path: 'complaints',
          redirect: '/complaints/complaints',
          name: 'Complaints',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'complaints',
              name: 'Record Complaints',
              component: Complaints
            },
            {
              path: 'view_complaints',
              name: 'My Compalaints',
              component: ViewComplaints
            },
            {
              path: '/add_complaints',
              name: 'Add Compalaints',
              component: AddComplaints
            },            
            {
              path: 'allcomplaints',
              name: 'All Compalaints',
              component: AllComplaints
            },
            {
              path: '/complaintdetails/:id',
              name: 'Complaint Details',
              component: ComplaintsDetails
            },
            
          ]
        },
        {
          path: '/audits',
          name: 'Audits',
          component: Audits
        },
        {
          path: '/reports',
          name: 'Reports',
          component: Reports
        },
      ]
    },
    {
      path: '/passwordreset',
      name: 'Password_Reset',
      component: PasswordReset
    },
    {
      path: '/uppassword',
      name: 'UpdatePassword',
      component: UpdatePassword
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
    
  ]
}

