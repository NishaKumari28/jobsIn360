# JobsIn360 - TODO (API wiring test)

## Step 1: Create a manager-friendly test plan (manual)
- [ ] Confirm which API wrappers exist in `src/lib/api.ts`
- [ ] Confirm which pages actually call those wrappers
- [ ] Create steps to prove via browser Network tab

## Step 2: Wire Login page to backend (API connection)
- [ ] Update `src/app/login/page.tsx` to call `verifyLoginOTP` and/or `loginUser` using `src/lib/api.ts`
- [ ] Add simple token handling (e.g., store token in localStorage) or route only after success

## Step 3: Re-test
- [ ] Run `npm run dev`
- [ ] Open `/signup` and verify Network shows `/auth/register` and `/auth/verify-otp`
- [ ] Open `/login` phone flow and verify Network shows login OTP calls

## Step 4: Produce proof for manager
- [ ] Record short demo showing request+response and UI transition

