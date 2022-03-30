export function isValidEmail(email: string) {
  return email && /\S+@\S+\.\S+/.test(email);
}

export function isValidPhoneNumber(phone: string) {
  return phone && /\d{10}/.test(phone);
}

export function isValidPinCode(pin: string) {
  return pin && /\d{6}/.test(pin);
}


export function isValidPassword(password: string) {
  return password && /^(?=.*\d).{8,}$/.test(password);
}
