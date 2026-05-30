"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LayoutGrid, List, ChevronDown, Plus, ChevronLeft, X } from "lucide-react";
import { products } from "@/public/datas/products";
import ProductCard from "@/components/ProductCard";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const searchBarQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category");
  
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortOrder, setSortOrder] = useState<string>("a-z");

  // Sync state with URL parameter if it changes
  React.useEffect(() => {
    setSelectedCategory(categoryParam);
    setCurrentPage(1);
  }, [categoryParam]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const productsPerPage = 9; // 3 rows * 3 columns on desktop
  // Filter products by search and category
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = searchBarQuery 
      ? p.name.toLowerCase().includes(searchBarQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchBarQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      case "low-high":
        return a.price - b.price;
      case "high-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
    window.scrollTo({ top: 400, behavior: "smooth" });
  };
  
  // Extract unique categories and their counts
  const categories = Array.from(new Set(products.map(p => p.category))).map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length
  }));

  const bannerCategories = ["Face", "Hair Styling", "Lips", "Skincare"];

  return (
    <main className="bg-white min-h-screen">
      {/* Page Header */}
      <header className="bg-[#F8F8F8] py-24  border-b border-neutral-100">
        <div className="container text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[42px] md:text-[48px] font-medium text-black mb-6 tracking-tight"
          >
            Products
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-3 text-[14px] md:text-[15px] text-neutral-500"
          >
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="text-neutral-300">—</span>
            <span className="text-black font-medium">Products</span>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="py-20 container lg:py-24"
      >
        {searchBarQuery && (
          <div className="mb-10 p-6 bg-neutral-50 border border-neutral-100 flex items-center justify-between">
            <p className="text-black text-[15px]">
              Showing results for <span className="font-bold underline underline-offset-4 decoration-black/20">"{searchBarQuery}"</span>
              <span className="text-neutral-400 ml-2">({filteredProducts.length} items found)</span>
            </p>
            <Link 
              href="/shop" 
              className="text-[12px] font-bold uppercase tracking-widest text-[#4b6c5b] hover:opacity-70 transition-opacity"
            >
              Clear Search
            </Link>
          </div>
        )}        

        <div className=" mx-auto flex flex-col lg:flex-row gap-12 relative lg:static">
          
          {/* Mobile Sticky Toggle Button */}
          <div className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="bg-black text-white py-6 px-2.5 rounded-r-lg shadow-2xl flex flex-col items-center gap-3 active:scale-95 transition-all group"
            >
              <List size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] transform rotate-180 [writing-mode:vertical-lr]">
                Categories
              </span>
            </button>
          </div>

          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/40 z-90 lg:hidden"
                />
                <motion.aside 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[80%] max-w-75 bg-white z-100 lg:hidden p-8 flex flex-col pt-20"
                >
                  <div className="flex justify-between items-center mb-12">
                    <h4 className="text-[20px] font-medium text-black tracking-tight">
                      Categories
                    </h4>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:rotate-90 transition-transform duration-300">
                      <X size={24} strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <ul className="space-y-6">
                    <li 
                      onClick={() => handleCategorySelect(null)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-start">
                        <span className={`text-[17px] ${selectedCategory === null ? "text-black font-semibold border-b border-black" : "text-neutral-500 font-medium group-hover:text-black transition-colors"}`}>
                          All Collections
                        </span>
                        <sup className={`ml-1 text-[11px] ${selectedCategory === null ? "text-black" : "text-neutral-400 group-hover:text-black"} font-bold`}>
                          {products.length}
                        </sup>
                      </div>
                    </li>
                    {categories.map((cat) => (
                      <li 
                        key={cat.name} 
                        onClick={() => handleCategorySelect(cat.name)}
                        className="cursor-pointer group"
                      >
                        <div className="flex items-start">
                          <span className={`text-[17px] ${selectedCategory === cat.name ? "text-black font-semibold border-b border-black" : "text-neutral-500 font-medium group-hover:text-black transition-colors"}`}>
                            {cat.name}
                          </span>
                          <sup className={`ml-1 text-[11px] ${selectedCategory === cat.name ? "text-black" : "text-neutral-400 group-hover:text-black"} font-bold`}>
                            {cat.count}
                          </sup>
                        </div>
                      </li>
                    ))}
                  </ul>

                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:w-1/4 space-y-12 pr-12">
            <div className="sticky top-32">
              <h4 className="text-[20px] font-medium text-black mb-10 tracking-tight">
                Product Categories
              </h4>
              <ul className="space-y-6">
                <li 
                  onClick={() => handleCategorySelect(null)}
                  className="cursor-pointer group flex items-start w-fit"
                >
                  <span className={`text-[17px] transition-all duration-300 ${
                    selectedCategory === null 
                    ? "text-black font-semibold border-b border-black" 
                    : "text-neutral-400 group-hover:text-black font-medium"
                  }`}>
                    All Collections
                  </span>
                  <sup className={`ml-1 text-[11px] font-bold ${
                    selectedCategory === null ? "text-black" : "text-neutral-300 group-hover:text-black"
                  }`}>
                    {products.length}
                  </sup>
                </li>
                {categories.map((cat) => (
                  <li 
                    key={cat.name} 
                    onClick={() => handleCategorySelect(cat.name)}
                    className="cursor-pointer group flex items-start w-fit"
                  >
                    <span className={`text-[17px] transition-all duration-300 ${
                      selectedCategory === cat.name 
                      ? "text-black font-semibold border-b border-black" 
                      : "text-neutral-400 group-hover:text-black font-medium"
                    }`}>
                      {cat.name}
                    </span>
                    <sup className={`ml-1 text-[11px] font-bold ${
                      selectedCategory === cat.name ? "text-black" : "text-neutral-300 group-hover:text-black"
                    }`}>
                      {cat.count}
                    </sup>
                  </li>
                ))}
              </ul>
            </div>
          </aside>


          {/* Product Grid Area */}
          <div className="w-full lg:w-3/4">
            

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pb-6 border-b border-neutral-100">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setViewType("grid")}
                  className={`border border-neutral-200 p-2.5 transition-colors ${viewType === "grid" ? "bg-[#f8f8f8] text-black" : "text-neutral-400 hover:text-black"}`}
                >
                  <LayoutGrid size={18} />
                </button>
                
                <p className="text-neutral-500 text-[14px] md:text-[16px]">
                  We found <span className="text-black font-semibold">{filteredProducts.length}</span> products available for you.
                </p>
              </div>

              <div className="relative w-full md:w-auto min-w-55">
                <select 
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#f3f2f2] appearance-none   px-5 py-2.5 text-[15px] outline-none focus:border-black transition-colors  pr-10  cursor-pointer"
                >
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="low-high">Price, low to high</option>
                  <option value="high-low">Price, high to low</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "easeOut",
                    delay: (index % 3) * 0.1 // Slight stagger for desktop rows
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-11 h-11 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-[#4b6c5b] hover:text-white hover:border-[#4b6c5b] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-neutral-200"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-11 h-11 border text-[13px] font-bold transition-all duration-300 ${
                      currentPage === i + 1 
                      ? "bg-[#4b6c5b] border-[#4b6c5b] text-white" 
                      : "border-neutral-200 text-neutral-600 hover:bg-[#4b6c5b] hover:border-[#4b6c5b] hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-[#4b6c5b] hover:text-white hover:border-[#4b6c5b] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-neutral-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

        </div>
      </motion.section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-white text-black font-serif text-2xl animate-pulse uppercase tracking-[0.2em]">
        Loading Shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
