"use client";
import { useParams, useRouter } from "next/navigation";

const jobs = [
    {
        id: "1", title: "Frontend Developer", company: "TCS", companyLogo: "🏢",
        location: "Bangalore, Karnataka", type: "Full-time", experience: "1-3 years",
        salary: "₹6L - ₹12L/yr", postedAgo: "2 hours ago", views: 1240,
        skills: ["React", "JavaScript", "CSS", "HTML"],
        description: "We are looking for a skilled Frontend Developer to join our growing team at TCS. You will be responsible for building and maintaining high-quality web applications that serve millions of users across India and globally.",
        requirements: [
            "1-3 years of experience in frontend development",
            "Strong knowledge of React.js and JavaScript",
            "Experience with REST APIs and Git",
            "Good understanding of responsive design",
            "Excellent communication skills",
        ],
        responsibilities: [
            "Build and maintain high-quality web applications",
            "Collaborate with designers and backend developers",
            "Write clean, maintainable code",
            "Participate in code reviews",
            "Optimize applications for performance",
        ],
        about: "TCS is one of India's largest IT companies with 600,000+ employees worldwide, delivering excellence in technology services and consulting.",
        applyUrl: "https://www.tcs.com/careers",
        benefits: ["Health Insurance", "Work from Home", "Learning Budget", "Annual Bonus"],
    },
    {
        id: "2", title: "Backend Developer", company: "Infosys", companyLogo: "🔷",
        location: "Pune, Maharashtra", type: "Full-time", experience: "2-4 years",
        salary: "₹8L - ₹15L/yr", postedAgo: "5 hours ago", views: 890,
        skills: ["Node.js", "Python", "MongoDB", "AWS"],
        description: "Join Infosys as a Backend Developer and work on cutting-edge enterprise solutions that impact millions of businesses worldwide.",
        requirements: [
            "2-4 years of backend development experience",
            "Proficiency in Node.js or Python",
            "Experience with databases (SQL/NoSQL)",
            "Knowledge of cloud platforms (AWS/Azure)",
            "Strong problem-solving skills",
        ],
        responsibilities: [
            "Design and develop scalable backend services",
            "Build and maintain RESTful APIs",
            "Optimize database queries",
            "Ensure application security",
            "Mentor junior developers",
        ],
        about: "Infosys is a global leader in next-generation digital services and consulting with presence in 56 countries.",
        applyUrl: "https://www.infosys.com/careers",
        benefits: ["Medical Coverage", "Flexible Hours", "Stock Options", "Training Programs"],
    },
    {
        id: "3", title: "UI/UX Designer", company: "Wipro", companyLogo: "⭕",
        location: "Remote", type: "Remote", experience: "1-2 years",
        salary: "₹5L - ₹9L/yr", postedAgo: "1 day ago", views: 2100,
        skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        description: "We need a creative UI/UX Designer who can craft beautiful and intuitive user experiences for our enterprise products.",
        requirements: [
            "1-2 years of UI/UX design experience",
            "Proficiency in Figma and Adobe XD",
            "Strong portfolio of design work",
            "Understanding of user-centered design",
            "Knowledge of design systems",
        ],
        responsibilities: [
            "Create wireframes and prototypes",
            "Conduct user research",
            "Design responsive interfaces",
            "Collaborate with developers",
            "Maintain design consistency",
        ],
        about: "Wipro Limited is a leading global IT, consulting and business process services company.",
        applyUrl: "https://careers.wipro.com",
        benefits: ["Remote Work", "Home Office Setup", "Health Benefits", "Learning Allowance"],
    },
    {
        id: "4", title: "Data Analyst", company: "HCL Technologies", companyLogo: "📊",
        location: "Hyderabad, Telangana", type: "Full-time", experience: "Fresher",
        salary: "₹4L - ₹7L/yr", postedAgo: "3 hours ago", views: 3400,
        skills: ["Python", "SQL", "Excel", "Power BI"],
        description: "HCL is hiring Data Analysts to work with large datasets and derive meaningful insights that drive business decisions.",
        requirements: [
            "Fresh graduate or 0-1 year experience",
            "Knowledge of Python and SQL",
            "Experience with Excel and data visualization",
            "Analytical mindset",
            "Good communication skills",
        ],
        responsibilities: [
            "Analyze large datasets",
            "Create reports and dashboards",
            "Work with stakeholders",
            "Identify trends and patterns",
            "Present findings to management",
        ],
        about: "HCL Technologies is a next-generation global technology company that helps enterprises reimagine their businesses.",
        applyUrl: "https://www.hcltech.com/careers",
        benefits: ["Fresher Training", "Mentorship", "Health Insurance", "Performance Bonus"],
    },
    {
        id: "5", title: "React Native Developer", company: "Startupzone", companyLogo: "🚀",
        location: "Mumbai, Maharashtra", type: "Hybrid", experience: "2-3 years",
        salary: "₹10L - ₹18L/yr", postedAgo: "6 hours ago", views: 670,
        skills: ["React Native", "JavaScript", "Redux", "Firebase"],
        description: "Fast-growing startup looking for a React Native developer to build our mobile products from scratch.",
        requirements: [
            "2-3 years React Native experience",
            "Strong JavaScript/TypeScript skills",
            "Experience with state management",
            "Published apps on Play Store/App Store",
            "Startup mindset",
        ],
        responsibilities: [
            "Build cross-platform mobile apps",
            "Integrate APIs and third-party services",
            "Optimize app performance",
            "Work in agile environment",
            "Ship features fast",
        ],
        about: "Startupzone is a fast-growing ed-tech startup disrupting how India learns and works.",
        applyUrl: "https://startupzone.in/careers",
        benefits: ["ESOPs", "Flexible Hours", "Fast Growth", "Cool Culture"],
    },
    {
        id: "6", title: "DevOps Engineer", company: "Amazon", companyLogo: "📦",
        location: "Bangalore, Karnataka", type: "Full-time", experience: "3-5 years",
        salary: "₹20L - ₹35L/yr", postedAgo: "2 days ago", views: 5600,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        description: "Amazon is looking for an experienced DevOps Engineer to help scale our infrastructure to handle billions of requests.",
        requirements: [
            "3-5 years of DevOps experience",
            "Strong AWS knowledge",
            "Experience with Docker and Kubernetes",
            "CI/CD pipeline expertise",
            "Problem-solving skills",
        ],
        responsibilities: [
            "Manage cloud infrastructure",
            "Build CI/CD pipelines",
            "Ensure system reliability",
            "Monitor and optimize performance",
            "Automate deployments",
        ],
        about: "Amazon is one of the world's most valuable companies, leading in e-commerce, cloud computing, and AI.",
        applyUrl: "https://www.amazon.jobs",
        benefits: ["RSUs", "World-class Benefits", "Learning & Development", "Global Opportunities"],
    },
    {
        id: "7", title: "Marketing Intern", company: "Zomato", companyLogo: "🍕",
        location: "Delhi, NCR", type: "Internship", experience: "Fresher",
        salary: "₹15,000/month", postedAgo: "4 hours ago", views: 4200,
        skills: ["Social Media", "Content Writing", "Canva", "Analytics"],
        description: "Zomato is hiring marketing interns to help grow our brand presence across India.",
        requirements: [
            "Currently pursuing graduation",
            "Passion for marketing and social media",
            "Good writing skills",
            "Knowledge of Canva or similar tools",
            "Creative mindset",
        ],
        responsibilities: [
            "Create social media content",
            "Assist in campaigns",
            "Analyze marketing metrics",
            "Write blog posts",
            "Support marketing team",
        ],
        about: "Zomato is India's leading food delivery and restaurant discovery platform serving millions daily.",
        applyUrl: "https://www.zomato.com/careers",
        benefits: ["Stipend", "Free Meals", "PPO Opportunity", "Fun Culture"],
    },
    {
        id: "8", title: "Product Manager", company: "Flipkart", companyLogo: "🛒",
        location: "Bangalore, Karnataka", type: "Full-time", experience: "3-6 years",
        salary: "₹25L - ₹45L/yr", postedAgo: "1 day ago", views: 3800,
        skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
        description: "Flipkart is seeking an experienced Product Manager to lead product development for our core e-commerce platform.",
        requirements: [
            "3-6 years of product management experience",
            "Strong analytical skills",
            "Experience with agile methodology",
            "Excellent communication skills",
            "Technical background preferred",
        ],
        responsibilities: [
            "Define product vision and strategy",
            "Work with engineering and design",
            "Analyze user data",
            "Prioritize features",
            "Drive product launches",
        ],
        about: "Flipkart is India's largest e-commerce marketplace with 400 million+ registered users.",
        applyUrl: "https://www.flipkartcareers.com",
        benefits: ["ESOPs", "Health Insurance", "Learning Budget", "Flexible Work"],
    },
];

