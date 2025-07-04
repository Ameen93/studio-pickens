// Studio Pickens Constants

export const CONTACT_INFO = {
  phone: '+1 (555) 123-4567',
  email: 'hello@studiopickens.com',
  address: {
    brooklyn: {
      street: '123 Creative Ave',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11201'
    },
    beverly_hills: {
      street: '456 Studio Blvd',
      city: 'Beverly Hills',
      state: 'CA', 
      zip: '90210'
    },
    london: {
      street: '789 Design St',
      city: 'London',
      country: 'UK',
      postcode: 'SW1A 1AA'
    }
  }
};

export const NAVIGATION_LINKS = {
  left: [
    { name: 'WORK', href: '/work' },
    { name: 'PROCESS', href: '/process' },
    { name: 'STORY', href: '/story' }
  ],
  right: [
    { name: 'LOCATIONS', href: '/locations' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ],
  // All links combined for footer use
  all: [
    { name: 'WORK', href: '/work' },
    { name: 'PROCESS', href: '/process' },
    { name: 'STORY', href: '/story' },
    { name: 'LOCATIONS', href: '/locations' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ]
};

export const HERO_IMAGES = [
  `${process.env.PUBLIC_URL}/images/hero/background1.jpg`,
  `${process.env.PUBLIC_URL}/images/hero/background2.jpg`
];

export const POLAROID_IMAGES = [
  `${process.env.PUBLIC_URL}/images/polaroids/polaroid1.png`,
  `${process.env.PUBLIC_URL}/images/polaroids/polaroid2.png`, 
  `${process.env.PUBLIC_URL}/images/polaroids/polaroid3.png`
];

export const LOGO_IMAGES = {
  default: `${process.env.PUBLIC_URL}/images/hero/Studio Pickens Logo.png`,
  white: `${process.env.PUBLIC_URL}/images/hero/Studio Pickens Logo - white.png`
};

export const RESPONSIVE_BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px', 
  desktop: '1024px',
  xl: '1280px'
};

export const WORK_PROJECTS = [
  {
    id: 1,
    src: `${process.env.PUBLIC_URL}/images/work/editorial.jpg`,
    alt: 'Editorial photo',
    left: 132,
    top: 0,
    category: 'EDITORIAL',
    side: 'left'
  },
  {
    id: 2,
    src: `${process.env.PUBLIC_URL}/images/work/concert.jpg`,
    alt: 'Concert photo',
    left: 396,
    top: 400,
    category: 'CONCERT',
    side: 'center'
  },
  {
    id: 3,
    src: `${process.env.PUBLIC_URL}/images/work/filmandtv.jpg`,
    alt: 'Film and TV photo',
    left: 625,
    top: 800,
    category: 'FILM & TV',
    side: 'right'
  },
  {
    id: 4,
    src: `${process.env.PUBLIC_URL}/images/work/editorial2.png`,
    alt: 'Editorial photo 2',
    left: 132,
    top: 1200,
    category: 'EDITORIAL',
    side: 'left'
  },
  {
    id: 5,
    src: `${process.env.PUBLIC_URL}/images/work/theatre.png`,
    alt: 'Theatre photo',
    left: 625,
    top: 1600,
    category: 'THEATRE',
    side: 'right'
  },
  {
    id: 6,
    src: `${process.env.PUBLIC_URL}/images/work/musicvideo.jpg`,
    alt: 'Music video photo',
    left: 396,
    top: 2000,
    category: 'MUSIC VIDEO',
    side: 'center'
  },
  {
    id: 7,
    src: `${process.env.PUBLIC_URL}/images/work/filmandtv2.png`,
    alt: 'Film and TV photo 2',
    left: 132,
    top: 2400,
    category: 'FILM & TV',
    side: 'left'
  },
  {
    id: 8,
    src: `${process.env.PUBLIC_URL}/images/work/editorial3.jpg`,
    alt: 'Editorial photo 3',
    left: 625,
    top: 2800,
    category: 'EDITORIAL',
    side: 'right'
  },
  {
    id: 9,
    src: `${process.env.PUBLIC_URL}/images/work/live.jpg`,
    alt: 'Live photo',
    left: 396,
    top: 3200,
    category: 'LIVE',
    side: 'center'
  }
];