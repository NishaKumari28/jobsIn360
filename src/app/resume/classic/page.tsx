"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Education {
  id: string;
  type: string;
  degreeName: string;
  stream: string;
  board: string;
  schoolName: string;
  passingYear: string;
  marks: string;
  attachment: string;
}

interface ExperienceEntry {
  id: string;
  company: string;
  jobType: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProjectEntry {
  id: string;
  name: string;
  tech: string;
  description: string;
  link: string;
}

interface CertificationEntry {
  id: string;
  courseName: string;
  duration: string;
  description: string;
  link: string;
}

const emptyEducation = (): Education => ({
  id: Date.now().toString() + Math.random(),
  type: "", degreeName: "", stream: "", board: "",
  schoolName: "", passingYear: "", marks: "", attachment: "",
});

const emptyExperience = (): ExperienceEntry => ({
  id: Date.now().toString() + Math.random(),
  company: "", jobType: "Full-time", role: "", startDate: "", endDate: "", description: "",
});

const emptyProject = (): ProjectEntry => ({
  id: Date.now().toString() + Math.random(),
  name: "", tech: "", description: "", link: "",
});

const emptyCertification = (): CertificationEntry => ({
  id: Date.now().toString() + Math.random(),
  courseName: "", duration: "", description: "", link: "",
});

const educationTypes = ["10th", "12th", "Diploma", "UG (Bachelor's)", "PG (Master's)", "PhD", "Other Course"];
const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];

