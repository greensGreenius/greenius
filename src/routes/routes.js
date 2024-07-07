const routers = [
  {
    component: 'AuthLayout',
    path: '/',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'WhoIam',
        path: '/',
        auth: false,
        exact: true
      },
      {
        component: 'LoginPage',
        path: '/tenant',
        auth: false,
        exact: true
      },
      {
        component: 'LearnerLoginPage',
        path: '/learner',
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
    path: '/home',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'HomePage',
        path: '/',
        auth: true,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/myCourse',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'MyCourseListPage',
        path: '/',
        auth: true,
        exact: true
      },
      {
        component: 'MyCourseDetailPage',
        path: '/detail',
        auth: true,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/lead',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'LeadPage',
        path: '',
        auth: true,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/user',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'UserPage',
        path: '',
        auth: true,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/profile',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'ProfilePage',
        path: '',
        auth: true,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/course',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'CoursePage',
        path: '',
        auth: true,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/batch',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'BatchPage',
        path: '',
        auth: true,
        exact: true
      },
      {
        component: 'MyCourseListPage',
        path: 'recording/:batchId',
        auth: true,
        exact: true
      },
      {
        component: 'BatchDetailPage',
        path: '/:batchId',
        auth: true,
        exact: true
      }
    ]
  },
  {
    component: 'Adminlayout',
    path: '/candidate',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'CandidatePage',
        path: '',
        auth: true,
        exact: true
      },
      {
        component: 'CandidateFormPage',
        path: '/:candidateId',
        auth: true,
        exact: true
      }
    ]
  }

  //   dev layout

  // {
  //   component: 'Adminlayout',
  //   path: '/devLayout',
  //   redirect: '/devLayout/components/',
  //    auth: true,
  //   exact: false,
  //   childrens: [
  //     {
  //       component: 'commonComponentsExample',
  //       path: '/',
  //        auth: true,
  //       exact: true
  //     }
  //   ]
  // }
];
export default routers;
