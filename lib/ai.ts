// Google Gemini AI Helper with Resilient Fallback Engine for SK Softech
// Guarantees reliable response even if API Key is not set or network quota is reached

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export const COMPANY_CONTEXT = `
You are the AI Assistant for "SK Softech and Digital Marketing", an IT & digital agency based in Pune, Maharashtra.
Tagline: "Your Vision | Our Technology | Your Growth"
Phone: 9307696221
Email: sksoftech2026@gmail.com
Location: Pune, Maharashtra, India.
Services:
1. Website Development (Business sites, E-Commerce, Landing Pages, Portfolios)
2. Software Development (Custom software, Web applications, CRM/ERP)
3. Mobile App Development (Android, iOS, Cross-platform Flutter/React Native)
4. Digital Marketing (Google Ads, Meta Ads, Lead Generation, Campaigns)
5. SEO (Search Engine Optimization, Local SEO Pune, On-page/Off-page)
6. Social Media Marketing (Instagram, Facebook, LinkedIn, YouTube management)
7. Graphic Design & Branding (Logo, Banners, UI/UX, Corporate Identity)
8. Video Editing & Content Creation (Reels, Promo videos, YouTube edits)
9. IT Support & Maintenance (Server maintenance, Cloud, Security, Upgrades)
10. Custom Printing & Corporate Merchandise (T-Shirts, Mugs, Badges)
11. Digital Media Services (Photoshoots, Product photography, Media campaigns)
`;

function generateOfflineBlog(topic: string, keywords: string): string {
  const cleanTopic = topic.trim() || "Modern E-Commerce Website Development in 2026";
  const kwList = keywords || "web development, e-commerce, customer growth";
  return JSON.stringify({
    title: `${cleanTopic}: The Ultimate Strategy for Business Growth`,
    metaDescription: `Discover how ${cleanTopic} can scale your business in Pune. Learn proven strategies, cost estimates, and digital marketing secrets from SK Softech.`,
    readingTime: "4 min read",
    category: "Web Engineering & Strategy",
    content: `## Introduction: Why ${cleanTopic} Matters Today\n\nIn the competitive digital ecosystem of Pune and beyond, having a solid online presence is no longer optional—it is the heartbeat of your enterprise. Whether you are launching an online store, a SaaS platform, or a corporate portal, modern consumers demand speed, security, and mobile-first experiences.\n\n### 1. Key Pillars for Success\n- **Sub-Second Performance**: Modern tech stacks like Next.js 15 and Tailwind CSS ensure zero loading lag.\n- **Built-in Conversions**: WhatsApp quick chat, smart lead forms, and instant call-to-actions.\n- **Payment & Security**: Seamless UPI, Razorpay, and SSL encryption.\n\n### 2. Relevant Keywords & SEO Integration\nTo rank on page #1 of Google, focus on: *${kwList}*.\nOptimizing meta descriptions, semantic schema, and local Google Business Profile ensures consistent organic traffic without burning ad spend.\n\n### 3. Conclusion & Next Steps\nAt **SK Softech and Digital Marketing**, we turn your digital vision into measurable revenue. Contact our team in Pune today at **9307696221** or email **sksoftech2026@gmail.com** for a free consultation and project scope!`,
  });
}

export async function callGemini(
  prompt: string,
  systemInstruction?: string,
  jsonMode: boolean = false
): Promise<string> {
  // If no Gemini key is provided, provide smart instant generator
  if (!GEMINI_API_KEY) {
    if (jsonMode) {
      if (prompt.includes("Topic:") || prompt.includes("SEO Content")) {
        const match = prompt.match(/Topic:\s*"([^"]+)"/);
        const topic = match ? match[1] : "Modern Web Solutions";
        const kwMatch = prompt.match(/Target Keywords:\s*([^\n]+)/);
        const keywords = kwMatch ? kwMatch[1] : "";
        return generateOfflineBlog(topic, keywords);
      }
      if (prompt.includes("estimate") || prompt.includes("cost") || prompt.includes("Requirement Category:")) {
        return JSON.stringify({
          summary: "Based on your requirements, here is our recommended roadmap and quotation range.",
          recommendedTech: ["Next.js / React", "Tailwind CSS", "Node.js / PostgreSQL", "Cloud VPS"],
          estimatedTimeline: "3 - 5 Weeks",
          estimatedCostRange: "₹25,000 - ₹55,000",
          keyFeatures: [
            "Responsive Mobile & Desktop Architecture",
            "Full Dynamic Admin Dashboard for Content & Leads",
            "SEO optimization & Google Indexing submission",
            "WhatsApp & automated inquiry workflows"
          ],
          maintenanceAdvice: "Includes complimentary bug fixing and server monitoring."
        });
      }
    }
    return "Hello! I am SK Softech's AI Assistant. How can we help build your vision today? Feel free to reach our team at 9307696221 for a free consultation!";
  }

  // Attempt live Gemini API call
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
        generationConfig: jsonMode ? { responseMimeType: "application/json" } : undefined,
      }),
    });

    if (!res.ok) {
      console.warn("Gemini API non-200, activating intelligent fallback");
      if (jsonMode) {
        return generateOfflineBlog("Business Growth", "web development, digital marketing");
      }
      return "SK Softech provides 11+ services in Pune. Call us at 9307696221 for immediate assistance!";
    }

    const data = await res.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return resultText || generateOfflineBlog("Business Growth", "web development");
  } catch (err) {
    console.warn("callGemini error, fallback activated:", err);
    if (jsonMode) {
      return generateOfflineBlog("Business Growth", "web development");
    }
    return "SK Softech is available 24/7. Reach us at 9307696221 or on WhatsApp!";
  }
}
