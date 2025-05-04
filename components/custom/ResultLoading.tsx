import React from "react";

// Components
import { Skeleton } from "../ui/skeleton";

export default function ResultLoading() {
  return (
    <div>
      <Skeleton className="mb-2 bg-gray-500 w-4/12 h-7"></Skeleton>
      <Skeleton className="bg-gray-500 w-full h-7"></Skeleton>
    </div>
  );
}
