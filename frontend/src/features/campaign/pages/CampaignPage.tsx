import { useParams } from "react-router-dom";
import { useGetCampaignBySlug } from "../hooks/use.get.campaign.by.slug";
import { useParentCategories } from "../../category/hooks/use.parent.categories";
import { getOptimizedImageUrl } from "../../../shared/utils/cloudinary";
import CampaignCategoryRow from "../components/CampaignCategoryRow";
import EmptyState from "../../../shared/components/EmptyState";

export default function CampaignPage() {
    const { slug } = useParams<{ slug: string }>();
    const {
        data: campaign,
        isLoading: isCampaignLoading,
        isError: isCampaignError,
    } = useGetCampaignBySlug(slug);
    const { data: parentData, isLoading: isCategoriesLoading } = useParentCategories();
    const parentCategories = parentData?.data || [];

    if (isCampaignLoading) {
        return (
            <div className="w-full aspect-[21/9] max-h-[420px] bg-[var(--card)] animate-pulse" />
        );
    }

    if (isCampaignError || !campaign) {
        return (
            <div className="py-16">
                <EmptyState
                    title="Page not found"
                    description="This campaign page doesn't exist or is no longer active."
                />
            </div>
        );
    }

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] pb-16">
            {/* Hero */}
            <div className="relative w-full aspect-[21/9] max-h-[420px] overflow-hidden">
                <img
                    src={getOptimizedImageUrl(campaign.image.url, 1600, 700)}
                    alt={campaign.title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-wide">
                        {campaign.title}
                    </h1>
                    <p className="text-white/90 mt-3 max-w-xl text-sm sm:text-base">
                        {campaign.subtitle}
                    </p>
                </div>
            </div>

            {/* Category sections */}
            <div className="max-w-7xl mx-auto mt-8">
                {isCategoriesLoading && (
                    <div className="px-4 sm:px-0 space-y-10">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="h-64 bg-[var(--card)] animate-pulse rounded-xl" />
                        ))}
                    </div>
                )}

                {!isCategoriesLoading && parentCategories.length === 0 && (
                    <EmptyState
                        title="Nothing here yet"
                        description="Add some categories and products to see them featured on this page."
                    />
                )}

                {!isCategoriesLoading &&
                    parentCategories.map((category) => (
                        <CampaignCategoryRow
                            key={category.id}
                            parentCategoryId={category.id}
                            parentName={category.name}
                        />
                    ))}
            </div>
        </section>
    );
}
