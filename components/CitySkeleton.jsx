"use client";
import React from "react";

const SkeletonBlock = ({ className }) => (
  <div className={`bg-gray-200/80 animate-pulse ${className}`} />
);

export default function CitySkeleton({
  showFilterBar = true,
  contentOnly = false,
}) {
  const content = (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-6 pt-5">
      <div className="mb-8">
        <SkeletonBlock className="h-10 w-80 rounded" />
        <SkeletonBlock className="h-4 w-60 mt-2 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border rounded-xl overflow-hidden bg-white">
            <SkeletonBlock className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <SkeletonBlock className="h-4 w-3/4 rounded" />
              <SkeletonBlock className="h-4 w-1/2 rounded" />
              <SkeletonBlock className="h-3 w-full rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-1 sm:gap-2 mt-12 mb-6 w-full px-2">
        <SkeletonBlock className="h-8 w-12 rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-8 w-8 rounded" />
        ))}
        <SkeletonBlock className="h-8 w-12 rounded" />
      </div>
    </main>
  );

  if (contentOnly) return content;

  return (
    <div className="h-screen overflow-hidden bg-white">
      {showFilterBar ? (
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex flex-wrap gap-3">
              <SkeletonBlock className="h-9 w-28 rounded-full" />
              <SkeletonBlock className="h-9 w-32 rounded-full" />
              <SkeletonBlock className="h-9 w-36 rounded-full" />
              <SkeletonBlock className="h-9 w-24 rounded-full" />
            </div>
          </div>
        </div>
      ) : null}
      {content}
    </div>
  );
}
