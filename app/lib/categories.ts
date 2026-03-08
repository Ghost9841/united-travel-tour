import { prisma } from "@/app/lib/prisma";

/**
 * Default categories to seed into the database
 */
export const DEFAULT_CATEGORIES = [
  { name: 'City Tour', description: 'Urban exploration and city culture', color: 'bg-violet-100 text-violet-700' },
  { name: 'Historical', description: 'Historical sites and heritage tours', color: 'bg-amber-100 text-amber-700' },
  { name: 'Romantic', description: 'Romantic getaways and intimate experiences', color: 'bg-pink-100 text-pink-700' },
  { name: 'Adventure', description: 'Action-packed and outdoor adventures', color: 'bg-green-100 text-green-700' },
];

/**
 * Fetch all categories from the database
 */
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return categories.length > 0 ? categories : await seedDefaultCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return DEFAULT_CATEGORIES.map(c => ({ id: 0, ...c, createdAt: new Date(), updatedAt: new Date() }));
  }
}

/**
 * Seed default categories if none exist
 */
async function seedDefaultCategories() {
  try {
    const seeded = await Promise.all(
      DEFAULT_CATEGORIES.map(cat =>
        prisma.category.upsert({
          where: { name: cat.name },
          update: {},
          create: cat,
        })
      )
    );
    return seeded;
  } catch (error) {
    console.error('Error seeding categories:', error);
    return DEFAULT_CATEGORIES.map(c => ({ id: 0, ...c, createdAt: new Date(), updatedAt: new Date() }));
  }
}

/**
 * Get category color styling by name
 */
export function getCategoryColor(categoryName: string): string {
  const colors: Record<string, string> = {
    'City Tour': 'bg-violet-100 text-violet-700',
    'Historical': 'bg-amber-100 text-amber-700',
    'Romantic': 'bg-pink-100 text-pink-700',
    'Adventure': 'bg-green-100 text-green-700',
  };
  return colors[categoryName] ?? 'bg-gray-100 text-gray-600';
}
