export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[6-9]\d{9}$/;
export const aadhaarRegex = /^\d{12}$/;
export const nameRegex = /^[A-Za-z ]{3,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const sectionTimingRegex = /^(15|20|30|45|60)$/;

export const validateTrainerStep1 = (data) => {
  if (!data.profileImage?.uri)
    return { ok: false, msg: 'Please upload a Profile Picture' };

  if (!nameRegex.test(data.name))
    return { ok: false, msg: 'Enter valid full name (min 3 chars)' };

  if (!emailRegex.test(data.email))
    return { ok: false, msg: 'Enter valid email address' };

  if (!phoneRegex.test(data.phno))
    return { ok: false, msg: 'Enter valid 10 digit phone number' };

  if (!data.genderValue)
    return { ok: false, msg: 'Please select your gender' };

  if (!data.expertiseValue)
    return { ok: false, msg: 'Please select your expertise/training field' };

  if (!data.dob)
    return { ok: false, msg: 'Date of Birth is required' };

  if (!data.aadhaar || !aadhaarRegex.test(data.aadhaar))
    return { ok: false, msg: 'Aadhaar must be exactly 12 digits' };

  if (!data.aadhaarImage?.uri)
    return { ok: false, msg: 'Please upload your Aadhaar Image' };

  return { ok: true };
};

export const validateTrainerStep2 = (data) => {
  if (!/^\d{6}$/.test(String(data.pincode || '').trim()))
    return { ok: false, msg: 'Enter a valid 6 digit pincode' };

  if (!data.city?.trim())
    return { ok: false, msg: 'City/Town is required' };

  if (!data.landmark?.trim())
    return { ok: false, msg: 'Landmark is required' };

  if (!data.address?.trim())
    return { ok: false, msg: 'Address is required' };

  if (data.experience === '' || Number.isNaN(Number(data.experience)))
    return { ok: false, msg: 'Please select your years of experience' };

  if (
    data.sectionTiming === null ||
    data.sectionTiming === undefined ||
    data.sectionTiming === '' ||
    !sectionTimingRegex.test(String(data.sectionTiming))
  )
    return { ok: false, msg: 'Please select a valid session duration' };

  if (!String(data.fee || '').trim())
    return { ok: false, msg: 'Session price is required' };

  if (!String(data.sessions || '').trim())
    return { ok: false, msg: 'Number of sessions is required' };

  return { ok: true };
};

export const validateTrainerStep3 = (data) => {
  if (!passwordRegex.test(data.password))
    return { ok: false, msg: 'Password must be 8+ chars with 1 Capital & 1 Number' };

  if (data.password !== data.confirmPassword)
    return { ok: false, msg: 'Password and confirm password must match' };

  if (!data.acceptTerms)
    return { ok: false, msg: 'Please accept the privacy policy and term of use' };

  if (!data.images || data.images.length === 0)
    return { ok: false, msg: 'Please upload at least one certificate image' };

  return { ok: true };
};

export const validateSignup = (data) => {
  if (!nameRegex.test(data.name))
    return { ok: false, msg: 'Enter valid full name (min 3 chars)' };

  if (!emailRegex.test(data.email))
    return { ok: false, msg: 'Enter valid email address' };

  if (!phoneRegex.test(data.phno))
    return { ok: false, msg: 'Enter valid 10 digit phone number' };

  if (!data.dob)
    return { ok: false, msg: 'Date of Birth is required' };

  if (!data.genderValue)
    return { ok: false, msg: 'Please select your gender' };

  if (!data.expertiseValue)
    return { ok: false, msg: 'Please select your expertise/training field' };

  if (!data.aadhaar || !aadhaarRegex.test(data.aadhaar))
    return { ok: false, msg: 'Aadhaar must be exactly 12 digits' };

  if (!passwordRegex.test(data.password))
    return { ok: false, msg: 'Password must be 8+ chars with 1 Capital & 1 Number' };

  const finalLocation =
    [data.landmark, data.address, data.city, data.pincode]
      .filter(Boolean)
      .join(', ') || data.location?.trim();

  if (!finalLocation || finalLocation.length < 5)
    return { ok: false, msg: 'Full location details are required' };

  if (!data.profileImage?.uri)
    return { ok: false, msg: 'Please upload a Profile Picture' };

  if (!data.aadhaarImage?.uri)
    return { ok: false, msg: 'Please upload your Aadhaar Image' };

  if (!data.images || data.images.length === 0)
    return { ok: false, msg: 'Please upload at least one certificate image' };

  if (
    data.sectionTiming === null ||
    data.sectionTiming === undefined ||
    data.sectionTiming === "" ||
    !sectionTimingRegex.test(String(data.sectionTiming))
  ) {
    return {
      ok: false,
      msg: 'Please select a valid session duration (15, 20, 30, 45, or 60 mins)',
    };
  }

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
