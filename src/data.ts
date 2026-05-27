import { Project, Experience, SkillItem, Testimonial, Certificate } from './types';

export const DEVELOPER_BIO = {
  name: "KVN.DEV",
  title: "IT Specialist & Full-Stack Developer",
  tagline: "I build high-performance web systems, optimized network topologies, and interactive digital applications with precision.",
  about: "I am a BSIT graduate from Davao del Norte State College, specializing in full-stack software development, network engineering, and custom systems architecture. Powered by deep analytical thinking, I design robust, responsive client-side applications and secure server infrastructures.",
  location: "Panabo City, Davao del Norte, Philippines (GMT+8)",
  availability: "Available for Core Engineering",
  rate: "₱1,200/hr",
  metrics: [
    { label: "Credentials Earned", value: "4+" },
    { label: "System Ingestion Speed", value: "+160%" },
    { label: "Project Success Rate", value: "100%" },
    { label: "IT & Dev Experience", value: "3+ Yrs" }
  ],
  profileImage: "/assets/images/2.png"
};

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "PapayaFresh — Intelligent Ripeness Dashboard",
    subtitle: "Image Processing & Ripeness Classification Portal",
    description: "Designed and built an advanced web dashboard monitoring system that aggregates daily and weekly papaya scans processed via computer vision and image processing across various ripeness tiers—Unripe, Partially Ripe, Ripe, and Overripe. Serves as a full-stack administrative platform with interactive metrics, scan logs, and visual charts.",
    category: "Full-Stack Development",
    tags: ["React", "TypeScript", "Image Processing", "Node.js", "Express", "Chart.js", "TailwindCSS"],
    results: [
      "Created precise real-time metric counters representing ripeness stages (23 Unripe, 25 Partially Ripe, 18 Ripe, 4 Overripe) via digital image analysis",
      "Plotted weekly papaya scan records processed through color segmentation in high-fidelity columns and charts",
      "Engineered clean administrative control lists with real-time status logging for optimal browser loading"
    ],
    role: "Lead Systems Architect",
    timeline: "5 Months (Academic Thesis)",
    featured: true,
    highlightColor: "teal",
    imageUrl: "/assets/images/Adminside Papayafresh.png"
  },
  {
    id: "project-2",
    title: "Car Rental System",
    subtitle: "Interactive Vehicle Booking & Reservation Platform",
    description: "Developed a modern, fully functional web reservation and renting application focusing on seamless vehicle selection of practical family cars (SUVs, sedans, and hatchbacks), customized booking schedules, active pricing calculations, and clean user-centric catalogs.",
    category: "Frontend Engineering",
    tags: ["React", "TypeScript", "Vite", "TailwindCSS", "Framer Motion", "Figma"],
    results: [
      "Designed an intuitive fleet selection matrix featuring daily rates, seat counts, and automated cost calculators",
      "Created sleek, responsive catalogs and user-friendly digital layouts suitable for family transit rentals",
      "Implemented smooth micro-interactions, responsive states, and optimized layout assets for active reservations"
    ],
    role: "Senior Frontend Engineer",
    timeline: "2 Months (Contract)",
    featured: true,
    highlightColor: "indigo",
    imageUrl: "/assets/images/Car rental.png"
  },
  {
    id: "project-3",
    title: "PapayaFresh Web Application",
    subtitle: "Image Processing & Lifespan Estimator Platform",
    description: "Developed an interactive web application enabling agricultural producers to evaluate papaya shelf-life, predict ripeness duration utilizing image processing algorithms, and manage digital logs. Inspired directly by high-end mobile onboarding layouts transformed into a clean desktop-friendly viewport.",
    category: "Web Application Development",
    tags: ["React", "TypeScript", "Image Processing", "Vite", "Framer Motion", "TailwindCSS"],
    results: [
      "Designed clean, responsive onboarding panels features botanical fruit guides and visual color parameters",
      "Integrated secure client-side predictions logs and instant interactive ripeness assessment matrices",
      "Engineered accessible layouts looking identical to the polished layout assets but operating purely on Web nodes"
    ],
    role: "Lead Web Developer",
    timeline: "6 Months",
    featured: true,
    highlightColor: "amber",
    imageUrl: "/assets/images/PapayaFresh.jpg"
  },
  {
    id: "project-4",
    title: "PWD Assistance Portal",
    subtitle: "Inclusive Support & Empowering Volunteer Grid",
    description: "Architected and developed a mobile-first platform designed to assist Persons with Disabilities (PWDs) by connecting them with volunteers, accessible support nodes, and community assistance. Features user login portals across multiple roles (PWD, Volunteer, Administrator) and dynamic custom state management.",
    category: "Mobile & Cloud Integration",
    tags: ["React Native", "TypeScript", "Firebase Admin", "TailwindCSS", "Node.js"],
    results: [
      "Implemented secure multi-role authentication workflows (PWD, Volunteer, Admin) with safe access control",
      "Engineered accessible high-contrast designs matching strict WCAG compliance guidelines for low-vision support",
      "Created collaborative real-time community assistance requests on live custom-mapped dashboards"
    ],
    role: "Full-Stack App Developer",
    timeline: "4 Months",
    featured: true,
    highlightColor: "slate",
    imageUrl: "/assets/images/PWD tulong.jpg"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Freelance Full-Stack Developer",
    company: "Davao Tech Syndicate",
    period: "2024 — Present",
    description: [
      "Contracted with local agencies and businesses to engineer secure web systems, billing panels, and database architectures.",
      "Built beautiful responsive frontends using React 18, Vite, and TailwindCSS with dynamic micro-interactions.",
      "Delivered real-time data visualizers and IoT dashboards using WebSockets and network communication layers."
    ],
    tags: ["React / Vite", "Node.js / Express", "TypeScript", "TailwindCSS", "PostgreSQL"],
    featured: true
  },
  {
    id: "exp-2",
    role: "IT & Graphic Web Specialist",
    company: "Freelance Contractor",
    period: "2023 — 2024",
    description: [
      "Designed branding, typography models, and responsive web user interfaces following graphic design psychology principles.",
      "Managed local and cloud network environments using Cisco Packet Tracer and network hardware virtualization software.",
      "Successfully configured secure firewall routines, server route topologies, and system disaster recovery backups."
    ],
    tags: ["Cisco Packet Tracer", "Figma", "UI Design", "Network Security", "Docker"],
    featured: true
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  // Frontend
  { name: "React 18 / 19", category: "frontend", proficiency: 96, yearsOfExp: 7 },
  { name: "TypeScript", category: "frontend", proficiency: 98, yearsOfExp: 6 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 95, yearsOfExp: 6 },
  { name: "Vite & Bundlers", category: "frontend", proficiency: 90, yearsOfExp: 5 },
  { name: "Motion Animations", category: "frontend", proficiency: 92, yearsOfExp: 4 },

  // Backend
  { name: "Node.js & Express", category: "backend", proficiency: 92, yearsOfExp: 8 },
  { name: "API Design & Proxying", category: "backend", proficiency: 95, yearsOfExp: 8 },
  { name: "WebSockets & SSE", category: "backend", proficiency: 91, yearsOfExp: 5 },
  { name: "Relational/NoSQL DBs", category: "backend", proficiency: 87, yearsOfExp: 6 },

  // Architecture & DevOps
  { name: "Product Engineering", category: "architecture", proficiency: 94, yearsOfExp: 8 },
  { name: "Web Performance & Core Web Vitals", category: "architecture", proficiency: 95, yearsOfExp: 6 },
  { name: "Docker Containerization", category: "devops", proficiency: 85, yearsOfExp: 4 },
  { name: "CI / CD Pipelines", category: "devops", proficiency: 88, yearsOfExp: 5 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Marcus Aurelius",
    role: "VP of Product",
    company: "Vigil Defense Solutions",
    comment: "Kevin is in the top 1% of freelance builders we've worked with. Not only is his craft immaculate, but he actively contributed to our system design, identifying three critical API bottlenecks before writing a single line of React.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "test-2",
    name: "Tessa Larsson",
    role: "Founder",
    company: "ScribeFlow Corp",
    comment: "We hired Kevin to build our cooperative text suite. The motion layout animations he executed are incredibly buttery, and his IndexedDB offline recovery is flawless. Our users absolutely love the speed and UI responsiveness.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export const PROJECT_CALCULATOR_PRESETS = {
  types: [
    { id: "web-app", name: "Custom Web Application", basePrice: 4000, description: "A complex, highly interactive data portal, client panel, or dashboard with rich custom logic.", factor: 1.0 },
    { id: "mvp", name: "Product MVP (Minimum Viable Product)", basePrice: 2800, description: "A high-fidelity production-ready product release designed to gather client validation.", factor: 0.8 },
    { id: "saas-landing", name: "SaaS Marketing Hub & Design System", basePrice: 1800, description: "A blazing fast, responsive landing system integrated with custom scroll animations.", factor: 0.5 }
  ],
  complexities: [
    { id: "standard", name: "Standard (Clear specifications)", multiplier: 1.0, icon: "⚡" },
    { id: "complex", name: "Complex (Custom algorithms or syncs)", multiplier: 1.3, icon: "☄️" },
    { id: "enterprise", name: "Enterprise-grade (Deep auditing / SOC2 prep)", multiplier: 1.6, icon: "🛡️" }
  ],
  timelines: [
    { id: "relaxed", name: "Standard Delivery (6-8 weeks)", multiplier: 0.9, label: "Discounted" },
    { id: "normal", name: "Expedited Delivery (4 weeks)", multiplier: 1.1, label: "Recommended" },
    { id: "rush", name: "Rush / Strategic Pivot (2 weeks)", multiplier: 1.45, label: "Premium Express" }
  ],
  features: [
    { id: "auth", name: "Federated Auth & Role Management", price: 800, dec: "Secure multi-tenant roles" },
    { id: "realtime", name: "Real-time Event Streaming / Websockets", price: 1200, dec: "Collaboration or charts updating" },
    { id: "payments", name: "Stripe Subscription & Invoicing Flows", price: 900, dec: "Full transactional state logic" },
    { id: "animations", name: "Immersive Motion Layout Animations", price: 500, dec: "Custom interactive layout physics" },
    { id: "analytics", name: "Advanced Data Visualization / D3 Maps", price: 1100, dec: "Interactive custom vector mapping" }
  ]
};

export const CERTIFICATES: Certificate[] = [
  {
    id: "dns-cert-1",
    title: "Advanced Seminar - Science Practitioner to IT Specialist",
    issuer: "Davao del Norte State College (DNSC)",
    date: "Oct 8, 2025 · Verified Completion",
    credentialId: "DNSC-ADV-SEM-D1",
    imageUrl: "/assets/images/cert1.jpeg",
    verificationUrl: "https://www.dnsc.edu.ph",
    associatedProjectId: "project-1"
  },
  {
    id: "dns-cert-2",
    title: "Advanced Seminar - The Power of Color in Graphic Design",
    issuer: "Davao del Norte State College (DNSC)",
    date: "Nov 5, 2025 · Verified Completion",
    credentialId: "DNSC-ADV-SEM-D2",
    imageUrl: "/assets/images/cert2.jpeg",
    verificationUrl: "https://www.dnsc.edu.ph",
    associatedProjectId: "project-4"
  },
  {
    id: "cisco-cert-1",
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Feb 1, 2024 · Lifetime License",
    credentialId: "9aea6812-fe48-4b0a-9dda-689238997579",
    imageUrl: "/assets/images/cert3.jpg",
    verificationUrl: "https://www.netacad.com",
    associatedProjectId: "project-3"
  },
  {
    id: "cisco-cert-2",
    title: "Introduction to Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Feb 1, 2024 · Lifetime License",
    credentialId: "acad0569-6c37-4023-8594-78416aa91097",
    imageUrl: "/assets/images/cert4.jpg",
    verificationUrl: "https://www.netacad.com",
    associatedProjectId: "project-3"
  }
];
