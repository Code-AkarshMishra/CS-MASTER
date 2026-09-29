/**
 * Comprehensive Disposable & Temporary Email Denylist Service
 * Blocks burner emails (tempmail, 10minutemail, mailinator, etc.)
 */

export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  // Popular temporary email services
  "tempmail.com", "temp-mail.org", "tempmail.net", "tempmailaddress.com",
  "10minutemail.com", "10minutemail.net", "10minutemail.org", "10minute.mail",
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.biz",
  "guerrillamail.org", "grr.la", "sharklasers.com", "guerrillamailblock.com",
  "throwawaymail.com", "fakemailgenerator.com", "dispostable.com", "trashmail.com",
  "trashmail.net", "trashmail.me", "yopmail.com", "yopmail.fr", "yopmail.net",
  "crazymailing.com", "getairmail.com", "nada.ltd", "inboxkitten.com",
  "burnermail.io", "maildrop.cc", "emailondeck.com", "mohmal.com",
  "minuteinbox.com", "generator.email", "generator-email.com", "crazymail.com",
  "mytemp.email", "tempinbox.com", "dropmail.me", "fakemail.net",
  "boun.cr", "jetable.org", "trash-mail.at", "trash-mail.com", "wegwerfmail.de",
  "sofort-mail.de", "mailnesia.com", "mailcatch.com", "temp-mail.io",
  "disposablemail.com", "burneremail.com", "throwaway.email", "throwawayemail.com",
  "zillamail.com", "byom.de", "spambog.com", "mailpoof.com", "tmail.ws",
  "proton-temp.com", "anonbox.net", "temp-inbox.com", "temp-mails.com",
  "trashmail.org", "0-mail.com", "spamgourmet.com", "spamex.com", "deadaddress.com",
  "meltmail.com", "disposable.email", "tmpmail.org", "tmpmail.net",
  "harakirimail.com", "incognitomail.org", "mailfreeonline.com", "mintemail.com",
  "safetymail.info", "spamspot.com", "throwawaymailaddress.com", "crazymailing.net",
  "privatemail.org", "mytrashmail.com", "mailsac.com", "nowmymail.com"
]);

// Suspicious/throwaway keywords in email domain
const SUSPICIOUS_DOMAIN_KEYWORDS = [
  "tempmail", "disposable", "fakemail", "trashmail", "throwaway", "10minute",
  "spam4", "guerrilla", "burnermail", "fakeinbox", "inboxkitten", "mailcatch", "tmpmail"
];

export interface EmailValidationResult {
  isValid: boolean;
  reason?: string;
}

/**
 * Validates an email address against syntax rules and disposable domain denylist.
 */
export function validateRegistrationEmail(email: string): EmailValidationResult {
  if (!email || typeof email !== "string") {
    return { isValid: false, reason: "Email address is required." };
  }

  const cleanEmail = email.trim().toLowerCase();
  
  // Basic RFC 5322 regex validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, reason: "Please enter a valid academic or personal email address." };
  }

  const parts = cleanEmail.split("@");
  if (parts.length !== 2) {
    return { isValid: false, reason: "Invalid email format." };
  }

  const domain = parts[1];

  // Check explicit blocklist
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      reason: "Temporary and disposable email addresses are not permitted. Please use a verified college or personal email (e.g. Gmail, Outlook, University domain)."
    };
  }

  // Check domain substrings for spam generators
  for (const keyword of SUSPICIOUS_DOMAIN_KEYWORDS) {
    if (domain.includes(keyword)) {
      return {
        isValid: false,
        reason: "Disposable or burner email domain detected. Please use your authentic university or personal email address."
      };
    }
  }

  return { isValid: true };
}
