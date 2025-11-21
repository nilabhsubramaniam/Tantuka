# Saree Collection Strategy - Hierarchical Structure Plan

## 📋 Overview
Transform Tantuka from a general Chikankari platform to a **Saree-First brand** with a hierarchical collection system based on **Indian States** and their **traditional saree types**.

---

## 🏗️ Current State Analysis

### Existing Architecture
```
Current Database Structure:
├── Categories (Parent-Child relationship)
├── Products (Associated with Categories)
├── Product Variants (SKU, Size, Color, etc.)
└── Product Images
```

### Current Data Model Limitations
- **Categories**: Simple hierarchical with parent_id (2-level max, conceptually)
- **Products**: Basic product info with metadata
- **No explicit**: State, Region, Saree Type, Weave, Fabric, Origin attributes

---

## 📊 Proposed Saree Taxonomy

### Level 1: Saree Type (Root Categories)
```
Sarees
├── Traditional Sarees
│   ├── Kerala Sarees
│   ├── Tamil Nadu Sarees
│   ├── Karnataka Sarees
│   ├── Andhra Pradesh Sarees
│   ├── Uttar Pradesh Sarees (Chikankari - YOUR SPECIALTY)
│   ├── West Bengal Sarees
│   ├── Odisha Sarees
│   ├── Maharashtra Sarees
│   └── [13 more states...]
│
├── Fusion Sarees
│   ├── Contemporary Cuts
│   ├── Pre-stitched
│   └── Draping Innovation
│
└── Seasonal Collections
    ├── Summer
    ├── Winter
    └── Festival
```

### Level 2: State-Based Collections (Parent Categories)
Each state has a primary category with multiple subcategories:

**Example: Kerala Sarees**
```
Kerala Sarees (Parent)
├── Kasavu Sarees (Subcategory)
│   ├── Traditional Kasavu
│   ├── Kasavu with Gold Border
│   └── Modern Kasavu
│
├── Mundum Neryathum (Subcategory)
│   ├── Plain White
│   ├── With Gold Patterns
│   └── Printed Variants
│
├── Tissue Sarees (Subcategory)
└── Art Silk Kerala (Subcategory)
```

**Example: UP Sarees (YOUR PRIMARY)**
```
Uttar Pradesh Sarees (Parent)
├── Lucknow Chikankari (PRIMARY - Emphasis)
│   ├── White Chikankari (Pure Tradition)
│   ├── Colored Chikankari (Contemporary)
│   ├── Mukaish Chikankari (Gold/Silver)
│   └── Zardozi Chikankari (With Beadwork)
│
├── Banarasi Sarees (Subcategory)
│   ├── Pure Banarasi Silk
│   ├── Banarasi Chikankari Blend
│   └── Brocade Banarasi
│
└── Banaras Tissue (Subcategory)
```

### Level 3: Variants (Product Variants)
Each saree product will have variants for:
```
Attributes:
├── Color (White, Beige, Pink, Blue, Green, etc.)
├── Length (Standard 5.5m, 6m, Custom)
├── Blouse Type (Unstitched, Stitched, Patterned)
├── Border Type (Gold, Silver, Colored, Plain)
├── Weave Density (Fine, Medium, Bold)
├── Blouse Fabric (Silk, Cotton, Chiffon)
└── Price Tier (Budget, Mid-range, Premium, Luxury)
```

---

## 🗂️ Database Schema Modifications

### 1. Extend Category Model

**Current:**
```
Category
├── id (PK)
├── name
├── slug
├── parent_id (FK - Self-referential)
├── description
└── created_at
```

**Proposed Addition:**
```
Category
├── id (PK)
├── name
├── slug
├── parent_id (FK)
├── description
├── category_type ENUM ['SAREE_TYPE', 'STATE', 'SUBCATEGORY']
├── state_code VARCHAR(2) [For state-based filtering]
├── display_order INT [Control sorting/priority]
├── image_url TEXT [Category cover image]
├── featured BOOLEAN [Highlight states/types]
└── metadata JSON
    ├── hindi_name
    ├── region_description
    ├── cultural_significance
    ├── price_range_min
    ├── price_range_max
    └── artisan_info
```

### 2. Extend Product Model

**Current:**
```
Product
├── name
├── slug
├── category_id (FK)
├── brand
├── base_price
├── description
├── product_metadata JSON
└── ...
```

