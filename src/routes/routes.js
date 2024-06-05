const routers = [
  {
    component: 'AuthLayout',
    path: '/',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'LoginPage',
        path: '/',
        auth: false,
        exact: true
      },
      {
        component: 'ForgotPasswordPage',
        path: '/forgot-password',
        auth: false,
        exact: true
      }
    ]
  },

  {
    component: 'Adminlayout',
    path: 'home',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'HomePage',
        path: '/',
        auth: false,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/lead',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'LeadPage',
        path: '',
        auth: false,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/user',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'UserPage',
        path: '',
        auth: false,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/course',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'CoursePage',
        path: '',
        auth: false,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/batch',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'BatchPage',
        path: '',
        auth: false,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/candidate',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'CandidatePage',
        path: '',
        auth: false,
        exact: true
      }
    ]
  }

  //   dev layout

  // {
  //   component: 'Adminlayout',
  //   path: '/devLayout',
  //   redirect: '/devLayout/components/',
  //   auth: false,
  //   exact: false,
  //   childrens: [
  //     {
  //       component: 'commonComponentsExample',
  //       path: '/',
  //       auth: false,
  //       exact: true
  //     }
  //   ]
  // }
];
export default routers;
