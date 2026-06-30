"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef } from "react";

// --- Types ---
type ResumeData = {
  personal: { name: string; title: string; email: string; phone: string; links: string };
  experience: { id: string; company: string; role: string; date: string; points: string[] }[];
  education: { id: string; school: string; degree: string; date: string; info: string }[];
  projects: { id: string; name: string; tools: string; points: string[] }[];
  skills: { id: string; category: string; items: string }[];
  layout: "exp-swe" | "fresh-swe" | "custom";
  sectionsOrder: string[];
};

// --- Initial Data ---
const initialExpData: ResumeData = {
  layout: "exp-swe",
  sectionsOrder: ["experience", "education", "skills"],
  personal: { name: "John Doe", title: "Senior Software Engineer | 5+ Years Experience", email: "john.doe@example.com", phone: "+1 234 567 8900", links: "linkedin.com/in/johndoe" },
  experience: [
    { id: "e1", company: "Tech Corp Inc.", role: "Senior Software Engineer", date: "2020 - Present", points: ["Architected and developed highly scalable microservices using Go and gRPC, serving 1M+ daily active users.", "Improved system latency by 35% through the implementation of advanced Redis caching strategies.", "Mentored a team of 4 junior engineers, conducting weekly code reviews and pair programming sessions."] },
    { id: "e2", company: "Innovate Solutions", role: "Software Engineer", date: "2017 - 2020", points: ["Built a full-stack enterprise dashboard using React and Node.js, increasing operational efficiency by 40%.", "Optimized SQL queries, reducing database load times from 5s to under 500ms."] }
  ],
  education: [
    { id: "edu1", school: "University of California, Berkeley", date: "2013 - 2017", degree: "B.S. in Computer Science", info: "" }
  ],
  projects: [],
  skills: [
    { id: "s1", category: "Languages:", items: "JavaScript (ES6+), TypeScript, Go, Python, SQL" },
    { id: "s2", category: "Frameworks:", items: "React, Next.js, Node.js, Express, Django" },
    { id: "s3", category: "Tools & Cloud:", items: "AWS, Docker, Kubernetes, Git, CI/CD, Redis" }
  ]
};

const initialFreshData: ResumeData = {
  layout: "fresh-swe",
  sectionsOrder: ["education", "projects", "skills"],
  personal: { name: "Jane Smith", title: "Software Engineering Graduate", email: "jane.smith@example.com", phone: "(555) 123-4567", links: "github.com/janesmith • linkedin.com/in/janesmith" },
  experience: [],
  education: [
    { id: "edu1", school: "Massachusetts Institute of Technology (MIT)", date: "May 2024", degree: "B.S. in Computer Science", info: "GPA: 3.9/4.0 | Relevant Coursework: Data Structures, Algorithms, Web Development, Databases" }
  ],
  projects: [
    { id: "p1", name: "E-Commerce Storefront", tools: "React, Node.js, MongoDB", points: ["Built a fully functional e-commerce web application with user authentication and shopping cart functionality.", "Integrated Stripe API for secure payment processing and order management.", "Designed a responsive UI using Tailwind CSS, improving mobile user experience."] },
    { id: "p2", name: "AI Image Generator", tools: "Python, Flask, OpenAI API", points: ["Developed a web application that generates custom images based on user text prompts.", "Implemented rate-limiting and user session management to optimize API usage."] }
  ],
  skills: [
    { id: "s1", category: "Languages:", items: "Java, Python, JavaScript, HTML/CSS, C++" },
    { id: "s2", category: "Technologies:", items: "React, Git, REST APIs, SQL, Firebase, Vercel" }
  ]
};

const initialCustomData: ResumeData = {
  layout: "custom",
  sectionsOrder: [],
  personal: { name: "Your Name", title: "Your Professional Title", email: "email@example.com", phone: "+1 234 567 8900", links: "linkedin.com/in/yourprofile" },
  experience: [],
  education: [],
  projects: [],
  skills: []
};

