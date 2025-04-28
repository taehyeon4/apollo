/**
 * Search for similar trademarks using USPTO API
 * @param trademarkName The trademark name to search for
 * @returns Array of similar trademark items or null if error occurs
 */
export async function getTrademarkSearch(trademarkName: string) {
  const headers = {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
    'x-rapidapi-host': 'uspto-trademark.p.rapidapi.com',
  };

  try {
    // URL encode the trademark name to handle spaces and special characters
    const encodedTrademark = encodeURIComponent(trademarkName);
    const response = await fetch(
      `https://uspto-trademark.p.rapidapi.com/v1/trademarkSearch/${encodedTrademark}/active`,
      {
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.items || []; // Return just the items array
  } catch (error) {
    console.error(`Error during trademark search: ${error}`);
    return null;
  }
}
