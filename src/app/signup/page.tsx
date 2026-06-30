"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import { verifySignupOTP } from "@/lib/api";

export default function Signup() {
  const router = useRouter();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState(1);
  const [otpValues, setOtpValues] = useState(["","","","","",""]);

  // Phone flow
  const [phone, setPhone] = useState("");

  // Email flow
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Errors
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState<"main" | "password" | "email">("main");
  const [popupPass, setPopupPass] = useState("");
  const [popupConfirmPass, setPopupConfirmPass] = useState("");
  const [popupEmail, setPopupEmail] = useState("");
  const [popupEmailError, setPopupEmailError] = useState("");
  const [showPopupPass, setShowPopupPass] = useState(false);
  const [showPopupConfirm, setShowPopupConfirm] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.includes("@") || !val.includes(".")) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPassError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setPassError("Passwords do not match");
      return false;
    }
    setPassError("");
    return true;
  };

  const handleEmailSignup = () => {
    const emailOk = validateEmail(email);
    const passOk = validatePassword();
    if (emailOk && passOk) router.push("/welcomecard");
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
            Create Account
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Join JobsIn360 today
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

          {/* ─── PHONE STEP 1 ─── */}
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
  onClick={async () => {
    if (phone.length === 10) {
      try {
        const res = await registerUser(phone);
        if (res.success || res.statusCode === 200 || res.mobileNumber) {
          setStep(2);
        } else {
          alert(res.message || "Something went wrong. Try again!");
        }
      } catch (err) {
        alert("Server se connect nahi ho pa raha. Try again!");
      }
    }
  }}
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

          {/* ─── PHONE STEP 2 — OTP ─── */}
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
                {[0,1,2,3,4,5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
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

              {/* Yahan popup trigger hoga */}
              <button
                onClick={async () => {
                  const otp = otpValues.join(""); // 6 box otp
                  const res = await verifySignupOTP(phone, otp);
                  if (res.success) {
                    setShowPopup(true); //popup show karo
                  } else {
                    alert("Invalid OTP. Please try again!");
                  }
                }}
                disabled={otpValues.join("").length !== 6}
                className={
                  otpValues.join("").length === 6
                    ? "w-full py-3 rounded-xl font-semibold text-white transition-all bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer"
                    : "w-full py-3 rounded-xl font-semibold text-white transition-all bg-[#374151] cursor-not-allowed opacity-50"
                }
              >
                Verify OTP
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
                    emailError ? "border-red-500 focus:border-red-400" : "border-[#374151] focus:border-[#6C63FF]"
                  }`}
                />
                {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1 block">Create Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#6C63FF] transition-all pr-16"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs">
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                          password.length >= i * 2 ? password.length >= 8 ? "bg-green-500" : password.length >= 4 ? "bg-yellow-500" : "bg-red-500" : "bg-[#374151]"
                        }`} />
                      ))}
                    </div>
                    <p className="text-xs mt-1 text-gray-400">{password.length < 4 ? "Weak" : password.length < 8 ? "Medium" : "Strong"} password</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1 block">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full bg-[#1F2937] border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all pr-16 ${
                      confirmPassword.length > 0 && confirmPassword !== password ? "border-red-500" : "border-[#374151] focus:border-[#6C63FF]"
                    }`}
                  />
                  <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs">
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
                {passError && <p className="text-red-400 text-xs mt-1">{passError}</p>}
                {confirmPassword.length > 0 && confirmPassword === password && (
                  <p className="text-green-400 text-xs mt-1">✓ Passwords match</p>
                )}
              </div>

              <button
                onClick={handleEmailSignup}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                  email && password && confirmPassword ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer" : "bg-[#374151] cursor-not-allowed opacity-50"
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {step === 1 && (
            <>
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#1F2937]"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-[#1F2937]"></div>
              </div>
              <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-[#6C63FF] hover:underline cursor-pointer">Login</a>
              </p>
            </>
          )}

          <p className="text-center text-gray-500 text-xs mt-4">
            By continuing, you agree to our{" "}
            <span className="text-[#6C63FF] cursor-pointer">Terms</span> &{" "}
            <span className="text-[#6C63FF] cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>

      {/* ── POPUP ── */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-sm bg-[#111827] rounded-2xl p-6 border border-[#2D1B69] relative"
            style={{ boxShadow: '0 0 30px 4px rgba(139,92,246,0.25), 0 0 60px 8px rgba(219,39,119,0.15)' }}
          >
            {/* ✕ Close — Welcome pe jaao */}
            <button
              onClick={() => router.push("/welcomecard")}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold transition-colors"
            >
              ✕
            </button>

            {/* ── Main Step ── */}
            {popupStep === "main" && (
              <div>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-lg font-bold text-white mb-1">Account Created!</h3>
                  <p className="text-gray-400 text-sm">Want to make login easier next time?</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setPopupStep("password")}
                    className="w-full py-3 px-4 rounded-xl border border-[#374151] hover:border-[#6C63FF] text-white text-sm font-medium transition-all flex items-center gap-3"
                  >
                    <span className="text-xl">🔒</span>
                    <div className="text-left">
                      <div className="font-semibold">Set a Password</div>
                      <div className="text-gray-400 text-xs">Login without OTP next time</div>
                    </div>
                    <span className="ml-auto text-gray-400">→</span>
                  </button>

                  <button
                    onClick={() => setPopupStep("email")}
                    className="w-full py-3 px-4 rounded-xl border border-[#374151] hover:border-[#6C63FF] text-white text-sm font-medium transition-all flex items-center gap-3"
                  >
                    <span className="text-xl">📧</span>
                    <div className="text-left">
                      <div className="font-semibold">Link Email</div>
                      <div className="text-gray-400 text-xs">Connect your Gmail or email</div>
                    </div>
                    <span className="ml-auto text-gray-400">→</span>
                  </button>

                  <button
                    onClick={() => router.push("/welcomecard")}
                    className="w-full py-3 text-gray-500 text-sm hover:text-gray-300 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {/* ── Password Step ── */}
            {popupStep === "password" && (
              <div>
                <button
                  onClick={() => setPopupStep("main")}
                  className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 text-sm"
                >
                  ← Back
                </button>
                <h3 className="text-lg font-bold text-white mb-1">Set Password</h3>
                <p className="text-gray-400 text-sm mb-5">Create a password for easy login</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPopupPass ? "text" : "password"}
                        value={popupPass}
                        onChange={(e) => setPopupPass(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#6C63FF] transition-all pr-16"
                      />
                      <button onClick={() => setShowPopupPass(!showPopupPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs">
                        {showPopupPass ? "Hide" : "Show"}
                      </button>
                    </div>
                    {popupPass.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1">
                          {[1,2,3,4].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                              popupPass.length >= i * 2 ? popupPass.length >= 8 ? "bg-green-500" : popupPass.length >= 4 ? "bg-yellow-500" : "bg-red-500" : "bg-[#374151]"
                            }`} />
                          ))}
                        </div>
                        <p className="text-xs mt-1 text-gray-400">{popupPass.length < 4 ? "Weak" : popupPass.length < 8 ? "Medium" : "Strong"}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPopupConfirm ? "text" : "password"}
                        value={popupConfirmPass}
                        onChange={(e) => setPopupConfirmPass(e.target.value)}
                        placeholder="Re-enter password"
                        className={`w-full bg-[#1F2937] border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all pr-16 ${
                          popupConfirmPass.length > 0 && popupConfirmPass !== popupPass ? "border-red-500" : "border-[#374151] focus:border-[#6C63FF]"
                        }`}
                      />
                      <button onClick={() => setShowPopupConfirm(!showPopupConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs">
                        {showPopupConfirm ? "Hide" : "Show"}
                      </button>
                    </div>
                    {popupConfirmPass.length > 0 && popupConfirmPass === popupPass && (
                      <p className="text-green-400 text-xs mt-1">✓ Passwords match</p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (popupPass.length >= 6 && popupPass === popupConfirmPass) {
                        router.push("/welcomecard");
                      }
                    }}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                      popupPass.length >= 6 && popupPass === popupConfirmPass
                        ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer"
                        : "bg-[#374151] cursor-not-allowed opacity-50"
                    }`}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>
            )}

            {/* ── Email Link Step ── */}
            {popupStep === "email" && (
              <div>
                <button
                  onClick={() => setPopupStep("main")}
                  className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 text-sm"
                >
                  ← Back
                </button>
                <h3 className="text-lg font-bold text-white mb-1">Link Email</h3>
                <p className="text-gray-400 text-sm mb-5">Connect your email for alternative login</p>

                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={popupEmail}
                    onChange={(e) => { setPopupEmail(e.target.value); if (popupEmailError) setPopupEmailError(""); }}
                    placeholder="example@gmail.com"
                    className={`w-full bg-[#1F2937] border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all mb-2 ${
                      popupEmailError ? "border-red-500" : "border-[#374151] focus:border-[#6C63FF]"
                    }`}
                  />
                  {popupEmailError && <p className="text-red-400 text-xs mb-2">{popupEmailError}</p>}

                  <button
                    onClick={() => {
                      if (!popupEmail.includes("@") || !popupEmail.includes(".")) {
                        setPopupEmailError("Please enter a valid email address");
                        return;
                      }
                      router.push("/welcomecard");
                    }}
                    className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                      popupEmail ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer" : "bg-[#374151] cursor-not-allowed opacity-50"
                    }`}
                  >
                    Link & Continue
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </main>
  );
}