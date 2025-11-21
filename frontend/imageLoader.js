export default function imageLoader({ src, width, quality }) {
    // For absolute URLs, return as is
    if (src.startsWith('http')) {
        return src;
    }
    
    // For production, add the basePath
    const basePath = process.env.NODE_ENV === 'production' ? '/Tantuka' : '';
    
    // Ensure src starts with /
    const cleanSrc = src.startsWith('/') ? src : `/${src}`;
    
    return `${basePath}${cleanSrc}`;
}
