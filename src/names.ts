const firstNames = [
  'emma',
  'liam',
  'olivia',
  'noah',
  'ava',
  'ethan',
  'isabella',
  'william',
  'sophia',
  'james'
];

const adjectives = [
  'crimson',
  'sapphire',
  'dancing',
  'emerald',
  'amber',
  'violet',
  'mystic',
  'azure',
  'radiant',
  'whispering'
];

export function makeRandomName() {
  // Random adjective and first name, kebab-cased
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const name = firstNames[Math.floor(Math.random() * firstNames.length)];
  return `${adj}-${name}`;
}

export function makeRandomPassword() {
  // 8 random characters
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++)
    password += chars[Math.floor(Math.random() * chars.length)];
  return password;
}
