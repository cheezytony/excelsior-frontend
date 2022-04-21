import { HTMLAttributes } from 'react';
import AppLayoutHeader from '../components/layout-sections/app/AppLayoutHeader';
import AppLayoutSidebar from '../components/layout-sections/app/AppLayoutSidebar';

const AppLayout: React.FC = ({ children }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className="flex min-h-screen relative">
      <AppLayoutSidebar />
      <div className="border-l flex flex-col flex-grow relative dark:border-gray-700">
        <AppLayoutHeader />
        <main className="flex-grow px-8 pt-16 pb-20">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;