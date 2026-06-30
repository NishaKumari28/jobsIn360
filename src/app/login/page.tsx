"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyLoginOTP } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState("");

  // OTP boxes for PHONE login
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);


  // Gmail states
  const [showGmailPopup, setShowGmailPopup] = useState(false);
  const [gmailInput, setGmailInput] = useState("");
  const [gmailError, setGmailError] = useState("");

  const validateEmail = (val: string) => {
    if (!val.includes("@") || !val.includes(".")) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleGmailLogin = () => {
    const linkedGmail = localStorage.getItem("linkedGmail");
    if (linkedGmail) {
      router.push("/watching");
    } else {
      setShowGmailPopup(true);
    }
  };

  const handleGmailLink = () => {
    if (!gmailInput.includes("@") || !gmailInput.includes(".")) {
      setGmailError("Please enter a valid Gmail address");
      return;
    }
    localStorage.setItem("linkedGmail", gmailInput);
    router.push("/watching");
  };

  return (
    <main className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-4">
      <div className="flex flex-col items-center w-full max-w-md">

        {/* Logo */}
        <img
          src="/logo.png"
          alt="JobsIn360"
          className="w-24 h-24 object-contain mb-[-48px] z-10 drop-shadow-2xl"
        />

        {/* Card */}
        <div
          className="w-full bg-[#111827] rounded-2xl pt-16 pb-8 px-8 border border-[#2D1B69] transition-transform duration-300 hover:scale-[1.02]"
          style={{
            boxShadow: '0 0 30px 4px rgba(139,92,246,0.25), 0 0 60px 8px rgba(219,39,119,0.15), 0 25px 50px rgba(0,0,0,0.5)'
          }}>

          <h2 className="text-xl font-bold text-white text-center mb-1">
            Welcome Back!
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Login to your JobsIn360 account
          </p>

          {/* Toggle */}
          <div className="flex bg-[#1F2937] rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMethod("phone"); setStep(1); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                method === "phone" ? "bg-[#6C63FF] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              📱 Phone + OTP
            </button>
            <button
              onClick={() => { setMethod("email"); setStep(1); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                method === "email" ? "bg-[#6C63FF] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              📧 Email
            </button>
          </div>

          {/* ─── PHONE FLOW ─── */}
          {method === "phone" && step === 1 && (
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Mobile Number</label>
              <div className="flex gap-2 mb-2">
                <div className="bg-[#1F2937] border border-[#374151] rounded-xl px-4 flex items-center text-white font-medium">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10 digit number"
                  className="flex-1 bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#6C63FF] transition-all"
                />
              </div>
              {phone.length > 0 && phone.length < 10 && (
                <p className="text-red-400 text-xs mb-3">Please enter a valid 10 digit number</p>
              )}
              <button
                onClick={() => phone.length === 10 && setStep(2)}
                className={`w-full py-3 mt-4 rounded-xl font-semibold text-white transition-all ${
                  phone.length === 10
                    ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer"
                    : "bg-[#374151] cursor-not-allowed opacity-50"
                }`}
              >
                Send OTP
              </button>
            </div>
          )}

          {/* ─── PHONE OTP ─── */}
          {method === "phone" && step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 text-sm"
              >
                ← Back
              </button>
              <h3 className="text-white font-semibold mb-1 text-center">Verify OTP</h3>
              <p className="text-gray-400 text-sm mb-6 text-center">Sent to +91 {phone}</p>

              <div className="flex gap-3 justify-center mb-6">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpValues[i]}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      setOtpValues((prev) => {
                        const next = [...prev];
                        next[i] = v.slice(-1);
                        return next;
                      });
                    }}
                    className="w-12 h-12 text-center text-xl font-bold bg-[#1F2937] border border-[#374151] rounded-xl text-white outline-none focus:border-[#6C63FF] transition-all"
                    onKeyUp={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (e.key !== "Backspace" && target.value) {
                        const next = target.nextElementSibling as HTMLInputElement;
                        if (next) next.focus();
                      } else if (e.key === "Backspace") {
                        const prev = target.previousElementSibling as HTMLInputElement;
                        if (prev) prev.focus();
                      }
                    }}
                  />
                ))}
              </div>

              <button
                onClick={async () => {
                  try {
                    const otp = otpValues.join("");
                    if (otp.length !== 6) {
                      alert("Please enter valid 6 digit OTP");
                      return;
                    }
                    const res = await verifyLoginOTP(phone, otp);
                    // backend response shape may vary; handle common success keys
                    if (res?.success || res?.statusCode === 200 || res?.token) {
                      const token = res?.token || res?.accessToken || res?.data?.token;
                      if (token) localStorage.setItem("authToken", token);
                      router.push("/watching");
                    } else {
                      alert(res?.message || "OTP verification failed");
                    }
                  } catch (err) {
                    alert("Unable to connect with server. Try again");
                  }
                }}
                disabled={otpValues.join("").length !== 6}
                className={
                  otpValues.join("").length === 6
                    ? "w-full py-3 rounded-xl font-semibold text-white bg-[#6C63FF] hover:bg-[#5A52E0] transition-all cursor-pointer"
                    : "w-full py-3 rounded-xl font-semibold text-white bg-[#374151] transition-all cursor-not-allowed opacity-50"
                }
              >
                Verify & Login
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Didn't receive OTP?{" "}
                <span className="text-[#6C63FF] cursor-pointer hover:underline">Resend</span>
              </p>
            </div>
          )}


          {/* ─── EMAIL FLOW ─── */}
          {method === "email" && (
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
                  placeholder="example@email.com"
                  className={`w-full bg-[#1F2937] border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all ${
                    emailError ? "border-red-500" : "border-[#374151] focus:border-[#6C63FF]"
                  }`}
                />
                {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1 block">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#6C63FF] transition-all pr-16"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span
                  onClick={() => router.push("/forgot-password")}
                  className="text-[#6C63FF] text-sm cursor-pointer hover:underline"
                >
                  Forgot Password?
                </span>
              </div>

              <button
                onClick={() => {
                  const ok = validateEmail(email);
                  if (ok && password.length > 0) router.push("/watching");
                }}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                  email && password
                    ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer"
                    : "bg-[#374151] cursor-not-allowed opacity-50"
                }`}
              >
                Login
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#1F2937]"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-[#1F2937]"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGmailLogin}
            className="w-full py-3 rounded-xl font-semibold text-white border border-[#374151] hover:border-[#6C63FF] transition-all flex items-center justify-center gap-3 mb-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
              <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
              <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
              <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-gray-400 text-sm">
            New here?{" "}
            <a href="/signup" className="text-[#6C63FF] hover:underline">Create Account</a>
          </p>

          <p className="text-center text-gray-500 text-xs mt-4">
            By continuing, you agree to our{" "}
            <span className="text-[#6C63FF] cursor-pointer">Terms</span> &{" "}
            <span className="text-[#6C63FF] cursor-pointer">Privacy Policy</span>
          </p>

        </div>
      </div>

      {/* ── GMAIL POPUP ── */}
      {showGmailPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-sm bg-[#111827] rounded-2xl p-6 border border-[#2D1B69] relative"
            style={{ boxShadow: '0 0 30px 4px rgba(139,92,246,0.25), 0 0 60px 8px rgba(219,39,119,0.15)' }}
          >
            <button
              onClick={() => setShowGmailPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="text-lg font-bold text-white mb-1">Link Your Gmail</h3>
              <p className="text-gray-400 text-sm">
                Enter your Gmail to link and login instantly next time
              </p>
            </div>

            <label className="text-gray-400 text-xs mb-1 block">Gmail Address</label>
            <input
              type="email"
              value={gmailInput}
              onChange={(e) => { setGmailInput(e.target.value); if (gmailError) setGmailError(""); }}
              placeholder="example@gmail.com"
              className={`w-full bg-[#1F2937] border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all mb-2 ${
                gmailError ? "border-red-500" : "border-[#374151] focus:border-[#6C63FF]"
              }`}
            />
            {gmailError && <p className="text-red-400 text-xs mb-3">{gmailError}</p>}

            <button
              onClick={handleGmailLink}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                gmailInput ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer" : "bg-[#374151] opacity-50 cursor-not-allowed"
              }`}
            >
              Link & Continue →
            </button>

            <button
              onClick={() => setShowGmailPopup(false)}
              className="w-full py-3 text-gray-500 text-sm hover:text-gray-300 transition-colors mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </main>
  );
}