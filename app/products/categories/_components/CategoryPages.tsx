import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import React from 'react';
import CategoryButtons from './CategoryButtons';

const CategoryPages = () => {
  return (
    <PageContainer scrollable>
      <Heading
        title="Categories"
        description="Manage products (Server side table functionalities.)"
      />
      <CategoryButtons />
    </PageContainer>
  );
};

export default CategoryPages;
