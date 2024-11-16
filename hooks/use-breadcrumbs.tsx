'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// This allows adding custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
  '/dashboard/employee': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Employee', link: '/dashboard/employee' }
  ],
  '/dashboard/product': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Product', link: '/dashboard/product' }
  ]
  // Add more custom mappings as needed
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Check if we have a custom mapping for this exact path
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Decode the segment to remove URL encoding (e.g., %20 -> space)
      const decodedTitle = decodeURIComponent(segment);

      // Limit the title to 10 words
      const words = decodedTitle.split(' ');
      const limitedTitle = words.length > 10 ? words.slice(0, 15).join(' ') + '...' : decodedTitle;

      return {
        title: limitedTitle.charAt(0).toUpperCase() + limitedTitle.slice(1), // Capitalize first letter
        link: path
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
