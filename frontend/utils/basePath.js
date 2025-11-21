// Utility to handle base path for GitHub Pages deployment
const basePath = process.env.NODE_ENV === 'production' ? '/Tantuka' : '';

export function getAssetPath(path) {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${basePath}/${cleanPath}`;
}

export default basePath;
