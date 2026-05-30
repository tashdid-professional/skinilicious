"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/public/datas/products";


export default function ProductDetailsPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [mainImage, setMainImage] = useState(product?.image || "");

  // Update image when product or variant changes
  React.useEffect(() => {
    if (product) {
      if (selectedVariant) {
        setMainImage(selectedVariant.image);
      } else {
        setMainImage(product.image);
      }
    }
  }, [product, selectedVariant]);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        
        
        <div className="container mx-auto px-4 py-40 text-center">
          <h2 className="text-2xl tracking-[0.08em] uppercase">Product Not Found</h2>
          <Link href="/shop" className="mt-8 inline-block text-sm tracking-[0.08em] uppercase border-b border-black pb-1">Back to Shop</Link>
        </div>
       
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const activeGallery = selectedVariant ? selectedVariant.gallery : product.gallery;

  return (
    <main className="min-h-screen bg-white  ">
      {/* Breadcrumb */}
      <div className="bg-[#F8F8F8] py-4">
        <div className="container flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.1em] text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">—</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span className="text-neutral-300">—</span>
          <span className="text-black font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container pb-16 md:pb-20 pt-10 lg:px-32" >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-6">
            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full max-w-[450px] mx-auto md:mx-0 bg-[#f9e2bf] overflow-hidden">
              {product.badge && (
                <div className={`absolute top-4 left-4 px-4 py-1.5 z-20 rounded-[2px] ${
                  product.badge === "New" ? "bg-[#c24b3a]" : "bg-[#4b6c5b]"
                }`}>
                  <span className="text-white text-[15px] font-bold tracking-widest uppercase">
                    {product.badge}
                  </span>
                </div>
              )}
              
              <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {activeGallery.map((img, idx) => (
                <div 
                  key={idx}
                  className={`relative w-16 h-20 md:w-26 md:h-32 flex-shrink-0 cursor-pointer border transition-all ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                  onClick={() => setMainImage(img)}
                >
                  <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-start max-w-lg">

             <div className="flex items-center gap-4 mb-6 md:mb-4 ">
              {product.oldPrice && (
                <span className=" text-[#999] line-through text-lg md:text-xl font-semibold">
                  <span className="font-serif ">৳ </span>{product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className=" text-black text-xl font-semibold ">
                <span className="font-serif ">৳ </span>{product.price.toFixed(2)}
              </span>
            </div>
            <h1 className="text-3xl md:text-[34px] font-semibold tracking-normal text-black mb-6 ">
              {product.name}
            </h1>
            
           

          

            {/* Variants / Dynamic Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8 md:mb-10">
                <span className="text-[10px] md:text-[14px] tracking-[0.08em] uppercase text-black font-semibold block mb-4">
                  {product.variantType || "Choose Option"}
                </span>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 md:px-4 py-2 border text-[9px] md:text-[13px] tracking-[0.08em] uppercase transition-all ${
                        selectedVariant?.name === variant.name
                          ? "border-black text-black bg-white"
                          : "border-[#eee] text-[#999] hover:border-black hover:text-black"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase */}
            <div className="flex items-center gap-6 mb-8 md:mb-12">
              <a 
                href={product.purchaseLink || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-12 bg-black border border-black text-white h-14 flex items-center justify-center text-[11px] md:text-base tracking-[0.08em] e hover:bg-[#4b6c5b]  hover:border-[#4b6c5b] hover:border hover:text-white transition-all duration-500"
              >
                Buy it now
              </a>
            </div>

            {/* Meta */}
            <div className="space-y-2 pt-6 md:pt-8 border-t border-[#eee]">
              <p className="text-[10px] md:text-[14px] tracking-[0.08em] uppercase text-black font-semibold">
                Category: <span className="font-normal text-[#777] ml-2">{product.category}</span>
              </p>
              <p className="text-[10px] md:text-[14px] tracking-[0.08em] uppercase text-black font-semibold">
                Tags: <span className="font-normal text-[#777] ml-2">{product.tags.join(", ")}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 md:mt-20">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-2">
            <button 
              onClick={() => setActiveTab("description")}
              className={`text-xl md:text-[34px] font-semibold transition-all ${
                activeTab === 'description' 
                ? 'text-black' 
                : 'text-neutral-300 hover:text-black'
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("videos")}
              className={`text-xl md:text-[34px] font-semibold transition-all ${
                activeTab === 'videos' 
                ? 'text-black' 
                : 'text-neutral-300 hover:text-black'
              }`}
            >
              Videos
            </button>
          </div>

          <div className="py-8 md:py-12">
            {activeTab === "description" ? (
              <div className="animate-fadeIn">
                <p className="text-[#a1a1a1] text-base  leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fadeIn">
                {product.videos.map((vidId, idx) => (
                  <div key={idx} className="relative aspect-video rounded-sm overflow-hidden bg-neutral-100 ring-1 ring-black/5">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube-nocookie.com/embed/${vidId}`}
                      title={`Product Video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    ></iframe>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-[40px] text-center tracking-normal  mb-6 md:mb-10  font-semibold">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      
    </main>
  );
}
