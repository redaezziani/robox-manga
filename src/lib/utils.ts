import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Capitalizes the first letter of each word in a given string and replaces 
 * hyphens with spaces.
 *
 * This function performs the following transformations:
 * - Replaces all hyphens (`-`) in the string with spaces (` `).
 * - Capitalizes the first letter of each word (words are defined by word boundaries).
 *
 * For example:
 * - "hello-world" -> "Hello World"
 * - "java-script_is-awesome" -> "Java Script Is Awesome"
 * 
 * @param {string} string - The input string that will be transformed.
 * @returns {string} - The transformed string with capitalized words and hyphens replaced by spaces.
 *
 * @example
 * // Example 1
 * capitalizeFirstLetter("hello-world")
 * // Output: "Hello World"
 *
 * @example
 * // Example 2
 * capitalizeFirstLetter("my-name_is-john")
 * // Output: "My Name Is John"
 */
export function capitalizeFirstLetter(string: string): string {
    return string.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }
  