**Proposed Addition:**
```
Product
├── ... (existing fields)
├── state_origin VARCHAR(2) [e.g., 'UP' for Uttar Pradesh]
├── saree_type VARCHAR(50) [e.g., 'Lucknow Chikankari']
├── weave_type VARCHAR(100)
├── fabric_type VARCHAR(100)
├── artisan_community VARCHAR(200) [For heritage/story]
├── product_metadata JSON
    ├── length_meters: 5.5
    ├── blouse_included: boolean
    ├── care_instructions: text
    ├── cultural_story: text
    ├── collection_name: string
    ├── artisan_story: text
    ├── heritage_significance: text
    ├── handmade_details: array
    └── color_variants: array
└── featured_story TEXT [Hero story for saree type]
```

### 3. Create New Attributes Table

```
SareeAttribute
├── id (PK)
├── product_id (FK)
├── attribute_name VARCHAR(100)
├── attribute_value VARCHAR(255)
├── attribute_category ENUM ['FABRIC', 'WEAVE', 'BORDER', 'EMBELLISHMENT']
└── display_order INT
```

**Examples:**
```
- Product: Lucknow Chikankari Saree #1
  - FABRIC: "Pure Cotton"
  - WEAVE: "Fine Chikankari with 32 stitches"
  - BORDER: "Gold Tissue Border"
  - EMBELLISHMENT: "Mukaish, Zardozi"
```

---

## 📱 Frontend Structure

### Page Hierarchy

```
/sarees (NEW Landing Page - Saree Focus)
├── Shows all states as card grid
├── Featured "Lucknow Chikankari" prominently
└── Each state card links to:

/sarees/[state] (e.g., /sarees/up)
├── State overview with cultural info
├── Filter by sub-types (Lucknow, Banarasi, etc.)
├── All sarees from that state
└── Each saree links to:

/sarees/[state]/[saree-type]/[slug]
├── Detailed saree view
├── All variants (color, blouse, etc.)
├── Artisan story
├── Care instructions
└── Related sarees
```

### Landing Page Emphasis Strategy

```
/sarees (Saree Collection Home)
├── Hero Section
│   └── "Discover India's Finest Sarees"
│   └── Emphasize Lucknow Chikankari with large banner
│
├── Featured: Lucknow Chikankari Collection
│   └── Premium showcase with 3-4 hero sarees
│   └── "Our Specialty" badge
│   └── Direct link to full UP collection
│
├── Browse by State (Grid)
│   ├── Kerala (Kasavu)
│   ├── Tamil Nadu (Kanchipuram)
│   ├── UP (LUCKNOW - FEATURED/HIGHLIGHTED)
│   ├── West Bengal (Tant/Baluchuri)
│   ├── Odisha (Sambalpuri)
│   ├── Karnataka (Coorg/Mysore)
│   └── ... [More states]
│
├── Collection Types (Alternative Filter)
│   ├── Traditional (Most specific)
│   ├── Fusion (Contemporary)
│   └── Seasonal
│
├── Saree Stories Section
│   └── Featured artisan story (rotates)
│   └── Each story links to related collection
│
└── New Arrivals (By State)
    └── "Latest from UP", "Latest from Karnataka", etc.
```

---

## 📊 State-Saree Mapping

### Indian States & Traditional Sarees

```
UP (UTTAR PRADESH) - PRIMARY FOCUS ⭐⭐⭐
├── Lucknow Chikankari (Main)
├── Banarasi Silk
├── Banaras Tissue
├── Varanasi Sarees
└── [Emphasis: 40% of collection]

Tamil Nadu
├── Kanchipuram (Silk)
├── Madurai
├── Kumbakonam
└── [Emphasis: 15% of collection]

Karnataka
├── Mysore Silk
├── Coorg Sarees
├── Bangalore Silk
└── [Emphasis: 12% of collection]

Kerala
├── Kasavu (Main)
├── Mundum Neryathum
├── Tissue
├── Art Silk
└── [Emphasis: 12% of collection]

West Bengal
├── Tant Saree
├── Baluchuri
├── Tangail
├── Dhakai
└── [Emphasis: 8% of collection]

Odisha
├── Sambalpuri
├── Ikat
├── Bomkai
└── [Emphasis: 8% of collection]

Maharashtra
├── Paithani
├── Narayanpet
└── [Emphasis: 7% of collection]

Andhra Pradesh
├── Lepcha
├── Venkatagiri
└── [Emphasis: 5% of collection]

Rajasthan
├── Jaipuri
├── Bandhani
└── [Emphasis: 4% of collection]

Punjab
├── Phulkari
└── [Emphasis: 3% of collection]

Assam
├── Mekhela Chador
├── Pat
└── [Emphasis: 3% of collection]

Haryana & Others
└── [Emphasis: 2% of collection]
```

---

## 🎯 Saree Product Classification

### Attributes to Store for Each Saree

