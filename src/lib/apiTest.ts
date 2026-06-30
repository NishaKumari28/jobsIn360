import { registerUser, verifySignupOTP, loginUser, verifyLoginOTP, completeProfile, getProfile } from "./api";

(async () => {
  try {
    console.log("--- Step 1: Register User ---");
    const registerRes = await registerUser("9876543210", "user@gmail.com", "Password@123");
    console.log("Register response:", registerRes);

    console.log("--- Step 2: Verify Signup OTP ---");
    const verifySignupRes = await verifySignupOTP("9876543210", "123456");
    console.log("Verify signup OTP response:", verifySignupRes);

    console.log("--- Step 3: Login User ---");
    const loginRes = await loginUser("9876543210", "Password@123");
    console.log("Login response:", loginRes);

    // Assuming loginRes contains accessToken or similar
    const tokenFromLogin = loginRes?.accessToken || loginRes?.token || "";
    console.log("--- Step 4: Verify Login OTP ---");
    const verifyLoginRes = await verifyLoginOTP("9876543210", "123456");
    console.log("Verify login OTP response:", verifyLoginRes);

    const finalToken = verifyLoginRes?.accessToken || verifyLoginRes?.token || tokenFromLogin;
    if (!finalToken) {
      console.warn("No token obtained; skipping protected endpoints.");
      return;
    }

    console.log("--- Step 5: Complete Profile ---");
    const profileData = {
      fullName: "John Doe",
      age: 25,
      gender: "male",
      userType: "student",
    };
    const completeProfileRes = await completeProfile(finalToken, profileData);
    console.log("Complete profile response:", completeProfileRes);

    console.log("--- Step 6: Get Profile ---");
    const getProfileRes = await getProfile(finalToken);
    console.log("Get profile response:", getProfileRes);
  } catch (err) {
    console.error("Error during API test:", err);
  }
})();
