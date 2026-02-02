import { Search, Upload } from "lucide-react";
import ProductCategories from "./_components/Categories";
import PriceRange from "./_components/Range";
import ProductBrands from "./_components/Brand";
import ProductCard from "./_components/Card";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/Common/Breadcrumb";

// Mock Data
const products = [
  {
    id: 1,
    title: "Polka Dots Woman Dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    oldPrice: 155,
    newPrice: 135,
    rating: 5,
    reviewCount: 33,
  },
  {
    id: 2,
    title: "Double breasted suit",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop",
    oldPrice: null,
    newPrice: 160,
    rating: 4,
    reviewCount: 33,
  },
  {
    id: 3,
    title: "Sweater For Women",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=600&fit=crop",
    oldPrice: 130,
    newPrice: 120,
    rating: 5,
    reviewCount: 33,
  },
  {
    id: 4,
    title: "Classic White Blouse",
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=600&fit=crop",
    oldPrice: 85,
    newPrice: 65,
    rating: 4,
    reviewCount: 28,
  },
  {
    id: 5,
    title: "Golden Silk Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop",
    oldPrice: 200,
    newPrice: 175,
    rating: 5,
    reviewCount: 45,
  },
  {
    id: 6,
    title: "Women's High Heels",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop",
    oldPrice: 150,
    newPrice: 120,
    rating: 4,
    reviewCount: 19,
  },
];

const filterTabs = ["All", "Top Rated", "Popular", "Newest"];

export default function Test() {
  return (
    <>
      <Breadcrumb
        title={"Explore All Products"}
        pages={["shop", "/", "shop with sidebar"]}
      />
      <div className="py-16">
        <Container>
          <div className="">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left Sidebar */}
              <aside className=" w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-6">
                <ProductCategories />
                <PriceRange />
                <ProductBrands />
              </aside>

              {/* Main Content */}
              <main className="flex-1">
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More / Pagination */}
                <div className="mt-8 text-center">
                  <button className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all text-sm sm:text-base">
                    Load More Products
                  </button>
                </div>
              </main>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