```
Core Information:
├── Name (E.g., "Pure White Lucknow Chikankari")
├── State Origin (UP)
├── Saree Type (Lucknow Chikankari)
├── Description

Physical Properties:
├── Fabric (Cotton, Silk, Tissue, Blend)
├── Length (5.5m, 6m, Custom)
├── Weight (Light, Medium, Heavy)
├── Weave Type (32-stitch Chikankari, Banarasi, etc.)

Embellishments:
├── Embroidery Type (Chikankari, Zardozi, Mukaish, etc.)
├── Border Type (Gold, Silver, Colored)
├── Blouse Type (Unstitched, Stitched, Patterned)
├── Special Details (Hand-rolled pleats, etc.)

Heritage:
├── Artisan Community (Lucknow Artisans, etc.)
├── Making Process (Time to create)
├── Cultural Significance
├── Care Instructions

Commercial:
├── Base Price
├── Color Variants
├── Size Variants
├── Stock By Variant
├── Discount/Offers
```

---

## 🛠️ Implementation Phases

### Phase 1: Data Structure (Week 1-2)
**Goals:**
- Modify Category model to add state/type fields
- Create Saree Attributes table
- Migrate existing products to new structure
- Create data seed file with all 28 states and top saree types

**Tasks:**
1. Update `app/models/category.py`
2. Update `app/schemas/category.py`
3. Create `app/models/saree_attribute.py`
4. Create migration scripts
5. Seed data: 28 states × 2-4 saree types each = ~80+ categories
6. Update Product model with state_origin, saree_type fields

**Files to Create:**
- `backend/scripts/seed_saree_states.py`
- `backend/app/models/saree_attribute.py`
- Alembic migration file

---

### Phase 2: Backend API Enhancement (Week 2-3)
**Goals:**
- Create state-based filtering endpoints
- Create saree type endpoints
- Update product endpoints for saree-specific queries
- Create artisan story endpoints

**New API Endpoints:**
```
GET /api/sarees/states
└── Return all states with saree data

GET /api/sarees/states/{state_code}
└── Get all saree types from a state

GET /api/sarees/states/{state_code}/{saree_type}
└── Get all sarees of specific type in state

GET /api/sarees/featured
└── Featured sarees (Lucknow emphasis)

GET /api/sarees/trending
GET /api/sarees/new-arrivals
GET /api/sarees/artisan-stories

POST /api/sarees (Admin)
└── Create saree with full attributes
```

**Files to Modify:**
- `backend/app/api/endpoints/products.py`
- Create: `backend/app/api/endpoints/sarees.py`
- `backend/app/services/product_service.py`

---

### Phase 3: Frontend UI Components (Week 3-4)
**Goals:**
- Create State Browse Page
- Create Saree Type Page
- Create Saree Detail Page with attributes
- Create Saree Landing Page

**New Components to Create:**
```
frontend/components/saree/
├── SareeHero.js (Landing hero)
├── SareeByStateGrid.js (State cards)
├── StateShowcase.js (Individual state page)
├── SareeTypeFilter.js (Filter by type)
├── SareeCard.js (Saree product card)
├── SareeDetails.js (Full detail page)
├── AttributesDisplay.js (Saree specs)
├── ArtisanStory.js (Heritage info)
├── VariantSelector.js (Color/blouse options)
├── RelatedSarees.js (Similar sarees)
└── SareeComparison.js (Compare sarees)

frontend/pages/
├── sarees/
│   ├── index.js (Saree landing)
│   ├── [state].js (State collection page)
│   ├── [state]/[type].js (Type filter page)
│   ├── [state]/[type]/[slug].js (Detail page)
│   └── comparison.js (Compare sarees)
│
└── Updated:
    └── index.js (Homepage - Saree emphasis)
```

**New Data Structure:**
```
frontend/data/
├── sareeStates.js (All 28 states with info)
├── sareeCatalog.js (Hierarchical saree data)
└── artisanStories.js (Heritage narratives)
```

---

### Phase 4: Homepage & Landing Updates (Week 4)
**Goals:**
- Emphasize Sarees on homepage
- Create Saree collection hero
- Reposition category showcase
- Add state-based filtering to homepage

**Homepage Updates:**
```
Current Hero → Lucknow Chikankari Hero
Current Featured Products → Featured Sarees
Current Categories → "Browse Sarees by State"
New Section: "Why Choose Lucknow Chikankari?"
New Section: "Artisan Stories"
```

---

## 💾 Database Design Detail

### Category Hierarchy Example

