

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[6-9]\d{9}$/;
export const aadhaarRegex = /^\d{12}$/;
export const nameRegex = /^[A-Za-z ]{3,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const validateSignup = (data) => {

  if (!nameRegex.test(data.name)) return { ok: false, msg: 'Enter valid full name (min 3 chars)' };
  if (!emailRegex.test(data.email)) return { ok: false, msg: 'Enter valid email address' };
  if (!phoneRegex.test(data.phno)) return { ok: false, msg: 'Enter valid 10 digit phone number' };
  if (!data.dob) return { ok: false, msg: 'Date of Birth is required' };
  if (!data.genderValue) return { ok: false, msg: 'Please select your gender' };
  if (!data.expertiseValue) return { ok: false, msg: 'Please select your expertise/training field' };
  if (!data.aadhaar || !aadhaarRegex.test(data.aadhaar)) 
    return { ok: false, msg: 'Aadhaar must be exactly 12 digits' };
  if (!passwordRegex.test(data.password))
    return { ok: false, msg: 'Password must be 8+ chars with 1 Capital & 1 Number' };
  const finalLocation = data.location?.trim() || [data.landmark, data.address, data.city, data.pincode].filter(Boolean).join(", ");
  if (!finalLocation || finalLocation.length < 5) 
    return { ok: false, msg: 'Full location details are required' };
  if (!data.profileImage?.uri) return { ok: false, msg: 'Please upload a Profile Picture' };
  if (!data.aadhaarImage?.uri) return { ok: false, msg: 'Please upload your Aadhaar Image' };
  if (!data.images || data.images.length === 0) return { ok: false, msg: 'Please upload at least one certificate image' };
if (!data.genderValue) return { ok: false, msg: 'Please select your gender' };
  if (!data.sectionTiming) {
    return { ok: false, msg: 'Please select a session duration (Section Timing)' };
  }
  if (!data.expertiseValue) return { ok: false, msg: 'Please select your expertise' };
  return { ok: true };
};
export const validateUserStep1 = (data) => {
  if (!nameRegex.test(data.name))
    return { ok: false, msg: 'Enter valid full name (min 3 chars)' };

  if (!emailRegex.test(data.email))
    return { ok: false, msg: 'Enter valid email address' };

  if (!phoneRegex.test(data.phno))
    return { ok: false, msg: 'Enter valid 10 digit phone number' };

  if (!passwordRegex.test(data.password))
    return { ok: false, msg: 'Password must be 8+ chars with 1 Capital & 1 Number' };

  if (!data.profile_pic?.uri)
    return { ok: false, msg: 'Please upload a Profile Picture' };

  return { ok: true };
};
export const validateUserStep2 = (data) => {
  if (!data.dob)
    return { ok: false, msg: 'Date of Birth is required' };

  if (!data.genderValue)
    return { ok: false, msg: 'Please select your gender' };

  return { ok: true };
};
