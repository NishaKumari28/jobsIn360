"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1=phone/email, 2=OTP, 3=new password
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passError, setPassError] = useState("");

  const validateEmail = (val: string) => {
    if (!val.includes("@") || !val.includes(".")) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleNext = () => {
    if (method === "phone" && phone.length === 10) setStep(2);
    if (method === "email" && validateEmail(email)) setStep(2);
  };

  const handleReset = () => {
    if (newPass.length < 6) {
      setPassError("Password must be at least 6 characters");
      return;
    }
    if (newPass !== confirmPass) {
      setPassError("Passwords do not match");
      return;
    }
    setPassError("");
    router.push("/login");
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

          {/* Step 1 — Enter Phone or Email */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white text-center mb-1">
                Forgot Password?
              </h2>
              <p className="text-gray-400 text-sm text-center mb-6">
                No worries! Enter your details to reset it.
              </p>

              {/* Toggle */}
              <div className="flex bg-[#1F2937] rounded-xl p-1 mb-6">
                <button
                  onClick={() => setMethod("phone")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    method === "phone" ? "bg-[#6C63FF] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  📱 Phone
                </button>
                <button
                  onClick={() => setMethod("email")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    method === "email" ? "bg-[#6C63FF] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  📧 Email
                </button>
              </div>

              {/* Phone Input */}
              {method === "phone" && (
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
                    <p className="text-red-400 text-xs mb-2">Please enter a valid 10 digit number</p>
                  )}
                </div>
              )}

              {/* Email Input */}
              {method === "email" && (
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    placeholder="example@email.com"
                    className={`w-full bg-[#1F2937] border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all ${
                      emailError ? "border-red-500" : "border-[#374151] focus:border-[#6C63FF]"
                    }`}
                  />
                  {emailError && (
                    <p className="text-red-400 text-xs mt-1">{emailError}</p>
                  )}
                </div>
              )}

              <button
                onClick={handleNext}
                className={`w-full py-3 mt-6 rounded-xl font-semibold text-white transition-all ${
                  (method === "phone" && phone.length === 10) || (method === "email" && email)
                    ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer"
                    : "bg-[#374151] cursor-not-allowed opacity-50"
                }`}
              >
                Send OTP
              </button>

              <p className="text-center text-gray-400 text-sm mt-6">
                Remember password?{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="text-[#6C63FF] cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </div>
          )}

          {/* Step 2 — OTP Verify */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 text-sm"
              >
                ← Back
              </button>

              <h2 className="text-xl font-bold text-white text-center mb-1">
                Verify OTP
              </h2>
              <p className="text-gray-400 text-sm text-center mb-6">
                Sent to {method === "phone" ? `+91 ${phone}` : email}
              </p>

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

              <button
                onClick={() => setStep(3)}
                className="w-full py-3 rounded-xl font-semibold text-white bg-[#6C63FF] hover:bg-[#5A52E0] transition-all"
              >
                Verify OTP
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Didn't receive OTP?{" "}
                <span className="text-[#6C63FF] cursor-pointer hover:underline">Resend</span>
              </p>
            </div>
          )}

          {/* Step 3 — New Password */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white text-center mb-1">
                Set New Password
              </h2>
              <p className="text-gray-400 text-sm text-center mb-6">
                Create a strong password for your account
              </p>

              <div className="space-y-4">
                {/* New Password */}
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">New Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#6C63FF] transition-all pr-16"
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Password strength */}
                  {newPass.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1,2,3,4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              newPass.length >= i * 2
                                ? newPass.length >= 8 ? "bg-green-500"
                                : newPass.length >= 4 ? "bg-yellow-500"
                                : "bg-red-500"
                                : "bg-[#374151]"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs mt-1 text-gray-400">
                        {newPass.length < 4 ? "Weak" : newPass.length < 8 ? "Medium" : "Strong"} password
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Re-enter password"
                      className={`w-full bg-[#1F2937] border rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all pr-16 ${
                        confirmPass.length > 0 && confirmPass !== newPass
                          ? "border-red-500"
                          : "border-[#374151] focus:border-[#6C63FF]"
                      }`}
                    />
                    <button
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                    >
                      {showConfirm ? "Hide" : "Show"}
                    </button>
                  </div>
                  {passError && (
                    <p className="text-red-400 text-xs mt-1">{passError}</p>
                  )}
                  {confirmPass.length > 0 && confirmPass === newPass && (
                    <p className="text-green-400 text-xs mt-1">✓ Passwords match</p>
                  )}
                </div>

                <button
                  onClick={handleReset}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                    newPass && confirmPass
                      ? "bg-[#6C63FF] hover:bg-[#5A52E0] cursor-pointer"
                      : "bg-[#374151] cursor-not-allowed opacity-50"
                  }`}
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}