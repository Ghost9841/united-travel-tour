import { prisma } from "@/app/lib/prisma";

/**
 * Default locations to seed into the database
 */
export const DEFAULT_LOCATIONS = [
  'Portugal', 'Greece', 'Italy', 'France', 'Spain', 'Netherlands',
  'Czech Republic', 'Switzerland', 'Austria', 'Ireland', 'Hungary',
  'United Kingdom', 'Scotland', 'Germany', 'Croatia',
];

/**
 * Fetch all locations from the database
 */
export async function getLocations(): Promise<string[]> {
  try {
    // For now, just return the default locations
    // In the future, you could create a Location model if needed
    return DEFAULT_LOCATIONS;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return DEFAULT_LOCATIONS;
  }
}