"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
    id: string;
    title: string;
    category: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    rating: number;
    students: number;
    instructor: string;
    price: string;
    emoji: string;
    description: string;
}

const courses: Course[] = [
    // Tech
    { id: "1", title: "React JS Masterclass", category: "Tech", duration: "12 hrs", level: "Beginner", rating: 4.8, students: 12400, instructor: "Rahul Sharma", price: "Free", emoji: "⚛️", description: "Learn React from scratch to advanced concepts" },
    { id: "2", title: "Node.js Backend Development", category: "Tech", duration: "15 hrs", level: "Intermediate", rating: 4.7, students: 8900, instructor: "Priya Singh", price: "₹499", emoji: "🟢", description: "Build scalable backend APIs with Node.js" },
    { id: "3", title: "Python for Data Science", category: "Tech", duration: "20 hrs", level: "Beginner", rating: 4.9, students: 23000, instructor: "Amit Kumar", price: "Free", emoji: "🐍", description: "Master Python for data analysis and ML" },
    { id: "4", title: "Flutter App Development", category: "Tech", duration: "18 hrs", level: "Intermediate", rating: 4.6, students: 6700, instructor: "Sneha Patel", price: "₹699", emoji: "📱", description: "Build beautiful cross-platform mobile apps" },
    { id: "5", title: "AWS Cloud Practitioner", category: "Tech", duration: "10 hrs", level: "Beginner", rating: 4.7, students: 9800, instructor: "Vikram Nair", price: "₹999", emoji: "☁️", description: "Get started with Amazon Web Services" },
    { id: "6", title: "Full Stack Web Development", category: "Tech", duration: "40 hrs", level: "Advanced", rating: 4.9, students: 31000, instructor: "Rahul Sharma", price: "₹1499", emoji: "💻", description: "Complete web dev from frontend to backend" },

    // Design
    { id: "7", title: "UI/UX Design Fundamentals", category: "Design", duration: "8 hrs", level: "Beginner", rating: 4.8, students: 15000, instructor: "Ananya Roy", price: "Free", emoji: "🎨", description: "Learn design thinking and UI principles" },
    { id: "8", title: "Figma Complete Course", category: "Design", duration: "6 hrs", level: "Beginner", rating: 4.7, students: 11000, instructor: "Karan Mehta", price: "₹299", emoji: "🖌️", description: "Master Figma for professional UI design" },
    { id: "9", title: "Motion Graphics with After Effects", category: "Design", duration: "14 hrs", level: "Intermediate", rating: 4.5, students: 4500, instructor: "Pooja Verma", price: "₹799", emoji: "🎬", description: "Create stunning animations and motion graphics" },

    // Finance
    { id: "10", title: "Stock Market for Beginners", category: "Finance", duration: "6 hrs", level: "Beginner", rating: 4.6, students: 18000, instructor: "Suresh Iyer", price: "Free", emoji: "📈", description: "Understand stock markets and investing basics" },
    { id: "11", title: "Personal Finance & Budgeting", category: "Finance", duration: "4 hrs", level: "Beginner", rating: 4.8, students: 22000, instructor: "Meera Pillai", price: "Free", emoji: "💰", description: "Take control of your finances and savings" },
    { id: "12", title: "Financial Modeling in Excel", category: "Finance", duration: "12 hrs", level: "Advanced", rating: 4.7, students: 7800, instructor: "Arun Gupta", price: "₹899", emoji: "📊", description: "Build professional financial models" },

    // Marketing
    { id: "13", title: "Digital Marketing Bootcamp", category: "Marketing", duration: "10 hrs", level: "Beginner", rating: 4.7, students: 19000, instructor: "Divya Kapoor", price: "Free", emoji: "📣", description: "Complete digital marketing from SEO to ads" },
    { id: "14", title: "Social Media Marketing", category: "Marketing", duration: "6 hrs", level: "Beginner", rating: 4.6, students: 14000, instructor: "Rohit Jain", price: "₹399", emoji: "📱", description: "Grow brands on Instagram, LinkedIn & more" },
    { id: "15", title: "Content Writing Masterclass", category: "Marketing", duration: "5 hrs", level: "Beginner", rating: 4.5, students: 8900, instructor: "Nisha Sharma", price: "₹299", emoji: "✍️", description: "Write compelling content that converts" },

    // Soft Skills
    { id: "16", title: "Public Speaking & Communication", category: "Soft Skills", duration: "5 hrs", level: "Beginner", rating: 4.9, students: 25000, instructor: "Arjun Menon", price: "Free", emoji: "🎤", description: "Speak confidently in any situation" },
    { id: "17", title: "Leadership & Team Management", category: "Soft Skills", duration: "7 hrs", level: "Intermediate", rating: 4.7, students: 12000, instructor: "Sunita Rao", price: "₹499", emoji: "👥", description: "Lead teams effectively and inspire others" },
    { id: "18", title: "Interview Preparation", category: "Soft Skills", duration: "4 hrs", level: "Beginner", rating: 4.8, students: 31000, instructor: "Kavya Nair", price: "Free", emoji: "🤝", description: "Crack any job interview with confidence" },
];

