# Social Media Sharing Setup

## How It Works

Your travel detail pages now automatically generate proper meta tags for social media sharing. When someone shares a link like `https://www.unitedtravels.co.uk/travels/123`, Facebook, Twitter, and other platforms will show:

- ✅ **Custom title**: The travel package title
- ✅ **Custom description**: First 160 characters of the travel description
- ✅ **Custom image**: The travel package image (1200x630 optimized)
- ✅ **Proper URL structure**: Canonical URLs for SEO

## What Was Added

### 1. Dynamic Metadata Generation
```typescript
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata>
```
- Fetches travel data server-side
- Generates unique meta tags for each travel ID
- Includes Open Graph and Twitter Card tags

### 2. Open Graph Tags
- `og:title` - Travel package title
- `og:description` - Travel description preview
- `og:image` - Travel package image
- `og:url` - Canonical URL
- `og:type` - "website"

### 3. Twitter Card Tags
- `twitter:card` - "summary_large_image"
- `twitter:title` - Travel title
- `twitter:description` - Travel description
- `twitter:image` - Travel image

## Testing Social Sharing

### Facebook Debugger
1. Go to https://developers.facebook.com/tools/debug/
2. Paste your URL: `https://www.unitedtravels.co.uk/travels/1`
3. Click "Debug" to see how Facebook sees your page

### Twitter Card Validator
1. Go to https://cards-dev.twitter.com/validator
2. Paste your URL and validate

### LinkedIn Preview
1. Create a post with your URL
2. LinkedIn will automatically fetch the meta tags

## URL Examples

- `https://www.unitedtravels.co.uk/travels/1` → Shows metadata for travel ID 1
- `https://www.unitedtravels.co.uk/travels/2` → Shows metadata for travel ID 2
- Each page gets unique title, description, and image

## Fallback Behavior

If a travel package doesn't exist:
- Shows "Travel Package Not Found" title
- Uses default site description
- Falls back to site logo image

## Technical Details

- **Server-side rendering**: Meta tags are generated at build/request time
- **Database integration**: Fetches data directly from Prisma
- **SEO optimized**: Includes canonical URLs and proper meta descriptions
- **Performance**: No client-side JavaScript needed for meta tags</content>
<parameter name="filePath">/workspaces/united-travel-tour/SOCIAL_SHARING.md