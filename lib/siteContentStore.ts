import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  color: string;
  iconName: string;
  isActive: boolean;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  client: string;
  desc: string;
  color: string;
  isActive: boolean;
}

export interface SiteContent {
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    headline3: string;
    description: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    statNumber: string;
    statLabel: string;
  };
  stats: {
    projectsCompleted: number;
    happyClients: number;
    yearsExperience: number;
    servicesOffered: number;
  };
  contact: {
    phone: string;
    email: string;
    location: string;
    whatsappNumber: string;
  };
  services: ServiceItem[];
  projects: ProjectItem[];
}

const defaultContent: SiteContent = {
  hero: {
    badge: "Pune's Trusted Digital Partner",
    headline1: "Your Vision",
    headline2: "Our Technology",
    headline3: "Your Growth",
    description:
      "We help businesses build their online presence, grow their brand and achieve their goals with smart digital solutions.",
    ctaPrimaryText: "Get Free Consultation",
    ctaSecondaryText: "View Our Work",
    statNumber: "150+",
    statLabel: "Projects Delivered",
  },
  stats: {
    projectsCompleted: 150,
    happyClients: 100,
    yearsExperience: 5,
    servicesOffered: 11,
  },
  contact: {
    phone: "9307696221",
    email: "sksoftech2026@gmail.com",
    location: "Pune, Maharashtra, India",
    whatsappNumber: "919307696221",
  },
  services: [
    {
      id: 1,
      title: "Website Development",
      desc: "Business websites, E-Commerce, Landing Pages & Portfolio sites that convert visitors into customers.",
      color: "#1E6FFF",
      iconName: "Monitor",
      isActive: true,
    },
    {
      id: 2,
      title: "Software Development",
      desc: "Custom software solutions, web apps and tailored technology to streamline your business.",
      color: "#7C3AED",
      iconName: "Code2",
      isActive: true,
    },
    {
      id: 3,
      title: "Mobile App Development",
      desc: "Android, iOS and cross-platform apps built for performance, scalability and great UX.",
      color: "#059669",
      iconName: "Smartphone",
      isActive: true,
    },
    {
      id: 4,
      title: "Digital Marketing",
      desc: "Google Ads, Meta Ads, content marketing, email campaigns and lead generation strategies.",
      color: "#DC2626",
      iconName: "TrendingUp",
      isActive: true,
    },
    {
      id: 5,
      title: "SEO",
      desc: "Rank higher on Google, drive more traffic and stay ahead of your competitors.",
      color: "#D97706",
      iconName: "Search",
      isActive: true,
    },
    {
      id: 6,
      title: "Social Media Marketing",
      desc: "Build your brand across Facebook, Instagram, YouTube, LinkedIn and X (Twitter).",
      color: "#0284C7",
      iconName: "Share2",
      isActive: true,
    },
    {
      id: 7,
      title: "Graphic Design & Branding",
      desc: "Logos, banners, posters, social media creatives and complete UI/UX design.",
      color: "#EC4899",
      iconName: "Palette",
      isActive: true,
    },
    {
      id: 8,
      title: "Video Editing & Content",
      desc: "Engaging video content for YouTube, Instagram Reels and brand storytelling.",
      color: "#7C3AED",
      iconName: "Video",
      isActive: true,
    },
    {
      id: 9,
      title: "Custom Printing",
      desc: "T-Shirts, mugs, caps, gifts and corporate wear with your brand identity.",
      color: "#065F46",
      iconName: "Printer",
      isActive: true,
    },
    {
      id: 10,
      title: "IT Support & Maintenance",
      desc: "Website maintenance, technical support, domain & hosting management.",
      color: "#1E6FFF",
      iconName: "Settings",
      isActive: true,
    },
    {
      id: 11,
      title: "Digital Media Services",
      desc: "From ideas to visuals — photography, digital content and brand storytelling.",
      color: "#B45309",
      iconName: "Camera",
      isActive: true,
    },
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web",
      client: "RetailBiz",
      desc: "Full-stack e-commerce with payment gateway and admin panel.",
      color: "#1E6FFF",
      isActive: true,
    },
    {
      id: 2,
      title: "Food Delivery App",
      category: "Mobile",
      client: "QuickEats",
      desc: "Android & iOS app with real-time order tracking.",
      color: "#7C3AED",
      isActive: true,
    },
    {
      id: 3,
      title: "Brand Identity Design",
      category: "Design",
      client: "StartupCo",
      desc: "Complete brand identity — logo, colors, typography & guidelines.",
      color: "#EC4899",
      isActive: true,
    },
    {
      id: 4,
      title: "Google Ads Campaign",
      category: "Marketing",
      client: "LocalStore",
      desc: "3x ROI achieved through targeted Google Ads campaigns.",
      color: "#059669",
      isActive: true,
    },
    {
      id: 5,
      title: "Corporate Website",
      category: "Web",
      client: "TechFirm",
      desc: "Modern, SEO-optimized corporate website with CMS.",
      color: "#D97706",
      isActive: true,
    },
    {
      id: 6,
      title: "Social Media Growth",
      category: "Marketing",
      client: "FashionBrand",
      desc: "10x Instagram follower growth in 3 months.",
      color: "#DC2626",
      isActive: true,
    },
  ],
};

const FILE_PATH = path.join(DATA_DIR, "site_content.json");

export function getSiteContent(): SiteContent {
  ensureDirectoryExists();
  try {
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, "utf-8");
      return JSON.parse(data) as SiteContent;
    }
  } catch (err) {
    console.error("Error reading site_content.json:", err);
  }
  // Initialize with default
  fs.writeFileSync(FILE_PATH, JSON.stringify(defaultContent, null, 2), "utf-8");
  return defaultContent;
}

export function saveSiteContent(newContent: SiteContent): SiteContent {
  ensureDirectoryExists();
  fs.writeFileSync(FILE_PATH, JSON.stringify(newContent, null, 2), "utf-8");
  return newContent;
}
