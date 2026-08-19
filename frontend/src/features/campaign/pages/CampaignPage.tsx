import { useParams } from "react-router-dom";
import { useGetCampaignBySlug } from "../hooks/use.get.campaign.by.slug";
import { useParentCategories } from "../../category/hooks/use.parent.categories";
import CampaignCategoryRow from "../components/CampaignCategoryRow";
import CampaignHero from "../components/CampaignHero";
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
            <CampaignHero
                title={campaign.title}
                subtitle={campaign.subtitle}
                imageUrl={campaign.image.url}
            />

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
