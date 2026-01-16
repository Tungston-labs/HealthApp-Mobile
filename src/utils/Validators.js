// utils/validators.js

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[6-9]\d{9}$/;
export const aadhaarRegex = /^\d{12}$/;
export const nameRegex = /^[A-Za-z ]{3,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const validateSignup = (data) => {
  if (!nameRegex.test(data.name))
    return { ok: false, msg: 'Enter valid full name' };

  if (!emailRegex.test(data.email))
    return { ok: false, msg: 'Enter valid email address' };

  if (!phoneRegex.test(data.phno))
    return { ok: false, msg: 'Enter valid 10 digit phone number' };


if (data.aadhaar && !aadhaarRegex.test(data.aadhaar))
  return { ok: false, msg: 'Aadhaar must be 12 digits' };

  if (!passwordRegex.test(data.password))
    return {
      ok: false,
      msg: 'Password must have 1 capital & 1 number',
    };

  if (!data.address)
    return { ok: false, msg: 'Location is required' };

  return { ok: true };
};
