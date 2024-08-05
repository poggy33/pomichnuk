import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// export function encrypt(text: string, key: string): string {
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return iv.toString('hex') + ':' + encrypted;
// }

// export function decrypt(text: string, key: string): string {
//   const textParts = text.split(':');
//   const iv = Buffer.from(textParts.shift() as string, 'hex');
//   const encryptedText = textParts.join(':');
//   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
//   let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

function deriveKey(simpleKey: string): Buffer {
  return crypto.createHash('sha256').update(simpleKey).digest();
}

export function encrypt(text: string, simpleKey: string): string {
  const iv = crypto.randomBytes(16);
  const key = deriveKey(simpleKey);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string, simpleKey: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift() as string, 'hex');
  const encryptedText = textParts.join(':');
  const key = deriveKey(simpleKey);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}