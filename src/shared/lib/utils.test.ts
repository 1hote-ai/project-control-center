import { describe, it, expect } from 'vitest';
import { cn, formatNumber, truncateText, getInitials } from './utils';

describe('utils', () => {
  it('cn() correctly merges tailwind classes', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('formatNumber() formats with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('truncateText() correctly truncates long strings', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...');
    expect(truncateText('Hi', 5)).toBe('Hi');
  });

  it('getInitials() returns 2 initials', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Alice')).toBe('A');
  });
});
