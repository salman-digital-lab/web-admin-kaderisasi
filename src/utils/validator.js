export const validator = {
  required: { value: true, message: "Wajib diisi" },
  isRequired: (value) => ({ value: value, message: "Wajib diisi" }),
  pattern: (pattern) => ({ value: pattern, message: `tidak sesuai format` }),
  url: {
    value:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    message: `Format URL tidak sesuai`,
  },
  email: {
    value: /\S+@\S+\.\S+/i,
    message: `Format email tidak sesuai`,
  },
  phone: {
    // indonesian phone number regex
    value: /^((\+62|62|0)(\d{2,3}))[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}$/i,
    message: `Format Telp/HP tidak sesuai`,
  },
  min: (min) => ({ value: min, message: `harus minimal bernilai ${min}` }),
  max: (max) => ({ value: max, message: `tidak boleh melebihi ${max}` }),
  minLength: (min) => ({
    value: min,
    message: `harus berisi minimal ${min} karakter`,
  }),
  maxLength: (max) => ({
    value: max,
    message: `tidak boleh melebihi maksimal ${max} karakter`,
  }),
}
