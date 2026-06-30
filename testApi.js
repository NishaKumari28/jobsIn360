(async () => {
  const BASE_URL = "https://jaycob-dubitable-cathodically.ngrok-free.dev";
  const mobileNumber = "9876543210";
  const email = "user@gmail.com";
  const password = "Password@123";
  const otp = "123456";
  try {
    console.log('--- Step 1: Register ---');
    let res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber, email, password })
    });
    let data = await res.json();
    console.log('Register:', data);

    console.log('--- Step 2: Verify Signup OTP ---');
    res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber, otp })
    });
    data = await res.json();
    console.log('Verify Signup OTP:', data);

    console.log('--- Step 3: Login ---');
    res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber, password })
    });
    data = await res.json();
    console.log('Login:', data);
    const tokenFromLogin = data?.accessToken || data?.token || '';

    console.log('--- Step 4: Verify Login OTP ---');
    res = await fetch(`${BASE_URL}/auth/login/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber, otp })
    });
    data = await res.json();
    console.log('Verify Login OTP:', data);
    const finalToken = data?.accessToken || data?.token || tokenFromLogin;
    if (!finalToken) {
      console.warn('No token obtained, skipping protected calls.');
      return;
    }

    console.log('--- Step 5: Complete Profile ---');
    res = await fetch(`${BASE_URL}/profile/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${finalToken}`
      },
      body: JSON.stringify({ fullName: 'John Doe', age: 25, gender: 'male', userType: 'student' })
    });
    data = await res.json();
    console.log('Complete Profile:', data);

    console.log('--- Step 6: Get Profile ---');
    res = await fetch(`${BASE_URL}/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${finalToken}` }
    });
    data = await res.json();
    console.log('Get Profile:', data);
  } catch (err) {
    console.error('Error during API test:', err);
  }
})();
