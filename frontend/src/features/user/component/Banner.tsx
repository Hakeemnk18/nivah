import { Link } from "react-router-dom";
import { useGetAllUserBanner } from "../../banner/hooks/use.get.banner.user";
import type { UserBannerView } from "../../banner/types/banner.type";

const mockBanner: UserBannerView = {
  id: "1",
  image: {
    url: "/images/signature-offer.png",
  },
};
export default function SignatureOfferBanner() {
  const { data: bannerData } = useGetAllUserBanner();
  const banner = bannerData || mockBanner;

  return (
    <section className="relative w-full overflow-hidden ">
      <Link to={"/products"}>

        <div className="relative w-full aspect-[5/2]">
          {/* Background image */}
          <img
            src={banner.image.url}
            alt="Promotional offer banner"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />

        </div>
      </Link>
    </section>
  );
}