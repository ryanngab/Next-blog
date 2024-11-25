import PageContainer from '@/components/layout/page-container';
import React from 'react';
import CategoryButton from './CategoryButton';
import { Heading } from '@/components/ui/heading';

const CategoryPage = () => {
  return (
    <PageContainer scrollable>
      <Heading
        title="Products"
        description="Manage products (Server side table functionalities.)"
      />
      <CategoryButton />
    </PageContainer>
  );
};

export default CategoryPage;
