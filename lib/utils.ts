export function toWhatsAppNumber(telefone: string): string {
  const digits = telefone.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  return `55${digits}`;
}

export function toWhatsAppLink(
  telefone: string | null | undefined,
  message = "Olá! Vi o site de vocês e gostaria de mais informações."
): string | null {
  if (!telefone) return null;
  const number = toWhatsAppNumber(telefone);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
