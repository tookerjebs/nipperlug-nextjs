/**
 * Consistent number formatting utilities to avoid hydration mismatches
 * Uses dots as thousand separators for consistency with WordPress design
 */

export function formatNumber(num: number): string {
  // Use dots as thousand separators (locale-independent, matches WordPress design)
  const rounded = Math.round(num);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatAlz(amount: number): string {
  return `${formatNumber(amount)} Alz`;
}