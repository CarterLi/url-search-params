declare class URLSearchParams {
  constructor(init?: string);
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string;
  getAll(name: string): string[];
  has(name: string): boolean;
  set(name: string, value: string): void;
  // iterable <string, string>
  toString(): string; // stringfier
}