export default function ClassicBuilderPage() {
  const router = useRouter();
  const [classicStep, setClassicStep] = useState(1);

  const [personalData, setPersonalData] = useState({
    name: "", email: "", phone: "", linkedin: "", portfolio: "",
  });

  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([emptyExperience()]);
  const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  const [projectList, setProjectList] = useState<ProjectEntry[]>([emptyProject()]);
  const [certificationList, setCertificationList] = useState<CertificationEntry[]>([emptyCertification()]);
  const [educationList, setEducationList] = useState<Education[]>([emptyEducation()]);
  const [techSkills, setTechSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done">("idle");

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  // Experience
  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string) => {
    setExperienceList(prev => prev.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };
  const addExperience = () => setExperienceList(prev => [...prev, emptyExperience()]);
  const removeExperience = (id: string) => setExperienceList(prev => prev.filter(ex => ex.id !== id));

  // Projects
  const updateProject = (id: string, field: keyof ProjectEntry, value: string) => {
    setProjectList(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  const addProject = () => setProjectList(prev => [...prev, emptyProject()]);
  const removeProject = (id: string) => setProjectList(prev => prev.filter(p => p.id !== id));

  // Certifications
  const updateCertification = (id: string, field: keyof CertificationEntry, value: string) => {
    setCertificationList(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const addCertification = () => setCertificationList(prev => [...prev, emptyCertification()]);
  const removeCertification = (id: string) => setCertificationList(prev => prev.filter(c => c.id !== id));

  // Education
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducationList(prev => prev.map(ed => ed.id === id ? { ...ed, [field]: value } : ed));
  };
  const addEducation = () => setEducationList(prev => [...prev, emptyEducation()]);
  const removeEducation = (id: string) => setEducationList(prev => prev.filter(ed => ed.id !== id));
  const handleEducationFile = (id: string, file: File | null) => {
    if (file) updateEducation(id, "attachment", file.name);
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${personalData.name || "resume"}.pdf`);
  };

  const handleUploadToProfile = () => {
    setUploadStatus("uploading");
    setTimeout(() => {
      const payload = { personalData, hasExperience, experienceList, projectList, certificationList, educationList, techSkills, softSkills };
      localStorage.setItem("savedResume", JSON.stringify(payload));
      setUploadStatus("done");
      setTimeout(() => setUploadStatus("idle"), 2500);
    }, 1000);
  };

  // ── Dynamic step list — skip Experience step if user said "No" after step 2 ──
  const baseSteps = ["Personal Info", "Experience", "Projects", "Certifications", "Education", "Skills", "Preview"];

  return (
    <div className="classic-page" style={{ fontFamily: "'Syne', sans-serif", background: "#080C18", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        .classic-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: linear-gradient(135deg, #6C63FF, #DB2777); color: #fff; border: none; padding: 14px 32px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: 'Syne', sans-serif; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(108,99,255,0.4); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-outline { background: transparent; color: #fff; border: 1.5px solid #374151; padding: 13px 28px; border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; }
        .btn-outline:hover { border-color: #6C63FF; color: #6C63FF; }
        .btn-add { background: rgba(108,99,255,0.1); color: #6C63FF; border: 1.5px dashed #6C63FF; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; width: 100%; }
        .btn-add:hover { background: rgba(108,99,255,0.18); }
        .btn-remove { background: rgba(239,68,68,0.1); color: #EF4444; border: 1px solid rgba(239,68,68,0.3); padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; }
        .btn-remove:hover { background: rgba(239,68,68,0.2); }
        .input-field { width: 100%; background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.08); padding: 14px 18px; border-radius: 12px; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; transition: all 0.2s; }
        .input-field:focus { outline: none; border-color: #6C63FF; background: rgba(108,99,255,0.05); }
        select.input-field { cursor: pointer; }
        select.input-field option { background: #111827; color: #fff; }
        .label { display: block; margin-bottom: 8px; color: #9CA3AF; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; }
        .entry-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
        .entry-num { display: inline-flex; align-items: center; gap: 8px; color: #6C63FF; font-size: 13px; font-weight: 700; }
        .file-btn { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #9CA3AF; padding: 10px 16px; border-radius: 10px; font-size: 13px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .file-btn:hover { border-color: #6C63FF; color: #6C63FF; }
        .choice-btn { padding: 16px 32px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; border: 1.5px solid; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease-out; }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, padding: "16px 40px",
        background: "rgba(8,12,24,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo.png" alt="JobsIn360" width={48} height={48} style={{ objectFit: "contain" }} />
        </Link>
        <button onClick={() => router.push("/resume")} className="btn-outline" style={{ padding: "10px 20px", fontSize: 14 }}>
          ← Back to Resume Hub
        </button>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 40px" }}>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Classic Step-by-Step Builder</h2>
          <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Fill in your details and let us generate a perfect ATS-friendly resume.</p>
        </div>

        {/* Progress Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40, position: "relative" }}>
          <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.1)", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 16, left: 0, width: (((classicStep - 1) / (baseSteps.length - 1)) * 100) + "%", height: 2, background: "#6C63FF", zIndex: 0, transition: "width 0.3s" }} />

          {baseSteps.map((stepName, i) => (
            <div key={i} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: classicStep > i + 1 ? "#6C63FF" : "#080C18",
                border: "2px solid " + (classicStep >= i + 1 ? "#6C63FF" : "rgba(255,255,255,0.2)"),
                display: "flex", alignItems: "center", justifyContent: "center",
                color: classicStep > i + 1 ? "#fff" : classicStep === i + 1 ? "#6C63FF" : "#6B7280",
                fontWeight: 700, fontSize: 13, transition: "all 0.3s"
              }}>
                {classicStep > i + 1 ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 10, color: classicStep >= i + 1 ? "#fff" : "#6B7280", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>{stepName}</span>
            </div>
          ))}
        </div>

        {/* Form Area */}
        <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 20, padding: 32, border: "1px solid rgba(255,255,255,0.05)" }}>

          {/* STEP 1 — PERSONAL INFO */}
          {classicStep === 1 && (
            <div className="fade-up">
              <h3 style={{ fontSize: 20, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>Personal Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div><label className="label">Full Name</label><input name="name" value={personalData.name} onChange={handlePersonalChange} className="input-field" placeholder="John Doe" /></div>
                <div><label className="label">Email Address</label><input name="email" value={personalData.email} onChange={handlePersonalChange} className="input-field" placeholder="john@example.com" /></div>
                <div><label className="label">Phone Number</label><input name="phone" value={personalData.phone} onChange={handlePersonalChange} className="input-field" placeholder="+91 9876543210" /></div>
                <div><label className="label">LinkedIn URL</label><input name="linkedin" value={personalData.linkedin} onChange={handlePersonalChange} className="input-field" placeholder="linkedin.com/in/johndoe" /></div>
                <div style={{ gridColumn: "1 / -1" }}><label className="label">Portfolio Website</label><input name="portfolio" value={personalData.portfolio} onChange={handlePersonalChange} className="input-field" placeholder="https://myportfolio.com" /></div>
              </div>
            </div>
          )}

          {/* STEP 2 — EXPERIENCE */}
          {classicStep === 2 && (
            <div className="fade-up">
              <h3 style={{ fontSize: 20, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>Experience</h3>

              {hasExperience === null && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <p style={{ color: "#9CA3AF", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>Do you have any work experience?</p>
                  <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                    <button className="choice-btn" onClick={() => setHasExperience(true)} style={{ background: "rgba(108,99,255,0.1)", color: "#6C63FF", borderColor: "#6C63FF" }}>Yes, I have experience</button>
                    <button className="choice-btn" onClick={() => setHasExperience(false)} style={{ background: "rgba(255,255,255,0.03)", color: "#9CA3AF", borderColor: "rgba(255,255,255,0.1)" }}>No, I'm a fresher</button>
                  </div>
                </div>
              )}

              {hasExperience === true && (
                <div>
                  {experienceList.map((ex, idx) => (
                    <div key={ex.id} className="entry-card">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <span className="entry-num">💼 Experience #{idx + 1}</span>
                        {experienceList.length > 1 && (
                          <button className="btn-remove" onClick={() => removeExperience(ex.id)}>✕ Remove</button>
                        )}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div><label className="label">Company Name</label><input className="input-field" value={ex.company} onChange={(e) => updateExperience(ex.id, "company", e.target.value)} placeholder="Tech Solutions Inc." /></div>
                        <div><label className="label">Job Type</label><select className="input-field" value={ex.jobType} onChange={(e) => updateExperience(ex.id, "jobType", e.target.value)}>{jobTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                        <div style={{ gridColumn: "1 / -1" }}><label className="label">Role / Job Title</label><input className="input-field" value={ex.role} onChange={(e) => updateExperience(ex.id, "role", e.target.value)} placeholder="Software Engineer" /></div>
                        <div><label className="label">Start Date</label><input type="month" className="input-field" value={ex.startDate} onChange={(e) => updateExperience(ex.id, "startDate", e.target.value)} /></div>
                        <div><label className="label">End Date</label><input type="month" className="input-field" value={ex.endDate} onChange={(e) => updateExperience(ex.id, "endDate", e.target.value)} /></div>
                        <div style={{ gridColumn: "1 / -1" }}><label className="label">Description</label><textarea className="input-field" style={{ minHeight: 90, resize: "vertical" }} value={ex.description} onChange={(e) => updateExperience(ex.id, "description", e.target.value)} placeholder="Describe your responsibilities and achievements..." /></div>
                      </div>
                    </div>
                  ))}
                  <button className="btn-add" onClick={addExperience}>+ Add Another Experience</button>
                  <button onClick={() => setHasExperience(false)} style={{ display: "block", margin: "16px auto 0", background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
                    Actually, I don't have experience
                  </button>
                </div>
              )}

              {hasExperience === false && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
                  <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>No worries! We'll highlight your projects and education instead.</p>
                  <button onClick={() => setHasExperience(null)} style={{ background: "none", border: "none", color: "#6C63FF", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
                    Wait, I do have experience
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — PROJECTS */}
          {classicStep === 3 && (
            <div className="fade-up">
              <h3 style={{ fontSize: 20, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>Projects</h3>
              {projectList.map((p, idx) => (
                <div key={p.id} className="entry-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span className="entry-num">🛠️ Project #{idx + 1}</span>
                    {projectList.length > 1 && <button className="btn-remove" onClick={() => removeProject(p.id)}>✕ Remove</button>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div><label className="label">Project Name</label><input className="input-field" value={p.name} onChange={(e) => updateProject(p.id, "name", e.target.value)} placeholder="E-commerce Website" /></div>
                    <div><label className="label">Tech Stack Used</label><input className="input-field" value={p.tech} onChange={(e) => updateProject(p.id, "tech", e.target.value)} placeholder="React, Node.js, MongoDB" /></div>
                    <div style={{ gridColumn: "1 / -1" }}><label className="label">Project Description</label><textarea className="input-field" style={{ minHeight: 90, resize: "vertical" }} value={p.description} onChange={(e) => updateProject(p.id, "description", e.target.value)} placeholder="What does this project do and what was your role?" /></div>
                    <div style={{ gridColumn: "1 / -1" }}><label className="label">Project Link (GitHub / Live Demo)</label><input className="input-field" value={p.link} onChange={(e) => updateProject(p.id, "link", e.target.value)} placeholder="https://github.com/username/project" /></div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={addProject}>+ Add Another Project</button>
            </div>
          )}

          {/* STEP 4 — CERTIFICATIONS (NEW) */}
          {classicStep === 4 && (
            <div className="fade-up">
              <h3 style={{ fontSize: 20, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>Certifications / Courses</h3>
              {certificationList.map((c, idx) => (
                <div key={c.id} className="entry-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span className="entry-num">📜 Certification #{idx + 1}</span>
                    {certificationList.length > 1 && <button className="btn-remove" onClick={() => removeCertification(c.id)}>✕ Remove</button>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div><label className="label">Course Name</label><input className="input-field" value={c.courseName} onChange={(e) => updateCertification(c.id, "courseName", e.target.value)} placeholder="React JS Masterclass" /></div>
                    <div><label className="label">Duration</label><input className="input-field" value={c.duration} onChange={(e) => updateCertification(c.id, "duration", e.target.value)} placeholder="3 months / 40 hours" /></div>
                    <div style={{ gridColumn: "1 / -1" }}><label className="label">Description</label><textarea className="input-field" style={{ minHeight: 80, resize: "vertical" }} value={c.description} onChange={(e) => updateCertification(c.id, "description", e.target.value)} placeholder="What did you learn in this course?" /></div>
                    <div style={{ gridColumn: "1 / -1" }}><label className="label">Certificate Link</label><input className="input-field" value={c.link} onChange={(e) => updateCertification(c.id, "link", e.target.value)} placeholder="https://certificate-link.com" /></div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={addCertification}>+ Add Another Certification</button>
            </div>
          )}

          {/* STEP 5 — EDUCATION */}
          {classicStep === 5 && (
            <div className="fade-up">
              <h3 style={{ fontSize: 20, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>Education Details</h3>
              {educationList.map((ed, idx) => (
                <div key={ed.id} className="entry-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span className="entry-num">🎓 Education #{idx + 1}</span>
                    {educationList.length > 1 && <button className="btn-remove" onClick={() => removeEducation(ed.id)}>✕ Remove</button>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div><label className="label">Education Type</label><select className="input-field" value={ed.type} onChange={(e) => updateEducation(ed.id, "type", e.target.value)}><option value="">Select type</option>{educationTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    <div><label className="label">Degree / Course Name</label><input className="input-field" value={ed.degreeName} onChange={(e) => updateEducation(ed.id, "degreeName", e.target.value)} placeholder="B.Tech in Computer Science" /></div>
                    <div><label className="label">Stream / Subject</label><input className="input-field" value={ed.stream} onChange={(e) => updateEducation(ed.id, "stream", e.target.value)} placeholder="Computer Science" /></div>
                    <div><label className="label">Board / University</label><input className="input-field" value={ed.board} onChange={(e) => updateEducation(ed.id, "board", e.target.value)} placeholder="CBSE / Mumbai University" /></div>
                    <div><label className="label">School / College Name</label><input className="input-field" value={ed.schoolName} onChange={(e) => updateEducation(ed.id, "schoolName", e.target.value)} placeholder="IIT Bombay" /></div>
                    <div><label className="label">Passing Year</label><input className="input-field" value={ed.passingYear} onChange={(e) => updateEducation(ed.id, "passingYear", e.target.value)} placeholder="2024" /></div>
                    <div style={{ gridColumn: "1 / -1" }}><label className="label">Percentage / CGPA / Marks</label><input className="input-field" value={ed.marks} onChange={(e) => updateEducation(ed.id, "marks", e.target.value)} placeholder="8.5 CGPA / 85%" /></div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label className="label">Attach Document (Marksheet/Certificate)</label>
                      <label className="file-btn">📎 {ed.attachment || "Choose file to attach"}<input type="file" style={{ display: "none" }} onChange={(e) => handleEducationFile(ed.id, e.target.files?.[0] || null)} /></label>
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn-add" onClick={addEducation}>+ Add Another Education</button>
            </div>
          )}

          {/* STEP 6 — SKILLS */}
          {classicStep === 6 && (
            <div className="fade-up">
              <h3 style={{ fontSize: 20, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>Skills</h3>
              <div style={{ display: "grid", gap: 20 }}>
                <div><label className="label">🛠️ Technical Skills (comma separated)</label><textarea className="input-field" style={{ minHeight: 100, resize: "vertical" }} value={techSkills} onChange={(e) => setTechSkills(e.target.value)} placeholder="React, Node.js, TypeScript, Python, SQL..." /></div>
                <div><label className="label">🤝 Soft Skills (comma separated)</label><textarea className="input-field" style={{ minHeight: 100, resize: "vertical" }} value={softSkills} onChange={(e) => setSoftSkills(e.target.value)} placeholder="Communication, Leadership, Teamwork, Problem Solving..." /></div>
              </div>
            </div>
          )}

          {/* STEP 7 — PREVIEW (ATS-friendly order) */}
          {classicStep === 7 && (
            <div className="fade-up">
              <h3 style={{ fontSize: 20, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>Preview</h3>

              <div ref={previewRef} style={{ background: "#fff", color: "#111", padding: 40, borderRadius: 8, minHeight: 400 }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{personalData.name || "Your Name"}</h1>
                <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>
                  {personalData.email || "email@example.com"} • {personalData.phone || "+91 XXXXX XXXXX"} • {personalData.linkedin || "linkedin.com/in/username"}
                  {personalData.portfolio && <> • {personalData.portfolio}</>}
                </p>

                {/* 1. EXPERIENCE — only if user has it */}
                {hasExperience && experienceList.some(e => e.company || e.role) && (
                  <>
                    <h2 style={{ fontSize: 18, borderBottom: "2px solid #111", paddingBottom: 4, marginBottom: 16, textTransform: "uppercase" }}>Experience</h2>
                    {experienceList.filter(e => e.company || e.role).map((ex) => (
                      <div key={ex.id} style={{ marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                          <span>{ex.role || "Job Title"} at {ex.company || "Company"} {ex.jobType ? `(${ex.jobType})` : ""}</span>
                          <span>{ex.startDate || "Start"} — {ex.endDate || "Present"}</span>
                        </div>
                        <p style={{ marginTop: 6, fontSize: 14, color: "#444", whiteSpace: "pre-wrap" }}>{ex.description}</p>
                      </div>
                    ))}
                  </>
                )}

                {/* 2. PROJECTS */}
                {projectList.some(p => p.name) && (
                  <>
                    <h2 style={{ fontSize: 18, borderBottom: "2px solid #111", paddingBottom: 4, marginBottom: 16, textTransform: "uppercase", marginTop: 24 }}>Projects</h2>
                    {projectList.filter(p => p.name).map((p) => (
                      <div key={p.id} style={{ marginBottom: 16 }}>
                        <div style={{ fontWeight: 700 }}>{p.name} {p.tech ? `— ${p.tech}` : ""}</div>
                        <p style={{ fontSize: 14, color: "#444", marginTop: 4 }}>{p.description}</p>
                        {p.link && <div style={{ fontSize: 13, color: "#6C63FF", marginTop: 4 }}>{p.link}</div>}
                      </div>
                    ))}
                  </>
                )}

                {/* 3. CERTIFICATIONS */}
                {certificationList.some(c => c.courseName) && (
                  <>
                    <h2 style={{ fontSize: 18, borderBottom: "2px solid #111", paddingBottom: 4, marginBottom: 16, textTransform: "uppercase", marginTop: 24 }}>Certifications</h2>
                    {certificationList.filter(c => c.courseName).map((c) => (
                      <div key={c.id} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                          <span>{c.courseName}</span>
                          <span>{c.duration}</span>
                        </div>
                        <p style={{ fontSize: 14, color: "#444", marginTop: 4 }}>{c.description}</p>
                        {c.link && <div style={{ fontSize: 13, color: "#6C63FF", marginTop: 4 }}>{c.link}</div>}
                      </div>
                    ))}
                  </>
                )}

                {/* 4. EDUCATION */}
                {educationList.some(e => e.degreeName || e.schoolName) && (
                  <>
                    <h2 style={{ fontSize: 18, borderBottom: "2px solid #111", paddingBottom: 4, marginBottom: 16, textTransform: "uppercase", marginTop: 24 }}>Education</h2>
                    {educationList.filter(e => e.degreeName || e.schoolName).map((ed) => (
                      <div key={ed.id} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                          <span>{ed.degreeName || ed.type || "Degree"} {ed.stream ? `— ${ed.stream}` : ""}</span>
                          <span>{ed.passingYear || "Year"}</span>
                        </div>
                        <div style={{ color: "#444", fontSize: 14 }}>{ed.schoolName || "Institution"} {ed.board ? `(${ed.board})` : ""} {ed.marks ? `• ${ed.marks}` : ""}</div>
                      </div>
                    ))}
                  </>
                )}

                {/* 5. SKILLS — always last */}
                {(techSkills || softSkills) && (
                  <>
                    <h2 style={{ fontSize: 18, borderBottom: "2px solid #111", paddingBottom: 4, marginBottom: 16, textTransform: "uppercase", marginTop: 24 }}>Skills</h2>
                    {techSkills && <p style={{ fontSize: 14, color: "#444", marginBottom: 6 }}><strong>Technical:</strong> {techSkills}</p>}
                    {softSkills && <p style={{ fontSize: 14, color: "#444" }}><strong>Soft Skills:</strong> {softSkills}</p>}
                  </>
                )}
              </div>

              <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
                <button className="btn-outline" onClick={handleUploadToProfile} disabled={uploadStatus === "uploading"} style={{ flex: 1, minWidth: 200 }}>
                  {uploadStatus === "idle" && "☁️ Upload to Profile"}
                  {uploadStatus === "uploading" && "Uploading..."}
                  {uploadStatus === "done" && "✓ Saved to Profile!"}
                </button>
                <button className="btn-primary" onClick={handleDownloadPDF} style={{ flex: 1, minWidth: 200, background: "linear-gradient(135deg, #10B981, #059669)" }}>
                  Download PDF ⬇️
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            <button className="btn-outline" onClick={() => setClassicStep(prev => Math.max(1, prev - 1))} style={{ visibility: classicStep === 1 ? "hidden" : "visible" }}>
              ← Back
            </button>
            {classicStep < baseSteps.length && (
              <button
                className="btn-primary"
                onClick={() => setClassicStep(prev => prev + 1)}
                disabled={classicStep === 2 && hasExperience === null}
              >
                Next Step →
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}