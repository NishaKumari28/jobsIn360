"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    type: "Full-time" | "Part-time" | "Remote" | "Internship" | "Hybrid";
    experience: string;
    salary: string;
    postedAgo: string;
    views: number;
    description: string;
    requirements: string[];
    responsibilities: string[];
    about: string;
    applyUrl: string;
    skills: string[];
}

const jobs: Job[] = [
    {
        id: "1",
        title: "Frontend Developer",
        company: "TCS",
        companyLogo: "🏢",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "1-3 years",
        salary: "₹6L - ₹12L/yr",
        postedAgo: "2 hours ago",
        views: 1240,
        skills: ["React", "JavaScript", "CSS", "HTML"],
        description: "We are looking for a skilled Frontend Developer to join our growing team...",
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
        about: "TCS is one of India's largest IT companies with 600,000+ employees worldwide, delivering excellence in technology services.",
        applyUrl: "https://www.tcs.com/careers",
    },
    {
        id: "2",
        title: "Backend Developer",
        company: "Infosys",
        companyLogo: "🔷",
        location: "Pune, Maharashtra",
        type: "Full-time",
        experience: "2-4 years",
        salary: "₹8L - ₹15L/yr",
        postedAgo: "5 hours ago",
        views: 890,
        skills: ["Node.js", "Python", "MongoDB", "AWS"],
        description: "Join Infosys as a Backend Developer and work on cutting-edge enterprise solutions...",
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
    },
    {
        id: "3",
        title: "UI/UX Designer",
        company: "Wipro",
        companyLogo: "⭕",
        location: "Remote",
        type: "Remote",
        experience: "1-2 years",
        salary: "₹5L - ₹9L/yr",
        postedAgo: "1 day ago",
        views: 2100,
        skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        description: "We need a creative UI/UX Designer who can craft beautiful and intuitive user experiences...",
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
    },
    {
        id: "4",
        title: "Data Analyst",
        company: "HCL Technologies",
        companyLogo: "📊",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        experience: "Fresher",
        salary: "₹4L - ₹7L/yr",
        postedAgo: "3 hours ago",
        views: 3400,
        skills: ["Python", "SQL", "Excel", "Power BI"],
        description: "HCL is hiring Data Analysts to work with large datasets and derive meaningful insights...",
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
    },
    {
        id: "5",
        title: "React Native Developer",
        company: "Startupzone",
        companyLogo: "🚀",
        location: "Mumbai, Maharashtra",
        type: "Hybrid",
        experience: "2-3 years",
        salary: "₹10L - ₹18L/yr",
        postedAgo: "6 hours ago",
        views: 670,
        skills: ["React Native", "JavaScript", "Redux", "Firebase"],
        description: "Fast-growing startup looking for a React Native developer to build our mobile products...",
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
    },
    {
        id: "6",
        title: "DevOps Engineer",
        company: "Amazon",
        companyLogo: "📦",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "3-5 years",
        salary: "₹20L - ₹35L/yr",
        postedAgo: "2 days ago",
        views: 5600,
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        description: "Amazon is looking for an experienced DevOps Engineer to help scale our infrastructure...",
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
    },
    {
        id: "7",
        title: "Marketing Intern",
        company: "Zomato",
        companyLogo: "🍕",
        location: "Delhi, NCR",
        type: "Internship",
        experience: "Fresher",
        salary: "₹15,000/month",
        postedAgo: "4 hours ago",
        views: 4200,
        skills: ["Social Media", "Content Writing", "Canva", "Analytics"],
        description: "Zomato is hiring marketing interns to help grow our brand presence across India...",
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
    },
    {
        id: "8",
        title: "Product Manager",
        company: "Flipkart",
        companyLogo: "🛒",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "3-6 years",
        salary: "₹25L - ₹45L/yr",
        postedAgo: "1 day ago",
        views: 3800,
        skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
        description: "Flipkart is seeking an experienced Product Manager to lead product development...",
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
    },
];

const jobTypes = ["All", "Full-time", "Part-time", "Remote", "Hybrid", "Internship"];
const experienceLevels = ["All", "Fresher", "1-3 years", "2-4 years", "3-5 years", "3-6 years", "5+ years"];

