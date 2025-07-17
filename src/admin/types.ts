export interface HeroData {
  id?: number;
  title: string;
  subtitle: string;
  atelierTitle?: string;
  atelierDescription?: string;
  banner?: {
    logoSize: {
      scale: number;
      unit: string;
    };
    titleSize: {
      scale: number;
      unit: string;
    };
  };
  backgroundImages: {
    image: string;
    alt: string;
    transform?: {
      scale: number;
      translateX: number;
      translateY: number;
      flip: boolean;
    };
  }[];
  polaroids: {
    image: string;
    alt: string;
    rotation: number;
    position: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
  }[];
  bannerHeight?: {
    min: number;
    preferred: number;
    max: number;
  };
}

export interface WorkProject {
  id: number;
  title: string;
  client: string;
  category: string;
  year: number;
  image: string;
  src?: string;
  alt?: string;
  description?: string;
  stylist?: string;
  photographer?: string;
  left?: number;
  top?: number;
  side?: string;
}

export interface WorkData {
  banner: {
    backgroundImage: {
      desktop: string;
      mobile: string;
    };
    title: string;
    subtitle: string;
    transform?: {
      scale: number;
      translateX: number;
      translateY: number;
      objectPosition: string;
    };
  };
  sectionBanners: {
    id: number;
    image: string;
    alt: string;
    category: string;
    title: string;
    transform: {
      scale: number;
      translateX: number;
      translateY: number;
      objectPosition: string;
    };
  }[];
  projects: WorkProject[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  category?: string;
}

export interface FAQData {
  id: number;
  banner: {
    backgroundImage: {
      desktop: string;
      mobile: string;
    };
    height: string;
    objectPosition: string;
    transform?: {
      scale: number;
      translateX: number;
      translateY: number;
    };
  };
  items: FAQItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  alignment: 'left' | 'right';
  order: number;
  transform: {
    scale: number;
    translateX: number;
    translateY: number;
    objectPosition: string;
  };
}

export interface ProcessData {
  id: number;
  banner: {
    title: string;
    subtitle: string;
    desktopImage: string;
    mobileImage: string;
    transform: {
      scale: number;
      translateX: number;
      translateY: number;
      flip: boolean;
    };
    circleScale: number;
    headingScale: {
      mobile: number;
      desktop: number;
    };
  };
  teamCircles: {
    size: number;
    strokeWidth: number;
    gap: number;
    position: {
      top: string;
      left?: string;
    };
  };
  processSteps: ProcessStep[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactLocation extends Location {
  email: string;
}

export interface ContactData {
  id: number;
  emails: {
    brooklyn: string;
    beverlyHills: string;
    press: string;
  };
  phone: string;
  locations: ContactLocation[];
}

export interface StoryItem {
  id: number;
  type: 'polaroid' | 'text' | 'button';
  content: {
    image?: string;
    alt?: string;
    year?: string;
    text?: string;
    font?: string;
    action?: string;
  };
  position: {
    desktop: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      transform?: string;
      display?: string;
    };
    mobile: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      transform?: string;
      display?: string;
    };
  };
  rotation?: {
    desktop?: number;
    mobile?: number;
  };
  fontSize?: {
    desktop: string;
    mobile: string;
  };
  visibility: {
    desktop: boolean;
    mobile: boolean;
  };
}

export interface StoryCircle {
  id: number;
  name: string;
  type: 'simple' | 'dashed_rotating' | 'mixed';
  position: {
    desktop: {
      marginTop: string;
      marginLeft: string;
      justifyContent: string;
    };
    mobile: {
      marginTop: string;
      marginLeft: string;
      justifyContent: string;
    };
  };
  size: {
    desktop: {
      width: string;
      height: string;
    };
    mobile: {
      width: string;
      height: string;
    };
  };
  content: {
    title: string;
    description: string;
  };
  items: StoryItem[];
}

export interface StoryData {
  id: number;
  circles: StoryCircle[];
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  image: string;
  imageAlt: string;
  mapsUrl: string;
  variant: 'left' | 'right';
  order: number;
}

export interface LocationsData {
  id: number;
  banner: {
    title: string;
    animationSettings: {
      animationDelay: number;
      transitionDuration: number;
      circleCount: number;
    };
  };
  locations: Location[];
  createdAt: string;
  updatedAt: string;
}