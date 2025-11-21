// Example product data with images
// Copy this structure to add your products

export const sampleProducts = [
    {
        id: 1,
        name: "Elegant White Chikankari Kurta",
        slug: "white-chikankari-kurta",
        images: [
            "/images/products/product-1.jpg",
        ],
        price: 2499,
        originalPrice: 3999,
        description: "Beautiful hand-embroidered Chikankari kurta with intricate patterns",
        category: "Kurtis",
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Pastel Pink Chikankari Dress",
        slug: "pink-chikankari-dress",
        images: [
            "/images/products/product-2.jpg",
        ],
        price: 3299,
        originalPrice: 4999,
        description: "Soft pink dress with traditional Lucknow Chikankari embroidery",
        category: "Dresses",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Traditional Chikankari Saree",
        slug: "traditional-chikankari-saree",
        images: [
            "/images/products/product-3.jpg",
        ],
        price: 5499,
        originalPrice: 7999,
        description: "Traditional Chikankari saree perfect for special occasions",
        category: "Sarees",
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: "Designer Chikankari Kurta Set",
        slug: "designer-kurta-set",
        images: [
            "/images/products/product-4.jpg",
        ],
        price: 3799,
        originalPrice: null,
        description: "Complete kurta set with dupatta featuring delicate Chikankari work",
        category: "Sets",
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: "Elegant Chikankari Collection",
        slug: "elegant-collection",
        images: [
            "/images/products/product-5.jpg",
        ],
        price: 2999,
        originalPrice: 4299,
        description: "Premium Chikankari dress with contemporary design",
        category: "Dresses",
        inStock: true,
        featured: true
    },
    {
        id: 6,
        name: "Classic Chikankari Attire",
        slug: "classic-attire",
        images: [
            "/images/products/product-6.jpg",
        ],
        price: 3499,
        originalPrice: 4999,
        description: "Timeless Chikankari piece perfect for any occasion",
        category: "Ethnic Wear",
        inStock: true,
        featured: true
    }
];

/* 
HOW TO USE THIS:

1. Create your product images and save them in:
   frontend/public/images/products/

2. Update the image paths in the products array above

3. Import this data in your pages:
   import { sampleProducts } from '@/data/sampleProducts';

4. Use in your component:
   {sampleProducts.map(product => (
       <ProductCard key={product.id} product={product} />
   ))}

IMAGE SPECIFICATIONS:
- Format: JPG (for photos)
- Size: 800x1067px (3:4 aspect ratio)
- File size: < 500KB (compress at tinypng.com)
- Quality: High quality, well-lit photos
- Background: White or light colored for consistency

WHERE TO GET IMAGES:
- Free Stock Photos: Unsplash, Pexels, Pixabay
- Search terms: "chikankari", "indian embroidery", "white kurta", "traditional dress"
- Or use your own product photography

NAMING CONVENTION:
- Use descriptive names: product-name-1.jpg, product-name-2.jpg
- Keep filenames lowercase with hyphens
- Number multiple views: -1, -2, -3
*/
