"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    // Auto redirect after 4 seconds
    // setTimeout(() => router.push("/watching"), 4000);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-4">

      <div className={`flex flex-col items-center w-full max-w-md transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>

        {/* Logo */}
        <img
          src="/logo.png"
          alt="JobsIn360"
          className="w-28 h-28 object-contain mb-[-52px] z-10 drop-shadow-2xl"
        />

        {/* Card */}
        <div
          className="w-full bg-[#111827] rounded-2xl pt-16 pb-10 px-8 border border-[#2D1B69] text-center"
          style={{
            boxShadow: '0 0 30px 4px rgba(139, 92, 246, 0.25), 0 0 60px 8px rgba(219, 39, 119, 0.15), 0 25px 50px rgba(0,0,0,0.5)'
          }}>

          {/* Emoji / Icon */}
          <div className="text-6xl mb-6 animate-bounce">🎉</div>

          {/* Welcome Text */}
          <h1 className="text-3xl font-bold text-white mb-3">
            Welcome to{" "}
            <span className="text-[#6C63FF]">JobsIn360!</span>
          </h1>

          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            India's most exciting platform is now at your fingertips.
            Let's get started on your journey! 🚀
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-[#1F2937]"></div>
            <span className="text-gray-600 text-xs">YOUR ACCOUNT IS READY</span>
            <div className="flex-1 h-px bg-[#1F2937]"></div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: "🔍", label: "Find Jobs" },
              { icon: "📄", label: "Build Resume" },
              { icon: "🏆", label: "Get Hired" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#1F2937] rounded-xl p-4 flex flex-col items-center gap-2"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-gray-300 text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={() => router.push("/watching")}
            className="w-full py-3 rounded-xl font-semibold text-white bg-[#6C63FF] hover:bg-[#5A52E0] transition-all"
          >
            Let's Go! →
          </button>

          {/* Auto redirect notice
          <p className="text-gray-600 text-xs mt-4">
            Redirecting automatically in a few seconds...
          </p> */}

        </div>
      </div>
    </main>
  );
}