// --- Editable Components ---
const EditableText = ({ value, onChange, style, tagName = "span", placeholder = "" }: any) => {
  const Tag = tagName as any;
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => onChange(e.currentTarget.textContent || "")}
      style={{ outline: "none", cursor: "text", borderBottom: "1px dashed transparent", minWidth: 20, display: "inline-block", ...style }}
      className="editable-field"
      data-placeholder={placeholder}
    >
      {value}
    </Tag>
  );
};

export default function TemplateBuilderPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [data, setData] = useState<ResumeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#3B82F6");

  const templates = [
    { id: "exp-swe", name: "Experienced Software Engineer", author: "JobsIn360", color: "#10B981", description: "Ideal for senior engineers with a rich project history.", initialData: initialExpData, accent: "#10B981" },
    { id: "fresh-swe", name: "Fresher Software Engineer", author: "JobsIn360", color: "#6C63FF", description: "Perfect for recent graduates focusing on skills and projects.", initialData: initialFreshData, accent: "#6C63FF" },
  ];

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) alert(`File "${e.target.files[0].name}" uploaded successfully!`);
  };

  const openTemplate = (tplData: ResumeData, color: string) => {
    setData(JSON.parse(JSON.stringify(tplData))); // deep copy
    setAccentColor(color);
    setIsModalOpen(true);
  };

  const openCustomLayout = () => {
    setData(JSON.parse(JSON.stringify(initialCustomData)));
    setAccentColor("#333333");
    setIsModalOpen(true);
  };

  const printResume = () => window.print();

  // Update Helpers
  const updatePersonal = (field: string, val: string) => setData((prev: any) => ({ ...prev, personal: { ...prev.personal, [field]: val } }));
  const updateArr = (arr: string, id: string, field: string, val: string) => setData((prev: any) => ({
    ...prev, [arr]: prev[arr].map((item: any) => item.id === id ? { ...item, [field]: val } : item)
  }));
  const updatePoint = (arr: string, itemId: string, pIdx: number, val: string) => setData((prev: any) => ({
    ...prev, [arr]: prev[arr].map((item: any) => item.id === itemId ? { ...item, points: item.points.map((p: string, i: number) => i === pIdx ? val : p) } : item)
  }));
  const addPoint = (arr: string, itemId: string) => setData((prev: any) => ({
    ...prev, [arr]: prev[arr].map((item: any) => item.id === itemId ? { ...item, points: [...item.points, "New detail..."] } : item)
  }));
  const removePoint = (arr: string, itemId: string, pIdx: number) => setData((prev: any) => ({
    ...prev, [arr]: prev[arr].map((item: any) => item.id === itemId ? { ...item, points: item.points.filter((_: any, i: number) => i !== pIdx) } : item)
  }));
  const addSectionItem = (arr: string, emptyItem: any) => setData((prev: any) => ({ ...prev, [arr]: [...prev[arr], { ...emptyItem, id: Date.now().toString() }] }));
  const removeSectionItem = (arr: string, id: string) => setData((prev: any) => ({ ...prev, [arr]: prev[arr].filter((item: any) => item.id !== id) }));

  const addSection = (sectionName: string) => {
    if (!data) return;
    if (!data.sectionsOrder.includes(sectionName)) {
      setData({ ...data, sectionsOrder: [...data.sectionsOrder, sectionName] });
    }
  };

  const removeSection = (sectionName: string) => {
    if (!data) return;
    setData({ ...data, sectionsOrder: data.sectionsOrder.filter(s => s !== sectionName) });
  };

  // Renderers
  const renderExperience = () => (
    <div key="experience" style={{ marginBottom: 24 }} className="section-block relative">
      <div className="no-print hover-controls" style={{ position: "absolute", right: -30, top: 0 }}><button onClick={() => removeSection("experience")} style={{ background: "red", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", padding: "2px 6px" }}>🗑️</button></div>
      <h3 style={{ fontSize: 20, color: "#222", textTransform: "uppercase", letterSpacing: 1, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4, display: "inline-block", marginBottom: 16 }}>Experience</h3>
      {data?.experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: 16 }} className="section-block relative">
          <div className="no-print hover-controls" style={{ position: "absolute", left: -30, top: 0 }}><button onClick={() => removeSectionItem("experience", exp.id)} style={{ background: "#ff4444", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 10 }}>X</button></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <EditableText tagName="p" value={exp.company} onChange={(v: string) => updateArr("experience", exp.id, "company", v)} style={{ margin: 0, fontWeight: "bold", fontSize: 18 }} />
            <EditableText tagName="span" value={exp.date} onChange={(v: string) => updateArr("experience", exp.id, "date", v)} style={{ fontSize: 14, color: "#666" }} />
          </div>
          <EditableText tagName="p" value={exp.role} onChange={(v: string) => updateArr("experience", exp.id, "role", v)} style={{ margin: "4px 0", fontStyle: "italic", color: "#555" }} />
          <ul style={{ fontSize: 14, paddingLeft: 24, lineHeight: 1.6, color: "#444" }}>
            {exp.points.map((pt, i) => (
              <li key={i} className="relative section-block">
                <EditableText tagName="span" value={pt} onChange={(v: string) => updatePoint("experience", exp.id, i, v)} />
                <button className="no-print hover-controls" onClick={() => removePoint("experience", exp.id, i)} style={{ background: "none", border: "none", color: "red", cursor: "pointer", marginLeft: 8 }}>❌</button>
              </li>
            ))}
            <li className="no-print"><button onClick={() => addPoint("experience", exp.id)} style={{ background: "none", border: "1px dashed #ccc", cursor: "pointer", fontSize: 12, padding: "2px 8px" }}>+ Add bullet point</button></li>
          </ul>
        </div>
      ))}
      <div className="no-print"><button onClick={() => addSectionItem("experience", { company: "Company Name", role: "Job Title", date: "Date", points: [] })} style={{ background: "#f0f0f0", border: "none", cursor: "pointer", fontSize: 13, padding: "6px 12px", borderRadius: 4, marginTop: 8 }}>+ Add Experience</button></div>
    </div>
  );

  const renderEducation = () => (
    <div key="education" style={{ marginBottom: 24 }} className="section-block relative">
      <div className="no-print hover-controls" style={{ position: "absolute", right: -30, top: 0 }}><button onClick={() => removeSection("education")} style={{ background: "red", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", padding: "2px 6px" }}>🗑️</button></div>
      <h3 style={{ fontSize: 20, color: "#222", textTransform: "uppercase", letterSpacing: 1, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4, display: "inline-block", marginBottom: 16 }}>Education</h3>
      {data?.education.map(edu => (
        <div key={edu.id} style={{ marginBottom: 16 }} className="section-block relative">
          <div className="no-print hover-controls" style={{ position: "absolute", left: -30, top: 0 }}><button onClick={() => removeSectionItem("education", edu.id)} style={{ background: "#ff4444", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 10 }}>X</button></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <EditableText tagName="p" value={edu.school} onChange={(v: string) => updateArr("education", edu.id, "school", v)} style={{ margin: 0, fontWeight: "bold", fontSize: 16 }} />
            <EditableText tagName="span" value={edu.date} onChange={(v: string) => updateArr("education", edu.id, "date", v)} style={{ fontSize: 14, fontWeight: "bold" }} />
          </div>
          <EditableText tagName="p" value={edu.degree} onChange={(v: string) => updateArr("education", edu.id, "degree", v)} style={{ margin: "4px 0", color: "#444", fontSize: 15 }} />
          <EditableText tagName="p" value={edu.info} onChange={(v: string) => updateArr("education", edu.id, "info", v)} style={{ margin: 0, color: "#666", fontSize: 14 }} />
        </div>
      ))}
      <div className="no-print"><button onClick={() => addSectionItem("education", { school: "School Name", degree: "Degree", date: "Date", info: "" })} style={{ background: "#f0f0f0", border: "none", cursor: "pointer", fontSize: 13, padding: "6px 12px", borderRadius: 4, marginTop: 8 }}>+ Add Education</button></div>
    </div>
  );

  const renderProjects = () => (
    <div key="projects" style={{ marginBottom: 24 }} className="section-block relative">
      <div className="no-print hover-controls" style={{ position: "absolute", right: -30, top: 0 }}><button onClick={() => removeSection("projects")} style={{ background: "red", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", padding: "2px 6px" }}>🗑️</button></div>
      <h3 style={{ fontSize: 20, color: "#222", textTransform: "uppercase", letterSpacing: 1, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4, display: "inline-block", marginBottom: 16 }}>Projects</h3>
      {data?.projects.map(proj => (
        <div key={proj.id} style={{ marginBottom: 16 }} className="section-block relative">
          <div className="no-print hover-controls" style={{ position: "absolute", left: -30, top: 0 }}><button onClick={() => removeSectionItem("projects", proj.id)} style={{ background: "#ff4444", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 10 }}>X</button></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <EditableText tagName="p" value={proj.name} onChange={(v: string) => updateArr("projects", proj.id, "name", v)} style={{ margin: 0, fontWeight: "bold", fontSize: 16 }} />
            <EditableText tagName="span" value={proj.tools} onChange={(v: string) => updateArr("projects", proj.id, "tools", v)} style={{ fontSize: 14, color: "#666" }} />
          </div>
          <ul style={{ fontSize: 14, paddingLeft: 20, marginTop: 8, lineHeight: 1.5, color: "#444" }}>
            {proj.points.map((pt, i) => (
              <li key={i} className="relative section-block">
                <EditableText tagName="span" value={pt} onChange={(v: string) => updatePoint("projects", proj.id, i, v)} />
                <button className="no-print hover-controls" onClick={() => removePoint("projects", proj.id, i)} style={{ background: "none", border: "none", color: "red", cursor: "pointer", marginLeft: 8 }}>❌</button>
              </li>
            ))}
            <li className="no-print"><button onClick={() => addPoint("projects", proj.id)} style={{ background: "none", border: "1px dashed #ccc", cursor: "pointer", fontSize: 12, padding: "2px 8px" }}>+ Add bullet point</button></li>
          </ul>
        </div>
      ))}
      <div className="no-print"><button onClick={() => addSectionItem("projects", { name: "Project Name", tools: "Tools used", points: [] })} style={{ background: "#f0f0f0", border: "none", cursor: "pointer", fontSize: 13, padding: "6px 12px", borderRadius: 4, marginTop: 8 }}>+ Add Project</button></div>
    </div>
  );

  const renderSkills = () => (
    <div key="skills" style={{ marginBottom: 24 }} className="section-block relative">
      <div className="no-print hover-controls" style={{ position: "absolute", right: -30, top: 0 }}><button onClick={() => removeSection("skills")} style={{ background: "red", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", padding: "2px 6px" }}>🗑️</button></div>
      <h3 style={{ fontSize: 20, color: "#222", textTransform: "uppercase", letterSpacing: 1, borderBottom: `2px solid ${accentColor}`, paddingBottom: 4, display: "inline-block", marginBottom: 16 }}>Technical Skills</h3>
      <div style={{ fontSize: 14, lineHeight: 1.8, color: "#444" }}>
        {data?.skills.map(skill => (
          <div key={skill.id} className="section-block relative" style={{ marginBottom: 4 }}>
            <div className="no-print hover-controls" style={{ position: "absolute", left: -30, top: 4 }}><button onClick={() => removeSectionItem("skills", skill.id)} style={{ background: "#ff4444", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 10 }}>X</button></div>
            <strong style={{ display: "inline-block", width: 120 }}>
              <EditableText tagName="span" value={skill.category} onChange={(v: string) => updateArr("skills", skill.id, "category", v)} />
            </strong>
            <EditableText tagName="span" value={skill.items} onChange={(v: string) => updateArr("skills", skill.id, "items", v)} />
          </div>
        ))}
      </div>
      <div className="no-print"><button onClick={() => addSectionItem("skills", { category: "Category:", items: "Skills..." })} style={{ background: "#f0f0f0", border: "none", cursor: "pointer", fontSize: 13, padding: "6px 12px", borderRadius: 4, marginTop: 8 }}>+ Add Skill Category</button></div>
    </div>
  );

  const sectionMap: Record<string, () => React.ReactNode> = {
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    skills: renderSkills
  };

  return (
    <div className="tpl-page" style={{ fontFamily: "'Syne', sans-serif", background: "#080C18", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        .tpl-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: linear-gradient(135deg, #6C63FF, #DB2777); color: #fff; border: none; padding: 14px 32px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; }
        .btn-outline { background: transparent; color: #fff; border: 1.5px solid #374151; padding: 13px 28px; border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'Syne', sans-serif; }
        .btn-outline:hover { border-color: #6C63FF; color: #6C63FF; }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 15px 40px rgba(108,99,255,0.15); }
        
        .editable-field[contenteditable="true"]:empty:before { content: attr(data-placeholder); color: #aaa; cursor: text; }
        .editable-field:hover, .editable-field:focus { border-bottom: 1px dashed #ccc !important; background: rgba(0,0,0,0.02); }
        .hover-controls { opacity: 0; transition: opacity 0.2s; }
        .section-block:hover > .hover-controls { opacity: 1; }
        .relative { position: relative; }

        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* Print styles */
        @media print {
          body * { visibility: hidden; }
          #resume-modal, #resume-modal * { visibility: visible; }
          #resume-modal { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; max-width: 100% !important; background: white !important; box-shadow: none !important; }
          .no-print { display: none !important; }
          #resume-preview { box-shadow: none !important; padding: 0 !important; margin: 0 !important; max-width: none !important; }
        }
      `}</style>

      <nav className="no-print" style={{ position: "sticky", top: 0, zIndex: 100, padding: "16px 40px", background: "rgba(8,12,24,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo.png" alt="JobsIn360" width={48} height={48} style={{ objectFit: "contain" }} />
        </Link>
        <button onClick={() => router.push("/resume")} className="btn-outline" style={{ padding: "10px 20px", fontSize: 14 }}>← Back to Resume Hub</button>
      </nav>

      <div className="no-print" style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Template Gallery</h2>
            <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Choose a pre-built template or build a custom layout.</p>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <input type="file" accept=".pdf,.doc,.docx" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
            <button className="btn-outline" onClick={handleUploadClick}>Upload Template</button>
            <button className="btn-primary" onClick={openCustomLayout}>Create Custom Layout</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {templates.map((tpl) => (
            <div key={tpl.id} className="card-hover" style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ height: 200, background: `linear-gradient(135deg, ${tpl.color}22, rgba(0,0,0,0.5))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ background: "#fff", color: tpl.color, padding: "20px 40px", borderRadius: 8, boxShadow: "0 10px 20px rgba(0,0,0,0.2)", fontSize: 40, fontWeight: "bold" }}>
                  A<span style={{ color: "#aaa" }}>a</span>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{tpl.name}</h4>
                <p style={{ color: "#6B7280", fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>By {tpl.author}</p>
                <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 16 }}>{tpl.description}</p>
                <button className="btn-outline" style={{ width: "100%", padding: "10px", fontSize: 14 }} onClick={() => openTemplate(tpl.initialData, tpl.accent)}>
                  Preview & Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Builder & Preview Modal */}
      {isModalOpen && data && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} className="no-print" onClick={() => setIsModalOpen(false)}>
          <div id="resume-modal" style={{ background: "#f3f4f6", width: "100%", maxWidth: 1100, height: "90vh", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #ddd", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }} className="no-print">
              <div>
                <h3 style={{ color: "#111", fontSize: 18, fontWeight: 700 }}>Resume Builder</h3>
                <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Click on any text to edit. Hover to see add/delete options.</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-outline" style={{ padding: "8px 16px", color: "#333", borderColor: "#ccc" }} onClick={() => setIsModalOpen(false)}>Close</button>
                <button className="btn-primary" style={{ padding: "8px 16px" }} onClick={printResume}>🖨️ Download PDF</button>
              </div>
            </div>
            
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
              {/* Toolbox (Only for custom or modifying layout) */}
              <div className="no-print" style={{ width: 250, background: "#fff", borderRight: "1px solid #ddd", padding: 20, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
                <h4 style={{ color: "#333", fontSize: 15, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Add Sections</h4>
                <button onClick={() => addSection("experience")} disabled={data.sectionsOrder.includes("experience")} className="btn-outline" style={{ color: "#333", borderColor: "#ddd", padding: "8px", fontSize: 14, opacity: data.sectionsOrder.includes("experience") ? 0.5 : 1 }}>+ Experience</button>
                <button onClick={() => addSection("education")} disabled={data.sectionsOrder.includes("education")} className="btn-outline" style={{ color: "#333", borderColor: "#ddd", padding: "8px", fontSize: 14, opacity: data.sectionsOrder.includes("education") ? 0.5 : 1 }}>+ Education</button>
                <button onClick={() => addSection("projects")} disabled={data.sectionsOrder.includes("projects")} className="btn-outline" style={{ color: "#333", borderColor: "#ddd", padding: "8px", fontSize: 14, opacity: data.sectionsOrder.includes("projects") ? 0.5 : 1 }}>+ Projects</button>
                <button onClick={() => addSection("skills")} disabled={data.sectionsOrder.includes("skills")} className="btn-outline" style={{ color: "#333", borderColor: "#ddd", padding: "8px", fontSize: 14, opacity: data.sectionsOrder.includes("skills") ? 0.5 : 1 }}>+ Skills</button>
                
                <h4 style={{ color: "#333", fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Color Accent</h4>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["#10B981", "#6C63FF", "#F59E0B", "#EF4444", "#3B82F6", "#333333"].map(c => (
                    <button key={c} onClick={() => setAccentColor(c)} style={{ width: 30, height: 30, borderRadius: "50%", background: c, border: accentColor === c ? "3px solid #000" : "none", cursor: "pointer" }} />
                  ))}
                </div>
              </div>

              {/* Resume Preview */}
              <div style={{ flex: 1, padding: 40, overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", background: "#f3f4f6" }}>
                <div style={{ color: "#000", fontFamily: data.layout === "fresh-swe" ? "'Inter', sans-serif" : "Arial, sans-serif", padding: "40px", background: "#fff", width: "100%", maxWidth: 800, textAlign: "left", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", minHeight: 1056 }} id="resume-preview">
                  
                  {/* Header */}
                  <div style={{ textAlign: data.layout === "fresh-swe" ? "center" : "left", marginBottom: 32 }}>
                    <EditableText tagName="h1" value={data.personal.name} onChange={(v: string) => updatePersonal("name", v)} style={{ fontSize: 36, margin: 0, color: "#111", letterSpacing: -1 }} />
                    <EditableText tagName="p" value={data.personal.title} onChange={(v: string) => updatePersonal("title", v)} style={{ color: accentColor, fontSize: 18, fontWeight: "bold", marginTop: 8 }} />
                    <div style={{ fontSize: 14, color: "#555", marginTop: 12, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: data.layout === "fresh-swe" ? "center" : "flex-start" }}>
                      <EditableText tagName="span" value={data.personal.email} onChange={(v: string) => updatePersonal("email", v)} />
                      <span>|</span>
                      <EditableText tagName="span" value={data.personal.phone} onChange={(v: string) => updatePersonal("phone", v)} />
                      <span>|</span>
                      <EditableText tagName="span" value={data.personal.links} onChange={(v: string) => updatePersonal("links", v)} />
                    </div>
                  </div>

                  {data.layout === "exp-swe" && <hr style={{ margin: "20px 0", borderTop: "2px solid #eee" }} />}

                  {/* Dynamic Sections */}
                  {data.sectionsOrder.map(section => (
                    <div key={section}>{sectionMap[section]?.()}</div>
                  ))}
                  
                  {data.sectionsOrder.length === 0 && (
                    <div className="no-print" style={{ padding: 40, textAlign: "center", border: "2px dashed #ccc", borderRadius: 8, color: "#888" }}>
                      Start building your custom layout by adding sections from the left menu!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}