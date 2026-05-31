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
            className="text-[32px] md:text-[48px] font-medium text-black mb-4 md:mb-6 tracking-tight"
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
              className="text-[12px] font-bold uppercase tracking-widest text-black border-b border-black hover:opacity-70 transition-opacity"
            >
              Clear Search
            </Link>
          </div>
        )}        

        <div className=" mx-auto flex flex-col gap-12 relative">
          
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/40 z-[100]"
                />
                <motion.aside 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-y-0 left-0 w-full max-w-[400px] bg-white z-[101] p-10 flex flex-col shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-16">
                    <h4 className="text-[24px] font-medium text-black tracking-tight">
                      Product Categories
                    </h4>
                    <button 
                      onClick={() => setIsSidebarOpen(false)} 
                      className="group p-2 -mr-2 flex items-center gap-2 text-neutral-400 hover:text-black transition-colors"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                      <X size={24} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                  </div>
                  
                  <nav>
                    <ul className="space-y-8">
                      <li 
                        onClick={() => handleCategorySelect(null)}
                        className="cursor-pointer group flex items-start justify-between border-b border-neutral-100 pb-4"
                      >
                        <span className={`text-[18px] transition-all duration-300 ${
                          selectedCategory === null 
                          ? "text-black font-semibold translate-x-2" 
                          : "text-neutral-500 group-hover:text-black group-hover:translate-x-2 font-medium"
                        }`}>
                          All Collections
                        </span>
                        <span className={`text-[12px] font-bold ${
                          selectedCategory === null ? "text-black" : "text-neutral-300 group-hover:text-black"
                        }`}>
                          ({products.length})
                        </span>
                      </li>
                      {categories.map((cat) => (
                        <li 
                          key={cat.name} 
                          onClick={() => handleCategorySelect(cat.name)}
                          className="cursor-pointer group flex items-start justify-between border-b border-neutral-100 pb-4"
                        >
                          <span className={`text-[18px] transition-all duration-300 ${
                            selectedCategory === cat.name 
                            ? "text-black font-semibold translate-x-2" 
                            : "text-neutral-400 group-hover:text-black group-hover:translate-x-2 font-medium"
                          }`}>
                            {cat.name}
                          </span>
                          <span className={`text-[12px] font-bold ${
                            selectedCategory === cat.name ? "text-black" : "text-neutral-200 group-hover:text-black"
                          }`}>
                            ({cat.count})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-auto pt-10">
                    <p className="text-[12px] text-neutral-400 font-medium uppercase tracking-[0.2em] mb-4">Need help?</p>
                    <Link href="/contact" className="text-[15px] text-black font-medium border-b border-black hover:pb-1 transition-all">
                      Contact Support
                    </Link>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid Area */}
          <div className="w-full">
            

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pb-8 border-b border-neutral-100">
              <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="bg-[#F7F0B5] hover:bg-[#98CB71] text-black px-6 py-4 flex items-center gap-3 transition-colors duration-300"
                >
                  <div className="flex flex-col gap-1 w-4">
                    <div className="h-0.5 w-full bg-black"></div>
                    <div className="h-0.5 w-2/3 bg-black"></div>
                    <div className="h-0.5 w-full bg-black"></div>
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-widest">Filter</span>
                </button>
                
                <p className="text-neutral-500 text-[14px] md:text-[20px]">
                  We found <span className="text-black font-medium">{filteredProducts.length}</span> products available for you.
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-4 md:pt-0 border-t border-neutral-50 md:border-none">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewType("grid")}
                    className={`p-1.5 transition-colors ${viewType === "grid" ? "text-black" : "text-neutral-300 hover:text-black"}`}
                  >
                    <LayoutGrid size={22} strokeWidth={1.5} />
                  </button>
                  
                </div>

                <div className="relative min-w-48 lg:min-w-56">
                  <select 
                    value={sortOrder}
                    onChange={(e) => {
                      setSortOrder(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#F6F6F6] appearance-none px-6 py-3.5 text-[16px] outline-none transition-colors pr-12 cursor-pointer text-neutral-800"
                  >
                    <option value="a-z">Alphabetically, A-Z</option>
                    <option value="z-a">Alphabetically, Z-A</option>
                    <option value="low-high">Price, low to high</option>
                    <option value="high-low">Price, high to low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12">
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
                  className="w-11 h-11 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-[#98CB71] hover:text-white hover:border-[#98CB71] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-neutral-200"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-11 h-11 border text-[13px] font-bold transition-all duration-300 ${
                      currentPage === i + 1 
                      ? "bg-black border-black text-white" 
                      : "border-neutral-200 text-neutral-600 hover:bg-[#98CB71] hover:border-[#98CB71] hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:bg-[#98CB71] hover:text-white hover:border-[#98CB71] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-neutral-200"
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