const categories = ["All", "Tech", "Design", "Finance", "Marketing", "Soft Skills"];

const levelColors = {
    Beginner: { bg: "rgba(16,185,129,0.15)", text: "#10B981", border: "#10B981" },
    Intermediate: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B", border: "#F59E0B" },
    Advanced: { bg: "rgba(239,68,68,0.15)", text: "#EF4444", border: "#EF4444" },
};

export default function CoursesPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const filtered = courses.filter((c) => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.instructor.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase());
        const matchCategory = activeCategory === "All" || c.category === activeCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div style={{ minHeight: "100vh", background: "#080C18", color: "#fff", fontFamily: "'Syne', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .course-card { transition: transform 0.3s, box-shadow 0.3s; }
        .course-card:hover { transform: translateY(-6px); }
        .cat-btn { transition: all 0.2s; cursor: pointer; border: none; font-family: 'Syne', sans-serif; }
        .search-input::placeholder { color: #6B7280; }
        .search-input:focus { outline: none; border-color: #6C63FF; }
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
                    style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}
                >
                    <img src="/logo.png" alt="JobsIn360" style={{ width: 80,height: 80, objectFit: "contain" }} />
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
                <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.15) 0%, transparent 60%)",
                    pointerEvents: "none"
                }} />
                <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
                    Explore <span style={{
                        background: "linear-gradient(90deg, #6C63FF, #DB2777)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                    }}>Courses</span>
                </h1>
                <p style={{ color: "#9CA3AF", fontSize: 16, fontFamily: "'DM Sans', sans-serif", marginBottom: 40 }}>
                    Learn from industry experts and upskill at your own pace
                </p>

                {/* Search */}
                <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
                    <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search courses, instructors..."
                        className="search-input"
                        style={{
                            width: "100%",
                            padding: "16px 20px 16px 52px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1.5px solid rgba(255,255,255,0.1)",
                            borderRadius: 16,
                            color: "#fff",
                            fontSize: 15,
                            fontFamily: "'DM Sans', sans-serif",
                            boxSizing: "border-box",
                        }}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 18 }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* ── CATEGORY FILTERS ── */}
            <div style={{ padding: "0 40px 32px", display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className="cat-btn"
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: "10px 20px",
                            borderRadius: 100,
                            fontSize: 14,
                            fontWeight: 600,
                            background: activeCategory === cat ? "linear-gradient(135deg, #6C63FF, #DB2777)" : "rgba(255,255,255,0.05)",
                            color: activeCategory === cat ? "#fff" : "#9CA3AF",
                            border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        {cat === "All" ? "🌟 All" :
                            cat === "Tech" ? "💻 Tech" :
                                cat === "Design" ? "🎨 Design" :
                                    cat === "Finance" ? "💰 Finance" :
                                        cat === "Marketing" ? "📣 Marketing" :
                                            "🧠 Soft Skills"}
                    </button>
                ))}
            </div>

            {/* ── RESULTS COUNT ── */}
            <div style={{ padding: "0 40px 20px", maxWidth: 1200, margin: "0 auto" }}>
                <p style={{ color: "#6B7280", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                    {filtered.length} courses found
                    {search && <span> for "<span style={{ color: "#6C63FF" }}>{search}</span>"</span>}
                    {activeCategory !== "All" && <span> in <span style={{ color: "#6C63FF" }}>{activeCategory}</span></span>}
                </p>
            </div>

            {/* ── COURSES GRID ── */}
            <div style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
                {filtered.length === 0 ? (
                    /* No Results */
                    <div style={{ textAlign: "center", padding: "80px 20px" }}>
                        <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                        <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>No courses found</h3>
                        <p style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>
                            Try different keywords or browse all categories
                        </p>
                        <button
                            onClick={() => { setSearch(""); setActiveCategory("All"); }}
                            style={{ marginTop: 24, background: "#6C63FF", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: 24,
                    }}>
                        {filtered.map((course) => (
                            <div
                                key={course.id}
                                className="course-card"
                                onMouseEnter={() => setHoveredId(course.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    background: "#111827",
                                    borderRadius: 20,
                                    border: hoveredId === course.id ? "1px solid #6C63FF" : "1px solid rgba(255,255,255,0.08)",
                                    overflow: "hidden",
                                    boxShadow: hoveredId === course.id ? "0 20px 40px rgba(108,99,255,0.2)" : "none",
                                    cursor: "pointer",
                                }}
                            >
                                {/* Thumbnail */}
                                <div style={{
                                    height: 140,
                                    background: `linear-gradient(135deg, rgba(108,99,255,0.2), rgba(219,39,119,0.1))`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 64,
                                    position: "relative",
                                }}>
                                    {course.emoji}
                                    {/* Free badge */}
                                    {course.price === "Free" && (
                                        <span style={{
                                            position: "absolute", top: 12, right: 12,
                                            background: "rgba(16,185,129,0.2)",
                                            border: "1px solid #10B981",
                                            color: "#10B981",
                                            fontSize: 11, fontWeight: 700,
                                            padding: "4px 10px", borderRadius: 100,
                                        }}>
                                            FREE
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ padding: "20px" }}>
                                    {/* Category + Level */}
                                    <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                                        <span style={{
                                            fontSize: 11, fontWeight: 600, color: "#6C63FF",
                                            background: "rgba(108,99,255,0.15)", padding: "3px 10px", borderRadius: 100,
                                        }}>
                                            {course.category}
                                        </span>
                                        <span style={{
                                            fontSize: 11, fontWeight: 600,
                                            color: levelColors[course.level].text,
                                            background: levelColors[course.level].bg,
                                            border: `1px solid ${levelColors[course.level].border}`,
                                            padding: "3px 10px", borderRadius: 100,
                                        }}>
                                            {course.level}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>
                                        {course.title}
                                    </h3>

                                    {/* Description */}
                                    <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.5, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
                                        {course.description}
                                    </p>

                                    {/* Instructor */}
                                    <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
                                        👨‍🏫 {course.instructor}
                                    </p>

                                    {/* Stats */}
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                        <div style={{ display: "flex", gap: 12 }}>
                                            <span style={{ color: "#9CA3AF", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                                                ⏱️ {course.duration}
                                            </span>
                                            <span style={{ color: "#9CA3AF", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                                                👥 {course.students.toLocaleString()}
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                            <span style={{ color: "#F59E0B", fontSize: 13 }}>⭐</span>
                                            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{course.rating}</span>
                                        </div>
                                    </div>

                                    {/* Price + Button */}
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: 18, fontWeight: 800, color: course.price === "Free" ? "#10B981" : "#fff" }}>
                                            {course.price}
                                        </span>
                                        <button
                                            onClick={() => router.push("/signup")}
                                            style={{
                                                background: "linear-gradient(135deg, #6C63FF, #DB2777)",
                                                color: "#fff", border: "none",
                                                padding: "10px 20px", borderRadius: 10,
                                                fontSize: 13, fontWeight: 700,
                                                cursor: "pointer", fontFamily: "'Syne', sans-serif",
                                                transition: "opacity 0.2s",
                                            }}
                                        >
                                            Enroll Now →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── FOOTER ── */}
            <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "24px 40px",
                textAlign: "center",
            }}>
                <p style={{ color: "#4B5563", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                    © 2026 JobsIn360. All rights reserved.
                </p>
            </div>
        </div>
    );
}