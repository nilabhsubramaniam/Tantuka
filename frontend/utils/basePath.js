// Utility to handle base path for GitHub Pages deployment
const basePath = process.env.BASE_PATH || '';

export function getImagePath(path) {
    // If path already has basePath, return as is
    if (basePath && path.startsWith(basePath)) {
        return path;
    }
    // If it's an external URL, return as is
    if (path.startsWith('http')) {
        return path;
    }
    // Add basePath to the image path (only in production)
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return basePath ? `${basePath}${cleanPath}` : cleanPath;
}

export default basePath;
