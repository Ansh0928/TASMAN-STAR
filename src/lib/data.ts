import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';

/** Sanitize handle for use in URLs - only allow alphanumeric and hyphens */
function sanitizeHandleForUrl(handle: string): string {
  return handle.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 50) || 'seafood';
}

export interface ProductRow {
    Handle: string;
    Title: string;
    Location?: string;
    'Option1 Name'?: string;
    'Option1 Value'?: string;
    'Option2 Name'?: string;
    'Option2 Value'?: string;
    'Option3 Name'?: string;
    'Option3 Value'?: string;
    [key: string]: string | undefined;
}

export interface ParsedProduct {
    handle: string;
    title: string;
    location: string;
    price: string;
    image: string;
}

export async function getMockProducts(): Promise<ParsedProduct[]> {
    const csvPath = path.join(process.cwd(), 'public', 'inventory_export.csv');
    let fileContent: string;
    try {
        fileContent = await fs.readFile(csvPath, 'utf-8');
    } catch {
        return [];
    }

    const result = Papa.parse<ProductRow>(fileContent, {
        header: true,
        skipEmptyLines: true,
    });

    const productsMap = new Map<string, ParsedProduct>();

    result.data.forEach((row) => {
        if (!row.Handle || !row.Title) return;

        // We only want to process each product once, picking its primary location for the mock map
        // The real implementation would use Shopify metafields.
        if (!productsMap.has(row.Handle)) {
            let loc = row.Location || 'Tasman Sea'; // Fallback for the map
            // Make the locations match some pseudo-map zones we'll build
            if (loc.includes('LABRADOR') || loc.includes('Labrador')) loc = 'Gold Coast Reefs';
            if (loc.includes('MOLENDINAR')) loc = 'Moreton Bay';

            productsMap.set(row.Handle, {
                handle: row.Handle,
                title: row.Title,
                location: loc, // Mapping Shopify Locations to "Catch Zones" for the mock
                price: "$24.99", // Mocking price since it's an inventory CSV, not full products export
                image: `https://source.unsplash.com/random/400x400/?seafood,${sanitizeHandleForUrl(row.Handle.split('-')[0] || 'seafood')}` // Mock images
            });
        }
    });

    return Array.from(productsMap.values());
}
