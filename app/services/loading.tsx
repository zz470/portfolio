import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
  // Create an array of 8 items for service card skeletons
  const serviceSkeletons = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 py-12">
      <div className="mb-16">
        <Skeleton className="h-12 w-40 mb-6" />
        <Skeleton className="h-1 w-16 mb-8" />
        <Skeleton className="h-8 w-60 mb-4" />
        <Skeleton className="h-20 w-full max-w-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceSkeletons.map((index) => (
          <div key={index} className="p-6 border border-gray-100 rounded-md">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
} 