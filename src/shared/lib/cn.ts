// Простая функция для объединения классов
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}
