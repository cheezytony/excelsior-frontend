import { HTMLAttributes, useState } from 'react';
import { Logo } from '../components/common/logo';

const AuthenticationLayout: React.FC = ({
  children,
}: HTMLAttributes<HTMLElement>) => {
  const [year] = useState(new Date().getFullYear());

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="flex flex-col justify-between px-6 max-w-full w-full md:px-20 md:w-[600px]">
        <section className="py-6">
          <Logo />
        </section>
        <main className="my-auto md:max-w-md">{children}</main>
        <footer className="font-medium pb-4 text-gray-500">
          &copy; Blog &middot; All Rights Reserved &middot; {year}
        </footer>
      </div>
      <div className="bg-gray-100 flex-grow"></div>
    </div>
  );
};

export default AuthenticationLayout;