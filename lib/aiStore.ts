// In-Memory dynamic store with persistent seed for Admin-managed AI FAQs and settings

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

export interface AISettings {
  enableChatbot: boolean;
  enableEstimator: boolean;
  enableResumeScreener: boolean;
  enableBlogGenerator: boolean;
  customWelcomeMessage: string;
}

let faqs: FAQItem[] = [
  {
    id: 1,
    question: "What services does SK Softech provide?",
    answer: "SK Softech provides 11+ services including Website Development (E-Commerce, Business), Mobile Apps (Android & iOS), Custom Software, Digital Marketing (Google & Meta Ads), SEO, Social Media Marketing, Graphic Design & Branding, Video Editing, Custom Printing, and IT Maintenance.",
    category: "Services",
    isActive: true,
  },
  {
    id: 2,
    question: "How much does a website cost at SK Softech?",
    answer: "Our website packages start from ₹8,000 for standard business sites and ₹25,000 to ₹60,000+ for custom dynamic portals, e-commerce, or web applications. We provide free initial consultation and customized quotes with zero hidden charges.",
    category: "Pricing",
    isActive: true,
  },
  {
    id: 3,
    question: "How long does it take to deliver a project?",
    answer: "Standard business websites are typically delivered in 1 to 2 weeks. Custom web apps and e-commerce platforms take between 3 to 6 weeks, built with rigorous testing and responsive design.",
    category: "Timeline",
    isActive: true,
  },
  {
    id: 4,
    question: "Where is SK Softech located and how can I contact you?",
    answer: "We are located in Pune, Maharashtra. You can reach our team directly at 9307696221, email us at sksoftech2026@gmail.com, or click the WhatsApp button on screen for immediate support.",
    category: "General",
    isActive: true,
  },
  {
    id: 5,
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, every website and application comes with dedicated post-launch support, server monitoring, bug fixes, and maintenance packages tailored to your business needs.",
    category: "Support",
    isActive: true,
  },
];

let aiSettings: AISettings = {
  enableChatbot: true,
  enableEstimator: true,
  enableResumeScreener: true,
  enableBlogGenerator: true,
  customWelcomeMessage: "Hello! 👋 Welcome to SK Softech and Digital Marketing, Pune. Ask any question below or pick a topic:",
};

export function getFAQs() {
  return faqs;
}

export function addFAQ(question: string, answer: string, category: string = "General") {
  const item: FAQItem = {
    id: Date.now(),
    question,
    answer,
    category,
    isActive: true,
  };
  faqs.push(item);
  return item;
}

export function updateFAQ(id: number, data: Partial<FAQItem>) {
  faqs = faqs.map((f) => (f.id === id ? { ...f, ...data } : f));
  return faqs.find((f) => f.id === id);
}

export function deleteFAQ(id: number) {
  faqs = faqs.filter((f) => f.id !== id);
}

export function getAISettings() {
  return aiSettings;
}

export function updateAISettings(newSettings: Partial<AISettings>) {
  aiSettings = { ...aiSettings, ...newSettings };
  return aiSettings;
}
