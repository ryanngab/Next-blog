import PageContainer from '@/components/layout/page-container';
import React from 'react';

const AboutPage = () => {
  return (
    <PageContainer scrollable>
      <div className="container mx-auto lg:flex lg:gap-6">
        <div className="flex flex-col gap-3 lg:w-3/4">
          <h2 className="text-2xl font-bold tracking-tight">About Me</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            voluptas placeat nisi et debitis provident nesciunt id officia non
            vel.
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Website</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            minus ipsam iste molestias voluptate esse tempora animi quaerat
            omnis, perspiciatis provident illo similique voluptatum doloremque
            laborum earum sit, ab aliquid labore ut necessitatibus fuga illum.
            Animi eligendi ullam itaque accusamus, a quas tempore ducimus hic
            dicta pariatur delectus distinctio odio error similique, dolor, quod
            nostrum doloremque quam praesentium quae commodi!
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Channel</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            eligendi ullam praesentium aliquid animi, at magnam! Laborum
            aspernatur consectetur repellat?
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Instagram</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            eligendi ullam praesentium aliquid animi, at magnam! Laborum
            aspernatur consectetur repellat?
          </p>
        </div>
        <aside className="mt-8 lg:mt-0 lg:w-1/4">lsss</aside>
      </div>
    </PageContainer>
  );
};

export default AboutPage;
