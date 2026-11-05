/**
 * Utility helpers for phone number sanitization and URL formatting.
 */

/**
 * Strips all spaces, dashes, parentheses, and leading '+' symbol to ensure
 * the https://wa.me/ URL works across all mobile & desktop WhatsApp clients.
 * Handles local numbers (e.g., 0333... -> 92333...) gracefully.
 *
 * Example: "+92 (333) 271 3381" -> "923332713381"
 */
export function cleanPhoneForWhatsApp(phone: string): string {
  if (!phone) return "";
  let digits = phone.replace(/\D/g, "");
  // Convert local Pakistan number (03xx) to international format (923xx)
  if (digits.startsWith("0") && digits.length === 11) {
    digits = "92" + digits.slice(1);
  }
  return digits;
}

/**
 * Sanitizes phone numbers for standard direct tel: dialing,
 * preserving international '+' prefix while stripping spaces, dashes, and brackets.
 *
 * Example: "+92 (333) 271 3381" -> "+923332713381"
 */
export function cleanPhoneForTel(phone: string): string {
  if (!phone) return "";
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (hasPlus) {
    return `+${digits}`;
  }
  if (digits.startsWith("0") && digits.length === 11) {
    return `+92${digits.slice(1)}`;
  }
  return digits ? `+${digits}` : "";
}

/**
 * Constructs a direct WhatsApp click-to-chat URL with a pre-filled professional inquiry message.
 */
export function getWhatsAppUrl(
  phone: string,
  message: string = "Hi Hassan, I came across your portfolio and would like to connect!"
): string {
  const cleanNumber = cleanPhoneForWhatsApp(phone);
  if (!cleanNumber) return "";
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

