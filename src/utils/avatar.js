const AVATAR_COLORS = [
  'from-violet-600/70 to-violet-900/80',
  'from-zinc-600 to-zinc-800',
  'from-zinc-500 to-zinc-700',
  'from-violet-500/50 to-zinc-800',
]

export function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function getAvatarColor(name) {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}
