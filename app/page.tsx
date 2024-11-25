import React from 'react';
import KBar from '@/components/kbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { cookies } from 'next/headers';
import BlogPage from './(cvcoders)/blog/_components/BlogPage';

const page = () => {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          <BlogPage />
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
};

export default page;
