const BASE_URL = "https://jaycob-dubitable-cathodically.ngrok-free.dev";

// Step 1 — Register
export const registerUser = async (
  mobileNumber: string,
  email?: string,
  password?: string
) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobileNumber, email, password }),
  });
  return res.json();
};

// Step 2 — Verify OTP (Signup)
export const verifySignupOTP = async (
  mobileNumber: string,
  otp: string
) => {
  const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobileNumber, otp }),
  });
  return res.json();
};

export const resendSignupOTP = async (mobileOrEmail: string) => {
  // Calls the same verify endpoint with an empty OTP to trigger a resend (backend should handle it)
  // If the backend provides a dedicated resend endpoint, replace the URL accordingly.
  return await verifySignupOTP(mobileOrEmail, "");
};


// Step 3 — Login
export const loginUser = async (mobileNumber: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobileNumber, password }),
  });
  return res.json();
};

// Step 4 — Verify Login OTP → Get Token
export const verifyLoginOTP = async (mobileNumber: string, otp: string) => {
    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobileNumber, otp }),
  });
  return res.json();
};

// Step 7 — Create Sub Account (Bearer token required)
export const createSubAccount = async (
  token: string,
  data: {
    name: string;
    passcode: string;
    userType: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/sub-account/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
export const getSubAccountList = async (token: string) => {
  const res = await fetch(`${BASE_URL}/sub-account/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};
// Step 9 — Update Sub‑Account (Bearer token required)
export const updateSubAccount = async (
  token: string,
  id: string | number,
  data: {
    name?: string;
    passcode?: string;
    userType?: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/sub-account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Step 10 — Delete Sub‑Account (Bearer token required)
export const deleteSubAccount = async (token: string, id: string | number) => {
  const res = await fetch(`${BASE_URL}/sub-account/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const completeProfile = async (
  token: string,
  data: {
    fullName: string;
    age: number;
    gender: string;
    userType: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/profile/complete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Step 6 — Get Profile (Bearer token required)
export const getProfile = async (token: string) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
export {};
