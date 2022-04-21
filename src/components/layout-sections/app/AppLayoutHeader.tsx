import { useEffect, useState } from 'react';
import { useLogout, useSession } from '../../../hooks/auth';
import { IconEdit, IconPower, IconUser } from '../../common/icons';
import { Nav, NavItem } from '../../common/nav';
import { SearchForm } from '../../common/search';

export default function AppLayoutHeader() {
  const [useStickyNavbar, setUseStickyNavbar] = useState<boolean>(false);
  const { isLoggedIn } = useSession();
  const logout = useLogout();

  const handleScroll = () => {
    setUseStickyNavbar(window.scrollY > 50);
  };
  const handleLogout = () => logout();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white border-b flex items-center h-[100px] px-8 py-8 sticky top-0 z-[99] dark:bg-gray-800 dark:border-gray-700 ${
        useStickyNavbar && 'shadows'
      }`}
    >
      <nav className="flex gap-20 items-center w-full">
        <div className="flex-grow mr-auto">
          <SearchForm />
        </div>
        <div>
          <Nav>
            {isLoggedIn ? (
              <>
                <NavItem href="/posts/new" icon={<IconEdit />}>
                  Create Post
                </NavItem>
                <NavItem href="/me" icon={<IconUser />}>
                  My Profile
                </NavItem>
                <NavItem icon={<IconPower />} onClick={handleLogout}>
                  Logout
                </NavItem>
              </>
            ) : (
              <NavItem href="/login" icon={<IconPower />}>
                Login
              </NavItem>
            )}
          </Nav>
        </div>
      </nav>
    </header>
  );
}
