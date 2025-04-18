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
    sliderList = await GlobalApi.getSliders().catch(() => []); // Default to empty array on error
    categoryList = await GlobalApi.getCategoryList().catch(() => []); // Default to empty array on error
    productList = await GlobalApi.getAllProducts().catch(() => []); // Default to empty array on error
  } catch (error) {
    console.error("API Error:", error);
  }

  return (
    <div className="p-10 px-5 md:px-16">
      {/* Sliders */}
      {sliderList.length > 0 ? (
        <Slider sliderList={sliderList} />
      ) : (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>No sliders available. Check backend configuration.</AlertDescription>
        </Alert>
      )}
      {/* Category List */}
      {categoryList.length > 0 ? (
        <CategoryList categoryList={categoryList} />
      ) : (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>No categories available. Check backend configuration.</AlertDescription>
        </Alert>
      )}
      {/* Product List */}
      {productList.length > 0 ? (
        <ProductList productList={productList} />
      ) : (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>No products available. Check backend configuration.</AlertDescription>
        </Alert>
      )}
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