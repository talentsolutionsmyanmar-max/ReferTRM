/**
 * useBurmese — React hook for SEA-LION v4 powered Burmese translations
 *
 * This hook provides automatic translation of static strings to Burmese using
 * the SEA-LION v4 model. Translations are cached in sessionStorage for performance.
 *
 * Usage:
 *   const { t, strings } = useBurmese({
 *     welcome: 'Welcome to ReferTRM',
 *     subtitle: 'Myanmar\'s referral hiring platform'
 *   });
 *
 *   return <h1>{t('welcome')}</h1>;  // Returns Burmese translation if available
 */
'use client';

import { useState, useEffect, useRef } from 'react';

type StringMap = Record<string, string>;

// Session storage key for cached translations
const SESSION_KEY = 'sealion_translations_v1';

/**
 * Hook for managing Burmese translations with SEA-LION v4
 * @param staticStrings - Object mapping keys to English strings
 * @returns Object with t() function and strings state
 */
export function useBurmese(staticStrings: StringMap) {
  const [strings, setStrings] = useState<StringMap>(staticStrings);
  const fetched = useRef(false);

  useEffect(() => {
    // Only fetch once per component mount
    if (fetched.current) return;
    fetched.current = true;

    // Check session cache first
    try {
      const cached = sessionStorage.getItem(SESSION_KEY);
      if (cached) {
        const parsed: StringMap = JSON.parse(cached);
        setStrings(prev => ({ ...prev, ...parsed }));
        return;
      }
    } catch {
      // Ignore cache read errors
    }

    // Fetch translations from SEA-LION v4 in batches of 5
    const keys = Object.keys(staticStrings);

    async function fetchTranslations() {
      const batchSize = 5;
      const results: StringMap = {};

      for (let i = 0; i < keys.length; i += batchSize) {
        const batch = keys.slice(i, i + batchSize);

        try {
          const res = await fetch('/api/translation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              batch.map(key => ({ key, text: staticStrings[key] }))
            )
          });

          if (!res.ok) continue;

          const data = await res.json();
          if (data.translations) {
            Object.assign(results, data.translations);
          }
        } catch {
          // Continue with next batch on error
        }

        // Small delay between batches to avoid rate limits
        if (i + batchSize < keys.length) {
          await new Promise(r => setTimeout(r, 100));
        }
      }

      // Update state and cache
      if (Object.keys(results).length > 0) {
        setStrings(prev => {
          const merged = { ...prev, ...results };
          try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(merged));
          } catch {
            // Ignore cache write errors
          }
          return merged;
        });
      }
    }

    fetchTranslations();
  }, []);

  return {
    t: (key: string) => strings[key] ?? staticStrings[key] ?? key,
    strings,
  };
}
