// import Hero from "./sections/Hero";
// import Categories from "./sections/Categories";
// import FeaturedProducts from "./sections/FeaturedProducts";
// import Story from "./sections/Story";

import SignatureOfferBanner from "../component/Banner";
import DesignedToBeLoved from "../component/DesignedToBeLoved";
import FeaturedProducts from "../component/FeaturedProduct";
import FeaturedStory from "../component/FeaturedStory";
import Hero from "../component/Hero";
import SignatureCategories from "../component/SignatureCategories";
import Testimonials from "../component/Testimonials";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <DesignedToBeLoved />
      <FeaturedProducts />
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