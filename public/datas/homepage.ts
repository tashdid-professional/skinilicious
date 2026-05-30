export const siteConfig = {
  name: "Skinilicious",
  topBanner: "Extra sale 30% off on all products! Limited time offer.",
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  featuredProducts: {
    title: "Our Bestsellers",
    subtitle: "Shop all products"
  },
  discovery: {
    title: "More to Discover",
    items: [
      {
        title: "Find a Store",
        linkText: "Our Store",
        href: "/stores",
        image: "https://picsum.photos/800/600?random=20"
      },
      {
        title: "From Our Blog",
        linkText: "Read More",
        href: "/blog",
        image: "https://picsum.photos/800/600?random=21"
      },
      {
        title: "Our Story",
        linkText: "View More",
        href: "/about",
        image: "https://picsum.photos/800/600?random=22"
      }
    ]
  },
  footer: {
    newsletter: {
      title: "Care for Your Skin, Care for Your Beauty",
      subtitle: "Give your inbox some love with new products, tips, & more."
    },
    sections: [
      {
        title: "About Us",
        links: [
          { name: "About Glowing", href: "/about" },
          { name: "Careers", href: "/careers" },
          { name: "Store Locations", href: "/stores" },
          { name: "Our Blog", href: "/blog" },
          { name: "Reviews", href: "/reviews" }
        ]
      },
      {
        title: "Information",
        links: [
          { name: "Start A Return", href: "/returns" },
          { name: "Contact Us", href: "/contact" },
          { name: "Shipping FAQ", href: "/faq" },
          { name: "Terms & Conditions", href: "/terms" },
          { name: "Privacy Policy", href: "/privacy" }
        ]
      }
    ],
    socials: [
      { name: "Facebook", href: "https://facebook.com", icon: "fb" },
      { name: "Instagram", href: "https://instagram.com", icon: "insta" },
      { name: "TikTok", href: "https://tiktok.com", icon: "tiktok" }
    ],
    copyright: "© Skinilicious 2026 | Powered by Skinilicious"
  }
};