const typeColors: Record<string, { bg: string; text: string }> = {
    "Full-time": { bg: "rgba(108,99,255,0.15)", text: "#6C63FF" },
    "Remote": { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
    "Hybrid": { bg: "rgba(245,158,11,0.15)", text: "#F59E0B" },
    "Internship": { bg: "rgba(219,39,119,0.15)", text: "#DB2777" },
    "Part-time": { bg: "rgba(99,102,241,0.15)", text: "#818CF8" },
};

export default function JobsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [activeType, setActiveType] = useState("All");
    const [activeExp, setActiveExp] = useState("All");
    const [savedJobs, setSavedJobs] = useState<string[]>([]);

    const filtered = jobs.filter((j) => {
        const matchSearch =
            j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.company.toLowerCase().includes(search.toLowerCase()) ||
            j.location.toLowerCase().includes(search.toLowerCase()) ||
            j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
        const matchType = activeType === "All" || j.type === activeType;
        const matchExp = activeExp === "All" || j.experience === activeExp;
        return matchSearch && matchType && matchExp;
    });

    const toggleSave = (id: string) => {
        setSavedJobs(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    return (
        <div style={{ minHeight: "100vh", background: "#080C18", color: "#fff", fontFamily: "'Syne', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .job-card { transition: transform 0.3s, box-shadow 0.3s; }
        .job-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(108,99,255,0.15); }
        .filter-btn { transition: all 0.2s; cursor: pointer; border: none; font-family: 'Syne', sans-serif; }
        .search-input:focus { outline: none; border-color: #6C63FF !important; }
        .search-input::placeholder { color: #6B7280; }
        .apply-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .save-btn:hover { color: #6C63FF !important; }
      `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "sticky", top: 0, zIndex: 100,
                padding: "16px 40px",
                background: "rgba(8,12,24,0.95)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <button
                    onClick={() => router.push("/")}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <img src="/logo.png" alt="JobsIn360" style={{ width: 80, height: 80, objectFit: "contain" }} />
                </button>
                <div style={{ display: "flex", gap: 16 }}>
                    <button
                        onClick={() => router.push("/login")}
                        style={{ background: "transparent", color: "#fff", border: "1.5px solid #374151", padding: "10px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => router.push("/signup")}
                        style={{ background: "linear-gradient(135deg, #6C63FF, #DB2777)", color: "#fff", border: "none", padding: "10px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
                    >
                        Get Started Free
                    </button>
                </div>
            </nav>

            {/* ── HEADER ── */}
            <div style={{ padding: "60px 40px 40px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
                <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
                    Find Your <span style={{ background: "linear-gradient(90deg, #6C63FF, #DB2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dream Job</span>
                </h1>
                <p style={{ color: "#9CA3AF", fontSize: 16, fontFamily: "'DM Sans', sans-serif", marginBottom: 40 }}>
                    Thousands of opportunities from top companies across India
                </p>

                {/* Search */}
                <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
                    <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search jobs, companies, skills, locations..."
                        className="search-input"
                        style={{
                            width: "100%", padding: "16px 20px 16px 52px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1.5px solid rgba(255,255,255,0.1)",
                            borderRadius: 16, color: "#fff", fontSize: 15,
                            fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box",
                        }}
                    />
                    {search && (
                        <button onClick={() => setSearch("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 18 }}>✕</button>
                    )}
                </div>
            </div>

            {/* ── FILTERS ── */}
            <div style={{ padding: "0 40px 16px", maxWidth: 1200, margin: "0 auto" }}>
                {/* Job Type */}
                <div style={{ marginBottom: 12 }}>
                    <p style={{ color: "#6B7280", fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: 1 }}>JOB TYPE</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {jobTypes.map((type) => (
                            <button
                                key={type}
                                className="filter-btn"
                                onClick={() => setActiveType(type)}
                                style={{
                                    padding: "8px 16px", borderRadius: 100, fontSize: 13, fontWeight: 600,
                                    background: activeType === type ? "linear-gradient(135deg, #6C63FF, #DB2777)" : "rgba(255,255,255,0.05)",
                                    color: activeType === type ? "#fff" : "#9CA3AF",
                                    border: activeType === type ? "none" : "1px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: 24 }}>
                    <p style={{ color: "#6B7280", fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: 1 }}>EXPERIENCE</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {experienceLevels.map((exp) => (
                            <button
                                key={exp}
                                className="filter-btn"
                                onClick={() => setActiveExp(exp)}
                                style={{
                                    padding: "8px 16px", borderRadius: 100, fontSize: 13, fontWeight: 600,
                                    background: activeExp === exp ? "rgba(108,99,255,0.2)" : "rgba(255,255,255,0.05)",
                                    color: activeExp === exp ? "#6C63FF" : "#9CA3AF",
                                    border: activeExp === exp ? "1px solid #6C63FF" : "1px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                {exp}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results count */}
                <p style={{ color: "#6B7280", fontSize: 14, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>
                    {filtered.length} jobs found
                    {search && <span> for "<span style={{ color: "#6C63FF" }}>{search}</span>"</span>}
                </p>
            </div>

            {/* ── JOB CARDS ── */}
            <div style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 20px" }}>
                        <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                        <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>No jobs found</h3>
                        <p style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Try different keywords or clear filters</p>
                        <button
                            onClick={() => { setSearch(""); setActiveType("All"); setActiveExp("All"); }}
                            style={{ marginTop: 24, background: "#6C63FF", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {filtered.map((job) => (
                            <div
                                key={job.id}
                                className="job-card"
                                style={{
                                    background: "#111827",
                                    borderRadius: 20,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    padding: "24px",
                                    display: "grid",
                                    gridTemplateColumns: "1fr auto",
                                    gap: 20,
                                    alignItems: "start",
                                }}
                            >
                                {/* Left Side */}
                                <div>
                                    {/* Company + Save */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                        <div style={{
                                            width: 48, height: 48, borderRadius: 12,
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 24,
                                        }}>
                                            {job.companyLogo}
                                        </div>
                                        <div>
                                            <p style={{ color: "#9CA3AF", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{job.company}</p>
                                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{job.title}</h3>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                                        <span style={{
                                            fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100,
                                            background: typeColors[job.type]?.bg || "rgba(108,99,255,0.15)",
                                            color: typeColors[job.type]?.text || "#6C63FF",
                                        }}>
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
                                    </div>

                                    {/* Skills */}
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                                        {job.skills.map(skill => (
                                            <span key={skill} style={{
                                                fontSize: 11, color: "#6C63FF", background: "rgba(108,99,255,0.1)",
                                                padding: "3px 10px", borderRadius: 100, fontFamily: "'DM Sans', sans-serif",
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Meta info */}
                                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                                        <span style={{ color: "#6B7280", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                                            🕐 {job.postedAgo}
                                        </span>
                                        <span style={{ color: "#6B7280", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                                            👁️ {job.views.toLocaleString()} views
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side — Buttons */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 160, alignItems: "flex-end" }}>
                                    {/* Save Button */}
                                    <button
                                        className="save-btn"
                                        onClick={() => toggleSave(job.id)}
                                        style={{
                                            background: "none", border: "none", cursor: "pointer",
                                            color: savedJobs.includes(job.id) ? "#6C63FF" : "#6B7280",
                                            fontSize: 13, fontFamily: "'Syne', sans-serif", fontWeight: 600,
                                            display: "flex", alignItems: "center", gap: 4,
                                        }}
                                    >
                                        {savedJobs.includes(job.id) ? "🔖 Saved" : "🔖 Save"}
                                    </button>

                                    {/* View JD Button */}
                                    <button
                                        onClick={() => router.push(`/jobs/${job.id}`)}
                                        style={{
                                            background: "rgba(108,99,255,0.15)",
                                            color: "#6C63FF",
                                            border: "1px solid #6C63FF",
                                            padding: "10px 20px", borderRadius: 12,
                                            fontSize: 13, fontWeight: 700,
                                            cursor: "pointer", fontFamily: "'Syne', sans-serif",
                                            transition: "all 0.2s", whiteSpace: "nowrap",
                                        }}
                                    >
                                        View Details →
                                    </button>

                                    {/* Apply Now Button */}
                                    <button
                                        className="apply-btn"
                                        onClick={() => window.open(job.applyUrl, "_blank")}
                                        style={{
                                            background: "linear-gradient(135deg, #6C63FF, #DB2777)",
                                            color: "#fff", border: "none",
                                            padding: "10px 20px", borderRadius: 12,
                                            fontSize: 13, fontWeight: 700,
                                            cursor: "pointer", fontFamily: "'Syne', sans-serif",
                                            transition: "all 0.2s", whiteSpace: "nowrap",
                                        }}
                                    >
                                        Apply Now ↗
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 40px", textAlign: "center" }}>
                <p style={{ color: "#4B5563", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>© 2026 JobsIn360. All rights reserved.</p>
            </div>
        </div>
    );
}