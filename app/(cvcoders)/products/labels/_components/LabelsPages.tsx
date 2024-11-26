import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import React from 'react';
import LabelsButtons from './LabelsButtons';

const LabelsPages = () => {
  return (
    <PageContainer scrollable>
      <Heading
        title="labels"
        description="Manage products (Server side table functionalities.)"
      />
      <LabelsButtons />
    </PageContainer>
  );
};

export default LabelsPages;
