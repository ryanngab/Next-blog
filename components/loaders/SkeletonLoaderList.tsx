import React from 'react';

const SkeletonLoaderList = () => {
  return (
    <div
      role="status"
      className="flex animate-pulse flex-col gap-2 divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700"
    >
      <div className="group flex cursor-pointer gap-3">
        <div className="h-16 w-16 rounded-md bg-gray-300 dark:bg-gray-600"></div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-60 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="group flex cursor-pointer gap-3">
        <div className="h-16 w-16 rounded-md bg-gray-300 dark:bg-gray-600"></div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-60 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="group flex cursor-pointer gap-3">
        <div className="h-16 w-16 rounded-md bg-gray-300 dark:bg-gray-600"></div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-60 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="group flex cursor-pointer gap-3">
        <div className="h-16 w-16 rounded-md bg-gray-300 dark:bg-gray-600"></div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-60 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="group flex cursor-pointer gap-3">
        <div className="h-16 w-16 rounded-md bg-gray-300 dark:bg-gray-600"></div>
        <div>
          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-2 w-60 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mt-5 h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderList;
