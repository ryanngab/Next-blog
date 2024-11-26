import PageContainer from '@/components/layout/page-container';
import React from 'react';
import LabelsButton from './LabelsButton';
import { Heading } from '@/components/ui/heading';

const LabelsPage = () => {
  return (
    <PageContainer scrollable>
      <Heading
        title="Products"
        description="Manage products (Server side table functionalities.)"
      />
      <LabelsButton />
    </PageContainer>
  );
};

export default LabelsPage;
