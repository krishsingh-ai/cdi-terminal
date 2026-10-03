/**
 * Dynamically generates user avatar initials:
 * - Single name (e.g. 'Kajal') -> First two letters in uppercase ('KA')
 * - Full name (e.g. 'Kajal Kumari') -> First letter of first name and first letter of last name in uppercase ('KK')
 */
export function getUserInitials(name: string): string {
  if (!name) return 'U';
  const trimmed = name.trim();
  if (!trimmed) return 'U';
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const firstInitial = parts[0][0] || '';
  const lastInitial = parts[parts.length - 1][0] || '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export default getUserInitials;