const typeColors: Record<string, { bg: string; text: string }> = {
    "Full-time": { bg: "rgba(108,99,255,0.15)", text: "#6C63FF" },
    "Remote": { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
    "Hybrid": { bg: "rgba(245,158,11,0.15)", text: "#F59E0B" },
    "Internship": { bg: "rgba(219,39,119,0.15)", text: "#DB2777" },
    "Part-time": { bg: "rgba(99,102,241,0.15)", text: "#818CF8" },
};

export default function JobDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const job = jobs.find((j) => j.id === id);

    if (!job) {
        return (
            <div style={{ minHeight: "100vh", background: "#080C18", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Syne', sans-serif" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Job not found</h2>
                    <button onClick={() => router.push("/jobs")} style={{ marginTop: 16, background: "#6C63FF", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "#080C18", color: "#fff", fontFamily: "'Syne', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .apply-btn { transition: all 0.2s; }
        .apply-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(108,99,255,0.4); }
      `}</style>

            {/* Navbar */}
            <nav style={{
                position: "sticky", top: 0, zIndex: 100,
                padding: "16px 40px",
                background: "rgba(8,12,24,0.95)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <img src="/logo.png" alt="JobsIn360" style={{ width: 80, height: 80, objectFit: "contain" }} />
                </button>
                <button
                    onClick={() => router.push("/jobs")}
                    style={{ background: "transparent", color: "#9CA3AF", border: "1px solid #374151", padding: "10px 20px", borderRadius: 12, fontSize: 14, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
                >
                    ← Back to Jobs
                </button>
            </nav>

            <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>

                {/* ── JOB HEADER ── */}
                <div style={{
                    background: "#111827",
                    borderRadius: 24,
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "32px",
                    marginBottom: 24,
                }}>
                    {/* Company + Title */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 16,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0,
                        }}>
                            {job.companyLogo}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{job.company}</p>
                            <h1 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
                                {job.title}
                            </h1>

                            {/* Tags */}
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100, background: typeColors[job.type]?.bg, color: typeColors[job.type]?.text }}>
                                    {job.type}
                                </span>
                                <span style={{ fontSize: 12, color: "#9CA3AF", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif" }}>
                                    📍 {job.location}
                                </span>
                                <span style={{ fontSize: 12, color: "#9CA3AF", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif" }}>
                                    💼 {job.experience}
                                </span>
                                <span style={{ fontSize: 12, color: "#10B981", background: "rgba(16,185,129,0.1)", padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif" }}>
                                    💰 {job.salary}
                                </span>
                                <span style={{ fontSize: 12, color: "#6B7280", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif" }}>
                                    🕐 {job.postedAgo}
                                </span>
                                <span style={{ fontSize: 12, color: "#6B7280", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif" }}>
                                    👁️ {job.views.toLocaleString()} views
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Apply Now Button — Top */}
                    <button
                        className="apply-btn"
                        onClick={() => window.open(job.applyUrl, "_blank")}
                        style={{
                            width: "100%",
                            background: "linear-gradient(135deg, #6C63FF, #DB2777)",
                            color: "#fff", border: "none",
                            padding: "16px", borderRadius: 14,
                            fontSize: 16, fontWeight: 700,
                            cursor: "pointer", fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Apply Now ↗ — {job.company}
                    </button>
                </div>

                {/* ── SKILLS ── */}
                <div style={{ background: "#111827", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "24px", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Required Skills</h2>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {job.skills.map(skill => (
                            <span key={skill} style={{ fontSize: 13, color: "#6C63FF", background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)", padding: "6px 16px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── JOB DESCRIPTION ── */}
                <div style={{ background: "#111827", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "24px", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Job Description</h2>
                    <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>{job.description}</p>
                </div>

                {/* ── RESPONSIBILITIES ── */}
                <div style={{ background: "#111827", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "24px", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Responsibilities</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {job.responsibilities.map((r, i) => (
                            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <span style={{ color: "#6C63FF", marginTop: 2, flexShrink: 0 }}>✓</span>
                                <span style={{ color: "#D1D5DB", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{r}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── REQUIREMENTS ── */}
                <div style={{ background: "#111827", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "24px", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Requirements</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {job.requirements.map((r, i) => (
                            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <span style={{ color: "#DB2777", marginTop: 2, flexShrink: 0 }}>→</span>
                                <span style={{ color: "#D1D5DB", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{r}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── BENEFITS ── */}
                <div style={{ background: "#111827", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "24px", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Benefits & Perks</h2>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {job.benefits.map((b) => (
                            <span key={b} style={{ fontSize: 13, color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", padding: "6px 16px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif" }}>
                                ✓ {b}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── ABOUT COMPANY ── */}
                <div style={{ background: "#111827", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "24px", marginBottom: 32 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About {job.company}</h2>
                    <p style={{ color: "#9CA3AF", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>{job.about}</p>
                </div>

                {/* ── APPLY NOW — Bottom ── */}
                <div style={{
                    background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(219,39,119,0.1))",
                    border: "1px solid rgba(108,99,255,0.3)",
                    borderRadius: 24, padding: "32px", textAlign: "center",
                }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ready to Apply?</h3>
                    <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
                        Click below to go directly to {job.company}'s application page
                    </p>
                    <button
                        className="apply-btn"
                        onClick={() => window.open(job.applyUrl, "_blank")}
                        style={{
                            background: "linear-gradient(135deg, #6C63FF, #DB2777)",
                            color: "#fff", border: "none",
                            padding: "16px 48px", borderRadius: 14,
                            fontSize: 16, fontWeight: 700,
                            cursor: "pointer", fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        Apply Now at {job.company} ↗
                    </button>
                    <p style={{ color: "#6B7280", fontSize: 12, marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>
                        You will be redirected to {job.company}'s official careers page
                    </p>
                </div>

            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 40px", textAlign: "center" }}>
                <p style={{ color: "#4B5563", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>© 2026 JobsIn360. All rights reserved.</p>
            </div>
        </div>
    );
}