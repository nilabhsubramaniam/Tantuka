// Utility to handle base path for GitHub Pages deployment
const basePath = '/Tantuka';

export function getImagePath(path) {
    // If path already has basePath, return as is
    if (path.startsWith(basePath)) {
        return path;
    }
    // If it's an external URL, return as is
    if (path.startsWith('http')) {
        return path;
    }
    // Add basePath to the image path
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${cleanPath}`;
}

export default basePath;
