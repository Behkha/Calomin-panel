/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views

    // folder should has slash '/'

    folder: '',
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    folder: '',
    view: 'UserProfile'
  },
  {
    path: '',
    folder: '',
    view:'LoginPage'
  }
  ,
  {
    path: '/users',
    folder: '',
    view:'TaskList'
  },
  {
    path: '/admin/create',
    folder: '',
    view:'AddAdmin'
  }
  ,
  {
      path: '/users/create',
      folder: '',
      view:'AddUser'
  },
  {
      path: '/task',
      folder: '',
      view:'AddTask'
  }
]
