import { USER_TYPE } from 'services/constants/flags';

console.log('USER_TYPE---------', USER_TYPE.ADMIN);

export const MENU = [
  {
    title: 'Home',
    icon: 'home',
    link: '/home',
    isShow: true,
    // USER_TYPE
    userType: [USER_TYPE?.SUPPER_ADMIN, USER_TYPE?.ADMIN, USER_TYPE?.TRAINER]
  },
  {
    title: 'Lead',
    icon: 'contact_emergency',
    link: '/lead',
    isShow: true,
    userType: [USER_TYPE.SUPPER_ADMIN, USER_TYPE.TRAINER]
  },
  {
    title: 'User',
    icon: 'person',
    link: '/user',
    isShow: true,
    userType: [USER_TYPE.SUPPER_ADMIN, USER_TYPE.TRAINER]
  },
  {
    title: 'Course',
    icon: 'account_balance',
    link: '/course',
    isShow: true,
    userType: [USER_TYPE.SUPPER_ADMIN, USER_TYPE.TRAINER]
  },
  {
    title: 'Batch',
    icon: 'developer_board',
    link: '/batch',
    isShow: true,
    userType: [USER_TYPE.SUPPER_ADMIN, USER_TYPE.TRAINER]
  },
  {
    title: 'Candidate',
    icon: 'group',
    link: '/candidate',
    isShow: true,
    userType: [USER_TYPE.SUPPER_ADMIN, USER_TYPE.TRAINER]
  },
  {
    title: 'My Course',
    icon: 'library_books',
    link: '/myCourse',
    isShow: true,
    userType: [USER_TYPE.CANDIDATE]
  },
  {
    title: 'My Profile',
    icon: 'person',
    link: '/profile',
    isShow: true,
    userType: [USER_TYPE.CANDIDATE]
  }

  // {
  //     title: "User",
  //     icon: <PersonIcon />,
  //     link:'/users',
  //     isShow: false,
  // },
  // {
  //     title: "Servicis",
  //     icon: <PersonIcon />,
  //     isShow: false,
  //     link:'/services',
  // subMenu: [
  //     {
  //         title: "Home",
  //         icon: <HomeIcon />
  //     },
  //     {
  //         title: "User",
  //         icon: <PersonIcon />
  //     }
  // ]
  // }
];
