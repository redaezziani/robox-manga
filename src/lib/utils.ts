import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  return string.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export function generateRandomOffers(count: number) {
  const statuses = ['نشط', 'غير نشط', 'معلق'];
  const countriesList = [
    'الولايات المتحدة',
    'المملكة المتحدة',
    'كندا',
    'فرنسا',
    'ألمانيا',
  ];
  const offers = [];

  for (let i = 1; i <= count; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomCountries = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => countriesList[Math.floor(Math.random() * countriesList.length)]
    );
    const randomDate = new Date(
      Date.now() + Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    )
      .toISOString()
      .split('T')[0];

    offers.push({
      id: i.toString(),
      affiliateNetworkName: `شبكة ${i}`,
      status: randomStatus,
      referenceId: `مرجع ${i}`,
      campaignId: i,
      name: `عرض ${i}`,
      countries: randomCountries,
      description: `وصف العرض ${i} - لوريم إيبسوم دولار سيت أميت، كونسيكتيتور أديبيسكينج إليت.`,
      rules: `قواعد ${i}`,
      expiration_date: randomDate,
      type: `نوع ${i}`,
      payout: Math.floor(Math.random() * 100) + 1,
      available_days: Math.floor(Math.random() * 30) + 1,
      auto_sup: Math.random() < 0.5,
      default_suppression_link: 'https://www.google.com',
      last_suppression_updated_date: randomDate,
      created_at: randomDate,
      updated_at: randomDate,
    });
  }

  return offers;
}
