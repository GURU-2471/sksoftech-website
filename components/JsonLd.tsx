export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SK Softech and Digital Marketing",
    alternateName: "SK Softech Pune",
    description:
      "Premier software and web development agency in Pune, Maharashtra. Specializing in high-performance websites, mobile applications, digital marketing, SEO, and custom SaaS platforms.",
    url: "https://sksoftechdm.com",
    telephone: "+91-9307696221",
    email: "sksoftech2026@gmail.com",
    priceRange: "₹₹",
    founder: {
      "@type": "Person",
      name: "Shubham Kale",
      jobTitle: "Founder & CEO",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.5204,
      longitude: 73.8567,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      "https://github.com/GURU-2471/sksoftech-website",
      "https://www.linkedin.com/company/sksoftech",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT & Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description: "Custom responsive websites, Next.js web applications, and landing pages.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing & SEO",
            description: "Search Engine Optimization, Google Ads, Meta Ads, and Local SEO ranking.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software & SaaS Development",
            description: "Custom management software, housing society portals, and business automation.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
