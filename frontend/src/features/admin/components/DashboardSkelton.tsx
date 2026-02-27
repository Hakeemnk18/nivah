const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-32 bg-[#232447] rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="h-24 bg-[#232447] rounded-xl" />
        <div className="h-24 bg-[#232447] rounded-xl" />
        <div className="h-24 bg-[#232447] rounded-xl" />
        <div className="h-24 bg-[#232447] rounded-xl" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;