```
ID | Name                      | Slug              | Parent_ID | Type          | State_Code | Featured
1  | Sarees                    | sarees            | NULL      | SAREE_TYPE    | NULL       | 1
2  | Uttar Pradesh Sarees      | up-sarees         | 1         | STATE         | UP         | 1
3  | Lucknow Chikankari        | lucknow-chikankari| 2         | SUBCATEGORY   | UP         | 1
4  | White Chikankari          | white-chikankari  | 3         | SUBCATEGORY   | UP         | 1
5  | Colored Chikankari        | colored-chikankari| 3         | SUBCATEGORY   | UP         | 0
6  | Mukaish Chikankari        | mukaish-chikankari| 3         | SUBCATEGORY   | UP         | 0
7  | Banarasi Sarees           | banarasi-sarees   | 2         | SUBCATEGORY   | UP         | 0
8  | Kerala Sarees             | kerala-sarees     | 1         | STATE         | KL         | 0
9  | Kasavu Sarees             | kasavu-sarees     | 8         | SUBCATEGORY   | KL         | 0
... etc
```

### Product Data Structure

```
Product Table:
ID | Name | Slug | Category_ID | Base_Price | Discount | State_Origin | Saree_Type | Metadata

Example:
123 | "Pure White Lucknow Chikankari Saree" | 
    | "white-lucknow-chikankari-001" | 4 | 8999 | 10 | UP | "Lucknow Chikankari" |
    {
      "length": "5.5m",
      "fabric": "Pure Cotton",
      "weave": "32-stitch Chikankari",
      "artisan_community": "Lucknow Craft Community",
      "care_instructions": "Dry clean preferred",
      "heritage_story": "...",
      "available_colors": ["White", "Off-White", "Light Cream"],
      "blouse_types": ["Unstitched", "Stitched"]
    }
```

---

## 🎨 Content Strategy

### Saree Type Descriptions (To be created)

Each state/saree type needs rich content:
```
For "Lucknow Chikankari":
├── History & Heritage (500 words)
├── The Craft Process (with images)
├── Characteristic Features
├── Price Range
├── Best Occasions
├── Care Instructions
├── Featured Artisans
└── Similar Collections
```

### Artisan Stories

Connect customers to makers:
```
Story Structure:
├── Artisan Name & Photo
├── Community Background
├── Years of Experience
├── Specialization
├── Creation Process (photos)
├── Philosophy
└── Featured Products
```

---

## 🔍 Search & Filtering Strategy

### Frontend Filters Available
```
/sarees page will have:
├── State Filter (Dropdown)
├── Saree Type Filter (Multi-select)
├── Price Range Slider
├── Fabric Filter
├── Color Filter
├── Occasion Filter (Casual, Formal, Festival, Wedding)
├── Sort Options
│   ├── Popularity
│   ├── Newest
│   ├── Price: Low to High
│   ├── Price: High to Low
│   └── Best Rated
└── Artisan/Community Filter
```

### Backend Query Optimization
```
Key Queries to Optimize:
1. Get all sarees by state
2. Get all sarees by saree_type
3. Get featured sarees
4. Search across state + saree_type + product name
5. Get artisan/community products
6. Price range queries with state filter
```

---

## 📈 Analytics & Metrics to Track

```
├── Views by State (Which states get most interest)
├── Sales by State (Which states sell most)
├── Featured Saree Performance
├── Artisan Story Engagement
├── Category Browse Path (How users navigate)
├── Search Terms (What saree types users search)
├── Comparison Views (Which sarees compared)
└── Collection Conversions (By state)
```

---

## 🎯 Priority Implementation Order

### MUST HAVE (MVP)
```
1. State-based Category Structure
2. Lucknow Chikankari Emphasis on Landing
3. Browse by State functionality
4. Saree Detail Page with Attributes
5. State-filtered Product Listing
6. Basic Artisan Info
```

### SHOULD HAVE (Phase 2)
```
1. Saree Comparison Tool
2. Rich Artisan Stories
3. Color Variant Selection
4. Blouse Type Variants
5. Advanced Filtering
6. State-based Recommendations
```

### NICE TO HAVE (Phase 3)
```
1. Saree Styling Guide
2. Occasion-based Collections
3. Virtual Try-on (Future AR)
4. User Reviews by State
5. Community Forum
6. Saree Customization
```

---

## 🗂️ File Changes Summary

### Backend Changes
```
NEW FILES:
├── backend/app/models/saree_attribute.py
├── backend/app/api/endpoints/sarees.py
├── backend/scripts/seed_saree_states.py
├── backend/scripts/saree_data.json

MODIFIED FILES:
├── backend/app/models/category.py (+5 fields)
├── backend/app/models/product.py (+4 fields)
├── backend/app/schemas/category.py (+5 fields)
├── backend/app/schemas/product.py (+4 fields)
├── backend/app/services/product_service.py (+new methods)
└── backend/app/main.py (+new routers)
```

