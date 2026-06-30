"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const animate = (target: number, setter: (v: number) => void, duration: number) => {
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setter(target); clearInterval(timer); }
        else setter(Math.floor(start));
      }, 16);
    };
    animate(50000, setCount1, 2000);
    animate(3200, setCount2, 2000);
    animate(1200, setCount3, 2000);
  }, [statsVisible]);

  const features = [
    {
      icon: "🎓",
      title: "Learn & Upskill",
      desc: "Hundreds of curated courses across tech, design, finance, and more. Learn at your own pace from industry experts.",
      color: "#6C63FF",
      points: ["Live & recorded classes", "Certificate on completion", "Industry-relevant curriculum", "1-on-1 mentorship sessions"],
    },
    {
      icon: "💼",
      title: "Apply for Jobs",
      desc: "Browse thousands of job listings from top companies. Apply directly or through our smart matching system.",
      color: "#DB2777",
      points: ["10,000+ active job listings", "Direct apply or referral", "Smart job recommendations", "Recruiter connects"],
    },
    {
      icon: "📄",
      title: "Build Your Resume",
      desc: "Create a stunning resume with our AI-powered builder. Stand out from the crowd with professional templates.",
      color: "#F59E0B",
      points: ["AI-powered resume builder", "ATS-friendly templates", "Intro video profile", "LinkedIn-style feed"],
    },
  ];

  const steps = [
    { num: "01", title: "Sign Up Free", desc: "Create your account in seconds with just your mobile number or email.", icon: "✨" },
    { num: "02", title: "Choose Your Path", desc: "Pick courses that match your goals — tech, design, marketing, finance & more.", icon: "🗺️" },
    { num: "03", title: "Learn & Grow", desc: "Complete courses, earn certificates, and build real-world portfolio projects.", icon: "📈" },
    { num: "04", title: "Get Hired", desc: "Apply to jobs, connect with recruiters, and land your dream role.", icon: "🏆" },
  ];

  const testimonials = [
    { name: "Priya S.", role: "Software Engineer at TCS", text: "JobsIn360 helped me upskill in React and land my first tech job within 3 months!", avatar: "👩‍💻" },
    { name: "Rahul M.", role: "UI Designer at Infosys", text: "The courses are top-notch and the job board is exactly what I needed. Got hired in 6 weeks!", avatar: "👨‍🎨" },
    { name: "Anjali K.", role: "Data Analyst at Wipro", text: "One platform for everything — learning, resume, and job search. Absolutely love it!", avatar: "👩‍📊" },
  ];

  return (
    <div className="landing"  style={{ fontFamily: "'Syne', sans-serif", background: "#080C18", color: "#fff", overflowX: "hidden" }}>
      <style>{`
      .landing * { box-sizing: border-box; margin: 0; padding: 0; }
      .nav-link { color: #9CA3AF; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; cursor: pointer; }
      .nav-link:hover { color: #fff; }
      .btn-primary { background: linear-gradient(135deg, #6C63FF, #DB2777); color: #fff; border: none; padding: 14px 32px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: 'Syne', sans-serif; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(108,99,255,0.4); }
      .btn-outline { background: transparent; color: #fff; border: 1.5px solid #374151; padding: 13px 28px; border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; }
      .btn-outline:hover { border-color: #6C63FF; color: #6C63FF; }
      .card-hover { transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
      .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(108,99,255,0.2); }
      .feature-tab { padding: 14px 20px; border-radius: 12px; cursor: pointer; transition: all 0.2s; border: 1.5px solid transparent; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px; }
      .shimmer-text { background: linear-gradient(90deg, #6C63FF, #DB2777, #F59E0B, #6C63FF); background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
      .mesh-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(219,39,119,0.1) 0%, transparent 50%); pointer-events: none; }
      .grid-pattern { background-image: linear-gradient(rgba(108,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.06) 1px, transparent 1px); background-size: 60px 60px; }
      .fade-up { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
      .delay-1 { animation-delay: 0.1s; } .delay-2 { animation-delay: 0.2s; } .delay-3 { animation-delay: 0.3s; } .delay-4 { animation-delay: 0.4s; } .delay-5 { animation-delay: 0.5s; }
      .float-anim { animation: float 4s ease-in-out infinite; }
      .pulse-btn { animation: pulse-glow 2.5s ease-in-out infinite; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
      @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(108,99,255,0.3); } 50% { box-shadow: 0 0 40px rgba(108,99,255,0.7); } }
      @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    `}</style> 

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 40px",
        background: scrolled ? "rgba(8,12,24,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="JobsIn360" style={{ width:70, height: 70, objectFit: "contain" }} />
         {/* <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>JobsIn<span style={{ color: "#6C63FF" }}>360</span></span> */}
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Courses", "Jobs", "Resume Builder", "For Recruiters"].map(l => (
  <span
    key={l}
    className="nav-link"
    onClick={() => {
      if (l === "Courses") router.push("/courses");
      if (l === "Jobs") router.push("/jobs");
      if (l === "Resume Builder") router.push("/resume");
      if (l === "For Recruiters") router.push("/recruiter");
    }}
  >
    {l}
  </span>
))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-outline" onClick={() => router.push("/login")} style={{ padding: "10px 22px", fontSize: 14 }}>
            Login
          </button>
          <button className="btn-primary pulse-btn" onClick={() => router.push("/signup")} style={{ padding: "10px 22px", fontSize: 14 }}>
            Get Started Free
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 40px 80px" }}>
        <div className="mesh-bg grid-pattern" />

        {/* Floating orbs */}
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "6%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(219,39,119,0.1), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 820, textAlign: "center", position: "relative", zIndex: 2 }}>
          {/* Badge */}
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.3)", borderRadius: 100, padding: "8px 18px", marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6C63FF", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
            <span style={{ fontSize: 13, color: "#A78BFA", fontWeight: 600 }}>India's First All-in-One Career Platform</span>
          </div>

          <h1 className="fade-up delay-1" style={{ fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 24 }}>
            Learn. Build.<br />
            <span className="shimmer-text">Get Hired.</span>
          </h1>

          <p className="fade-up delay-2" style={{ fontSize: 18, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            One platform for <strong style={{ color: "#fff", fontWeight: 500 }}>skill development</strong>, <strong style={{ color: "#fff", fontWeight: 500 }}>resume building</strong>, and <strong style={{ color: "#fff", fontWeight: 500 }}>job hunting</strong>. No more switching between 5 different apps.
          </p>

          <div className="fade-up delay-3" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => router.push("/signup")} style={{ fontSize: 16, padding: "16px 36px" }}>
              Start Learning Free →
            </button>
            <button className="btn-outline" style={{ fontSize: 16, padding: "16px 36px" }}>
              Watch Demo ▶
            </button>
          </div>

          <p className="fade-up delay-4" style={{ marginTop: 20, color: "#6B7280", fontSize: 13 }}>
            ✓ No credit card required &nbsp;&nbsp; ✓ Free forever plan &nbsp;&nbsp; ✓ 50,000+ learners
          </p>

          {/* Hero visual */}
          <div className="fade-up delay-5 float-anim" style={{ marginTop: 60, position: "relative" }}>
            <div style={{
              background: "linear-gradient(135deg, #111827, #1a1a3e)",
              border: "1px solid rgba(108,99,255,0.3)",
              borderRadius: 24,
              padding: "32px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(108,99,255,0.1)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              maxWidth: 660,
              margin: "0 auto",
            }}>
              {[
                { icon: "🎓", label: "500+ Courses", color: "#6C63FF" },
                { icon: "💼", label: "10K+ Jobs", color: "#DB2777" },
                { icon: "📄", label: "AI Resume", color: "#F59E0B" },
                { icon: "🏆", label: "Certificates", color: "#10B981" },
                { icon: "🤝", label: "Recruiters", color: "#6C63FF" },
                { icon: "📹", label: "Video Profile", color: "#DB2777" },
              ].map((item) => (
                <div key={item.label} className="card-hover" style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  padding: "20px 16px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ padding: "60px 40px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {[
            { value: count1.toLocaleString() + "+", label: "Active Learners", icon: "👥", color: "#6C63FF" },
            { value: count2.toLocaleString() + "+", label: "Partner Companies", icon: "🏢", color: "#DB2777" },
            { value: count3.toLocaleString() + "+", label: "Courses Available", icon: "📚", color: "#F59E0B" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "36px 24px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 42, fontWeight: 800, color: stat.color, letterSpacing: "-1px" }}>{stat.value}</div>
              <div style={{ color: "#6B7280", fontSize: 14, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 40px", position: "relative" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
              Everything You Need,<br /><span className="shimmer-text">In One Place</span>
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, fontFamily: "'DM Sans', sans-serif", maxWidth: 520, margin: "0 auto" }}>
              Stop juggling multiple platforms. JobsIn360 is your complete career ecosystem.
            </p>
          </div>

          {/* Feature tabs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
            {features.map((f, i) => (
              <button
                key={f.title}
                className="feature-tab"
                onClick={() => setActiveFeature(i)}
                style={{
                  background: activeFeature === i ? f.color + "22" : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${activeFeature === i ? f.color : "rgba(255,255,255,0.08)"}`,
                  color: activeFeature === i ? "#fff" : "#9CA3AF",
                }}
              >
                {f.icon} {f.title}
              </button>
            ))}
          </div>

          {/* Feature content */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 56, marginBottom: 20 }}>{features[activeFeature].icon}</div>
              <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, letterSpacing: "-0.5px" }}>
                {features[activeFeature].title}
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.7, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
                {features[activeFeature].desc}
              </p>
              <button className="btn-primary" onClick={() => router.push("/signup")}>
                Get Started →
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {features[activeFeature].points.map((point) => (
                <div key={point} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "20px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}>
                  <span style={{ color: features[activeFeature].color, fontSize: 16, marginTop: 2 }}>✓</span>
                  <span style={{ color: "#D1D5DB", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>
              How It Works
            </h2>
            <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Your journey from learning to landing a job in 4 simple steps</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {steps.map((step, i) => (
              <div key={step.num} className="card-hover" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "32px",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}>
                <div style={{
                  minWidth: 52, height: 52,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${["#6C63FF","#DB2777","#F59E0B","#10B981"][i]}22, transparent)`,
                  border: `1.5px solid ${["#6C63FF","#DB2777","#F59E0B","#10B981"][i]}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ color: ["#6C63FF","#DB2777","#F59E0B","#10B981"][i], fontSize: 12, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>
                    STEP {step.num}
                  </div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{step.title}</h4>
                  <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 40px", position: "relative" }}>
        <div className="mesh-bg" />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>
              Success Stories
            </h2>
            <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Real people, real results</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="card-hover" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "28px",
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{t.avatar}</div>
                <p style={{ color: "#D1D5DB", fontSize: 14, lineHeight: 1.7, marginBottom: 20, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "#6C63FF", fontSize: 12, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(108,99,255,0.15), rgba(219,39,119,0.1))",
            border: "1px solid rgba(108,99,255,0.3)",
            borderRadius: 28,
            padding: "64px 48px",
          }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16 }}>
              Ready to Transform<br />Your Career?
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: 16, marginBottom: 36, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
              Join 50,000+ learners who are already building their future on JobsIn360. It's free to start!
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => router.push("/signup")} style={{ fontSize: 16, padding: "16px 40px" }}>
                Start Free Today →
              </button>
              <button className="btn-outline" onClick={() => router.push("/login")} style={{ fontSize: 16, padding: "16px 32px" }}>
                I have an account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 40px 32px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <img src="/logo.png" alt="JobsIn360" style={{ width: 36, height: 36, objectFit: "contain" }} />
                <span style={{ fontWeight: 800, fontSize: 16 }}>JobsIn<span style={{ color: "#6C63FF" }}>360</span></span>
              </div>
              <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", maxWidth: 260 }}>
                India's first all-in-one career platform. Learn, build your resume, and get hired — all in one place.
              </p>
            </div>
            {[
              { title: "Platform", links: ["Courses", "Job Board", "Resume Builder", "Video Profile"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Press"] },
              { title: "Support", links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: 0.5 }}>{col.title}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(link => (
                    <span key={link} style={{ color: "#6B7280", fontSize: 13, cursor: "pointer", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "#4B5563", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              © 2026 JobsIn360. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Twitter", "LinkedIn", "Instagram", "YouTube"].map(s => (
                <span key={s} style={{ color: "#4B5563", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#6C63FF")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#4B5563")}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
