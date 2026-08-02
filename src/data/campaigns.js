export const CAMPAIGN_CATEGORIES = [
  "All",
  "Tech & AI",
  "Eco & Green",
  "Games & Media",
  "Community Impact"
];

export const MOCK_CAMPAIGNS = [
  {
    id: "eco-drone-01",
    title: "AeroPlant: Autonomous Solar Reforestation Drone",
    shortDescription: "An AI-guided autonomous drone system capable of planting 5,000 native trees per day in devastated ecosystems.",
    category: "Eco & Green",
    raisedAmount: 142500,
    targetAmount: 150000,
    backersCount: 1840,
    daysLeft: 6,
    image: "/images/campaigns/eco-drone.jpg",
    creatorName: "Dr. Elena Rostova",
    creatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    badge: "Almost Funded",
    badgeColor: "emerald",
    featured: true
  },
  {
    id: "smart-ring-02",
    title: "PulseRing X: Next-Gen Continuous Vital Tracking",
    shortDescription: "Medical-grade biometric intelligence packed into a sleek, 7-day titanium ring with zero subscription fees.",
    category: "Tech & AI",
    raisedAmount: 389000,
    targetAmount: 200000,
    backersCount: 4120,
    daysLeft: 14,
    image: "/images/campaigns/smart-ring.jpg",
    creatorName: "NEXUS Health Labs",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    badge: "Trending",
    badgeColor: "indigo",
    featured: true
  },
  {
    id: "indie-game-03",
    title: "Aetheria: Chronicles of the Floating Realm",
    shortDescription: "An immersive open-world action RPG featuring hand-painted landscapes, reactive weather systems, and co-op storytelling.",
    category: "Games & Media",
    raisedAmount: 94200,
    targetAmount: 120000,
    backersCount: 2310,
    daysLeft: 21,
    image: "/images/campaigns/indie-game.jpg",
    creatorName: "Arcane Light Studios",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    badge: "Staff Pick",
    badgeColor: "purple",
    featured: true
  },
  {
    id: "clean-water-04",
    title: "AquaPure Kiosk: Off-Grid Solar Water Stations",
    shortDescription: "Deploying low-cost solar purification hubs providing clean drinking water to over 50 rural communities.",
    category: "Community Impact",
    raisedAmount: 67800,
    targetAmount: 75000,
    backersCount: 890,
    daysLeft: 9,
    image: "/images/campaigns/clean-water.jpg",
    creatorName: "Global Clean Waters Initiative",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    badge: "Community Favorite",
    badgeColor: "amber",
    featured: true
  }
];

export const PLATFORM_STATS = [
  { label: "Total Raised", value: "$14.8M+", change: "+24% this month" },
  { label: "Successful Projects", value: "1,420+", change: "98.4% completion rate" },
  { label: "Global Backers", value: "185,000+", change: "Across 112 countries" },
  { label: "Creator Payouts", value: "100%", change: "Secured via Escrow" }
];
