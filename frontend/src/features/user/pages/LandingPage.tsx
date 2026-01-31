// import Hero from "./sections/Hero";
// import Categories from "./sections/Categories";
// import FeaturedProducts from "./sections/FeaturedProducts";
// import Story from "./sections/Story";

import SignatureOfferBanner from "../component/Banner";
import DesignedToBeLoved from "../component/DesignedToBeLoved";
import FeaturedStory from "../component/FeaturedStory";
import Hero from "../component/Hero";
import SignatureCategories from "../component/SignatureCategories";
import Testimonials from "../component/Testimonials";

export default function LandingPage() {
  return (
    <>
     <Hero />
     <DesignedToBeLoved />
     <SignatureOfferBanner />
     <SignatureCategories />
     
     <FeaturedStory />
     
     <Testimonials />
      {/* <Hero />
      <Categories />
      <FeaturedProducts />
      <Story /> */}
    </>
  );
}