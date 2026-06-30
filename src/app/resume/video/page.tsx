"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function VideoResumePage() {
  const router = useRouter();

  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera when unmounting (e.g. navigating back)
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      setVideoUrl(null);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setError("Unable to access camera/microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = videoUrl;
      a.download = "my-video-resume.webm";
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="video-page" style={{ fontFamily: "'Syne', sans-serif", background: "#080C18", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        .video-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .btn-primary { background: linear-gradient(135deg, #6C63FF, #DB2777); color: #fff; border: none; padding: 14px 32px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; }
        .btn-outline { background: transparent; color: #fff; border: 1.5px solid #374151; padding: 13px 28px; border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'Syne', sans-serif; }
        .btn-outline:hover { border-color: #6C63FF; color: #6C63FF; }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "16px 40px", background: "rgba(8,12,24,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo.png" alt="JobsIn360" width={48} height={48} style={{ objectFit: "contain" }} />
        </Link>
        <button onClick={() => router.push("/resume")} className="btn-outline" style={{ padding: "10px 20px", fontSize: 14 }}>← Back to Resume Hub</button>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Record or Upload Video</h2>
            <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Introduce yourself in 60 seconds to make a lasting impression.</p>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <input 
              type="file" 
              accept="video/*" 
              ref={fileInputRef} 
              style={{ display: "none" }} 
              onChange={handleFileChange} 
            />
            <button className="btn-outline" onClick={handleUploadClick}>📁 Upload Video</button>
            {isRecording ? (
              <button className="btn-primary" onClick={stopRecording} style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}>⏹ Stop Recording</button>
            ) : (
              <button className="btn-primary" onClick={startRecording} style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}>🔴 Start Recording</button>
            )}
          </div>
        </div>

        <div style={{ background: "#000", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", height: 400, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, overflow: "hidden", position: "relative" }}>
          {!videoUrl && !isRecording && (
            <>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📹</div>
              <p style={{ color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Camera preview will appear here</p>
              {error && <p style={{ color: "#EF4444", fontSize: 14 }}>{error}</p>}
            </>
          )}
          <video 
            ref={videoRef}
            src={videoUrl || undefined}
            autoPlay={isRecording}
            controls={!!videoUrl && !isRecording}
            muted={isRecording}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: (isRecording || videoUrl) ? "block" : "none" }}
          />
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 16 }}>
          <button 
            className="btn-outline" 
            onClick={() => { if (videoRef.current && videoUrl) videoRef.current.play(); }} 
            disabled={!videoUrl || isRecording}
            style={{ opacity: (!videoUrl || isRecording) ? 0.5 : 1, cursor: (!videoUrl || isRecording) ? "not-allowed" : "pointer" }}
          >
            Preview
          </button>
          <button 
            className="btn-primary" 
            onClick={handleDownload} 
            disabled={!videoUrl || isRecording} 
            style={{ opacity: (!videoUrl || isRecording) ? 0.5 : 1, cursor: (!videoUrl || isRecording) ? "not-allowed" : "pointer" }}
          >
            Save & Download
          </button>
        </div>
      </div>
    </div>
  );
}