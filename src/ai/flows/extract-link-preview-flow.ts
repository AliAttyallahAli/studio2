
'use server';
/**
 * @fileoverview A flow that extracts link preview data from a URL.
 *
 * - extractLinkPreview - A function that handles the link preview extraction process.
 * - LinkPreviewInput - The input type for the extractLinkPreview function.
 * - LinkPreview - The return type for the extractLinkPreview function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as cheerio from 'cheerio';

const LinkPreviewInputSchema = z.object({
  url: z.string().url().describe('The URL to extract the link preview from.'),
});
export type LinkPreviewInput = z.infer<typeof LinkPreviewInputSchema>;

const LinkPreviewSchema = z.object({
  url: z.string().url().describe('The original URL.'),
  title: z.string().describe('The title of the page.'),
  description: z.string().describe('The description of the page.'),
  image: z.string().optional().describe('The URL of the preview image.'),
});
export type LinkPreview = z.infer<typeof LinkPreviewSchema>;

const getLinkPreview = ai.defineTool(
  {
    name: 'getLinkPreview',
    description: 'Get the link preview data from a URL.',
    inputSchema: LinkPreviewInputSchema,
    outputSchema: LinkPreviewSchema,
  },
  async ({ url }) => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const getMetatag = (name: string) =>
        $(`meta[name="${name}"]`).attr('content') ||
        $(`meta[property="og:${name}"]`).attr('content') ||
        $(`meta[property="twitter:${name}"]`).attr('content');

      const title =
        getMetatag('title') ||
        $('title').first().text() ||
        $('h1').first().text();
      const description =
        getMetatag('description') || $('p').first().text();
      let image = getMetatag('image');

      if (image && !image.startsWith('http')) {
        image = new URL(image, url).toString();
      }

      return {
        url,
        title: title || 'No title found',
        description: description || 'No description found',
        image: image,
      };
    } catch (error: any) {
        console.error('Error fetching link preview:', error);
        // Return a default object or re-throw as needed
        return {
            url,
            title: 'Unable to fetch preview',
            description: error.message || 'Could not connect to the provided URL.',
            image: undefined,
        }
    }
  }
);

const extractLinkPreviewFlow = ai.defineFlow(
  {
    name: 'extractLinkPreviewFlow',
    inputSchema: LinkPreviewInputSchema,
    outputSchema: LinkPreviewSchema,
  },
  async (input) => {
    return await getLinkPreview(input);
  }
);

export async function extractLinkPreview(
  input: LinkPreviewInput
): Promise<LinkPreview> {
  return extractLinkPreviewFlow(input);
}