### Frontend Changes
```
NEW FILES:
├── frontend/components/saree/SareeHero.js
├── frontend/components/saree/SareeByStateGrid.js
├── frontend/components/saree/StateShowcase.js
├── frontend/components/saree/SareeCard.js
├── frontend/components/saree/SareeDetails.js
├── frontend/components/saree/AttributesDisplay.js
├── frontend/components/saree/ArtisanStory.js
├── frontend/components/saree/VariantSelector.js
├── frontend/pages/sarees/index.js
├── frontend/pages/sarees/[state].js
├── frontend/pages/sarees/[state]/[type].js
├── frontend/pages/sarees/[state]/[type]/[slug].js
├── frontend/data/sareeStates.js
├── frontend/data/sareeCatalog.js
└── frontend/data/artisanStories.js

MODIFIED FILES:
├── frontend/pages/index.js (Homepage emphasis)
├── frontend/components/home/Hero.js (Saree focus)
├── frontend/components/home/CategoryShowcase.js
└── frontend/styles/globals.css (New saree styles)
```

---

## 📝 Data Seed Requirements

### State Master Data (28 entries)
```
States: AP, AS, AR, BR, CG, DL, GA, GJ, HR, HP, JK, JH, KA, KL, MP, MH, MN, ML, OR, PB, RJ, SK, TN, TG, TR, UP, UK, WB

Each State needs:
├── State Code (2 chars)
├── Full Name
├── Capital
├── Hindi Name
├── Traditional Saree Types (2-4 per state)
├── Region Description
├── Image URL
├── Cultural Significance
└── Price Range
```

### Saree Type Master Data (60-80 entries)
```
Each Saree Type needs:
├── Name
├── State Code
├── Description
├── Origin Story
├── Fabric Types
├── Weave Patterns
├── Typical Colors
├── Price Range
├── Featured Image
├── Care Instructions
└── Occasion Best For
```

---

## 🚀 Success Criteria

### MVP Success Indicators
- [ ] Users can browse sarees by state
- [ ] Lucknow Chikankari gets 40% of initial inventory
- [ ] State-based navigation working
- [ ] Saree detail page shows attributes
- [ ] Homepage emphasizes sarees prominently
- [ ] API returns filtered results by state

### Phase 2 Success Indicators
- [ ] 80%+ of sarees have artisan stories
- [ ] State-based filtering used by 60%+ of users
- [ ] Saree comparison tool used by 30%+ of users
- [ ] Featured collections driving 20%+ of saree sales

---

## 🎓 Next Steps

### Immediate Actions:
1. **Review this plan** - Validate structure matches business needs
2. **Define state priority** - Confirm Lucknow gets primary emphasis
3. **Gather content** - Collect saree descriptions, artisan stories, images
4. **Database seed** - Prepare saree catalog data (CSV/JSON)
5. **Design mockups** - Sketch state page and saree detail layouts
6. **Approve API structure** - Confirm new endpoints meet requirements

### Ready for Coding When:
- ✅ Saree taxonomy approved
- ✅ Database changes reviewed
- ✅ API endpoints finalized
- ✅ Content/data partially prepared
- ✅ Frontend page structure approved

---

## 🎨 Example: Lucknow Chikankari Emphasis

### Hero Banner
```
"Experience the Heritage of Lucknow Chikankari"
- Large hero image of white chikankari saree
- "Our Specialty" badge
- Call-to-action: "Explore Full Collection"
- Artisan spotlight (rotating)
```

### Featured Section
```
"The Finest Chikankari Sarees"
- 3-4 premium Lucknow Chikankari pieces
- Show in main carousel
- Direct link to /sarees/up/lucknow-chikankari
```

### State Browse
```
Lucknow Chikankari Card:
- Larger card size (2x other states initially)
- "Our Signature Collection" label
- Featured image
- Price range highlight
- Number of products in stock
```

### Browse by State Grid
```
UP (Lucknow) - Featured Position (Top-left, larger)
├── Sarees Count: 45+
├── Primary Type: Lucknow Chikankari
├── Price Range: ₹3,999 - ₹25,000
└── Badge: "Our Specialty"

Kerala - Standard Position
├── Sarees Count: 20
├── Primary Type: Kasavu
├── Price Range: ₹4,999 - ₹15,000
└── Badge: None

... other states
```

---

**This plan provides a complete framework to transform Tantuka into a Saree-First platform with strong Lucknow Chikankari emphasis while maintaining scalability for all Indian saree traditions.**
