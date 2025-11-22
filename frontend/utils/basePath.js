// Utility to handle base path for GitHub Pages deployment
const basePath = process.env.BASE_PATH || '';
const fallbackImage = '/images/products/placeholder.jpg';

export function getImagePath(path) {
    const safePath = path || fallbackImage;

    // If path already has basePath, return as is
    if (basePath && safePath.startsWith(basePath)) {
        return safePath;
    }
    // If it's an external URL, return as is
    if (safePath.startsWith('http')) {
        return safePath;
    }
    // Add basePath to the image path (only in production)
    const cleanPath = safePath.startsWith('/') ? safePath : `/${safePath}`;
    return basePath ? `${basePath}${cleanPath}` : cleanPath;
}

export default basePath;
