import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone, Terminal } from "lucide-react";

export default async function Home() {
  let sliderList = [];
  let categoryList = [];
  let productList = [];

  try {
    sliderList = await GlobalApi.getSliders();
    categoryList = await GlobalApi.getCategoryList();
    productList = await GlobalApi.getAllProducts();
  } catch (error) {
    console.error("API Error:", error);
  }

  return (
    <div className="p-10 px-5 md:px-16">
      {/* Sliders */}
      <Slider sliderList={sliderList} />
      {/* Category List */}
      <CategoryList categoryList={categoryList} />
      {/* Product List */}
      <ProductList productList={productList} />
      {/* Banner */}
      <Image
        src="/banner.png"
        width={1000}
        height={300}
        alt="banner"
        className="w-full h-[400px] object-contain"
      />
      {/* Footer */}
      <Footer />
    </div>
  );
}