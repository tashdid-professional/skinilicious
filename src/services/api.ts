import { products as mockProducts } from "@/public/datas/products";
import { blogs as mockBlogs } from "@/public/datas/blogs";
import {
  heroSlides as mockHeroSlides,
  navLinks as mockNavLinks,
  topBannerData as mockTopBanner,
  siteName as mockSiteName,
  featuredProductsData as mockFeaturedProductsData,
  ourPicksData as mockOurPicksData,
  promotionsData as mockPromotions,
  featuresData as mockFeatures,
  discoveryData as mockDiscovery,
  footerData as mockFooter,
} from "@/public/datas/homepage";
import { aboutData as mockAbout } from "@/public/datas/about";
import { contactData as mockContact } from "@/public/datas/contact";
import { legalData as mockLegal } from "@/public/datas/legal";

import type {
  Product,
  Blog,
  HeroSlide,
  NavLink,
  OurPicksData,
  Promotion,
  Feature,
  DiscoveryData,
  FooterData,
  AboutData,
  ContactData,
  LegalData,
} from "@/src/types";

const API = process.env.NEXT_PUBLIC_API_URL;

// ── Products ──

export async function getProducts(): Promise<Product[]> {
  // TODO: Replace with real API call
  // const res = await fetch(`${API}/products`);
  // if (!res.ok) throw new Error("Failed to fetch products");
  // return res.json();
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // TODO: Replace with real API call
  // const res = await fetch(`${API}/products?slug=${slug}`);
  // if (!res.ok) throw new Error("Failed to fetch product");
  // const data = await res.json();
  // return data[0] ?? null;
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

// ── Blogs ──

export async function getBlogs(): Promise<Blog[]> {
  // TODO: Replace with real API call
  // const res = await fetch(`${API}/blogs`);
  // if (!res.ok) throw new Error("Failed to fetch blogs");
  // return res.json();
  return mockBlogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  // TODO: Replace with real API call
  // const res = await fetch(`${API}/blogs?slug=${slug}`);
  // if (!res.ok) throw new Error("Failed to fetch blog");
  // const data = await res.json();
  // return data[0] ?? null;
  return mockBlogs.find((b) => b.slug === slug) ?? null;
}

// ── Homepage Sections ──

export async function getHeroSlides(): Promise<HeroSlide[]> {
  // TODO: const res = await fetch(`${API}/homepage/hero-slides`);
  // if (!res.ok) throw new Error("Failed to fetch hero slides");
  // return res.json();
  return mockHeroSlides;
}

export async function getNavLinks(): Promise<NavLink[]> {
  // TODO: const res = await fetch(`${API}/navigation`);
  // if (!res.ok) throw new Error("Failed to fetch nav links");
  // return res.json();
  return mockNavLinks;
}

export async function getTopBannerData(): Promise<string> {
  // TODO: const res = await fetch(`${API}/homepage/top-banner`);
  // if (!res.ok) throw new Error("Failed to fetch top banner");
  // const data = await res.json();
  // return data.text;
  return mockTopBanner;
}

export async function getSiteName(): Promise<string> {
  // TODO: const res = await fetch(`${API}/site-name`);
  // if (!res.ok) throw new Error("Failed to fetch site name");
  // const data = await res.json();
  // return data.name;
  return mockSiteName;
}

export async function getFeaturedProductsMeta(): Promise<{ title: string; subtitle: string }> {
  // TODO: const res = await fetch(`${API}/homepage/featured-products-meta`);
  // if (!res.ok) throw new Error("Failed to fetch featured products meta");
  // return res.json();
  return mockFeaturedProductsData;
}

export async function getOurPicksData(): Promise<OurPicksData> {
  // TODO: const res = await fetch(`${API}/homepage/our-picks`);
  // if (!res.ok) throw new Error("Failed to fetch our picks");
  // return res.json();
  return mockOurPicksData;
}

export async function getPromotionsData(): Promise<Promotion[]> {
  // TODO: const res = await fetch(`${API}/homepage/promotions`);
  // if (!res.ok) throw new Error("Failed to fetch promotions");
  // return res.json();
  return mockPromotions;
}

export async function getFeaturesData(): Promise<Feature[]> {
  // TODO: const res = await fetch(`${API}/homepage/features`);
  // if (!res.ok) throw new Error("Failed to fetch features");
  // return res.json();
  return mockFeatures;
}

export async function getDiscoveryData(): Promise<DiscoveryData> {
  // TODO: const res = await fetch(`${API}/homepage/discovery`);
  // if (!res.ok) throw new Error("Failed to fetch discovery data");
  // return res.json();
  return mockDiscovery;
}

export async function getFooterData(): Promise<FooterData> {
  // TODO: const res = await fetch(`${API}/homepage/footer`);
  // if (!res.ok) throw new Error("Failed to fetch footer data");
  // return res.json();
  return mockFooter;
}

// ── Static Pages ──

export async function getAboutData(): Promise<AboutData> {
  // TODO: const res = await fetch(`${API}/pages/about`);
  // if (!res.ok) throw new Error("Failed to fetch about page data");
  // return res.json();
  return mockAbout;
}

export async function getContactData(): Promise<ContactData> {
  // TODO: const res = await fetch(`${API}/pages/contact`);
  // if (!res.ok) throw new Error("Failed to fetch contact page data");
  // return res.json();
  return mockContact;
}

export async function getLegalData(): Promise<LegalData> {
  // TODO: const res = await fetch(`${API}/pages/legal`);
  // if (!res.ok) throw new Error("Failed to fetch legal data");
  // return res.json();
  return mockLegal;
}
