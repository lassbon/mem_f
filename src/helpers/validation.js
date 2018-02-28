export const notEmptyOrNumber = name => !!name && Number.isNaN(Number(name))
export const validatePhoneNumer = phone =>
  phone.length === 11 && !Number.isNaN(Number(phone))
