// ── Product Types ──
export interface ProductVariant {
  name: string;
  image: string;
  gallery: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "Sale" | "New";
  description: string;
  slug: string;
  tags: string[];
  gallery: string[];
  videos: string[];
  purchaseLink?: string;
  variantType?: string;
  variants?: ProductVariant[];
  featured: boolean;
}

// ── Blog Types ──
export interface Blog {
  id: number;
  slug: string;
  category: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

// ── Homepage / Navigation Types ──
export interface NavLink {
  name: string;
  href: string;
}

export interface HeroSlide {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  bgColor: string;
}

export interface CategoryItem {
  name: string;
  count: number;
  image: string;
}

export interface OurPicksData {
  title: string;
  categories: CategoryItem[];
}

export interface Promotion {
  badge: string;
  image: string;
  href: string;
  bgColor: string;
}

export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface DiscoveryItem {
  title: string;
  linkText: string;
  href: string;
  image: string;
}

export interface DiscoveryData {
  title: string;
  items: DiscoveryItem[];
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterData {
  newsletter: {
    title: string;
    subtitle: string;
  };
  sections: FooterSection[];
  socials: SocialLink[];
}

// ── About Page Types ──
export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutImages {
  main: string;
  secondary: string;
}

export interface AboutHero {
  title: string;
  description: string;
  stats: AboutStat[];
  images: AboutImages;
}

export interface AboutMission {
  title: string;
  description: string;
  images: {
    main: string;
    floating: string;
  };
}

export interface AboutData {
  hero: AboutHero;
  mission: AboutMission;
}

// ── Contact Page Types ──
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface ContactHeader {
  title: string;
  breadcrumb: BreadcrumbItem[];
}

export interface Address {
  line1: string;
  line2: string;
}

export interface ContactInfo {
  mobile: string;
  hotline: string;
  email: string;
}

export interface ContactData {
  header: ContactHeader;
  info: {
    addresses: Address[];
    contact: ContactInfo;
  };
}

// ── Legal / FAQ Types ──
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  items: FAQItem[];
}

export interface LegalContentItem {
  heading: string;
  text: string;
}

export interface LegalSection {
  title: string;
  lastUpdated: string;
  content: LegalContentItem[];
}

export interface LegalData {
  faq: FAQSection;
  privacy: LegalSection;
  terms: LegalSection;
}
