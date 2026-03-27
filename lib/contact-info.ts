export const contactInfo = {
  phone: "+5511917619699",
  email: "lorenzopardell@gmail.com",
  whatsappMessage: "Hello! I'm interested in your sound services.",
  get phoneLink() {
    return `tel:${this.phone}`;
  },
  get emailLink() {
    return `mailto:${this.email}`;
  },
  get whatsappLink() {
    return `https://api.whatsapp.com/send?phone=${this.phone}&text=${encodeURIComponent(this.whatsappMessage)}`;
  },
} as const;
