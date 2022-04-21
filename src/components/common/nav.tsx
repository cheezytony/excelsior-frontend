import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AnchorHTMLAttributes,
  createContext,
  useContext,
  useMemo,
} from 'react';

interface NavAttributes {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

interface NavItemAttributes extends AnchorHTMLAttributes<HTMLAnchorElement> {
  after?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  exactMatch?: boolean;
  isActive?: boolean;
}

const NavContext = createContext<{ orientation: 'horizontal' | 'vertical' }>({
  orientation: 'horizontal',
});

export const Nav = ({
  children,
  orientation = 'horizontal',
}: NavAttributes) => {
  const flexDirection = useMemo(() => {
    switch (orientation) {
      case 'horizontal':
        return 'flex-row';
      case 'vertical':
        return 'flex-col';
    }
  }, [orientation]);
  // const computedClassName = useMemo(() => {}, [orientation]);

  return (
    <ul className={`flex ${flexDirection} gap-4`}>
      <NavContext.Provider value={{ orientation }}>
        {children}
      </NavContext.Provider>
    </ul>
  );
};

export const NavItem = ({
  after,
  exactMatch = true,
  href,
  isActive,
  ...props
}: NavItemAttributes) => {
  const { route } = useRouter();
  const isItemActive =
    useMemo<boolean>(() => {
      if (isActive) {
        return true;
      }
      if (exactMatch) {
        return href === route;
      }
      return (
        route.replace(/^\//, '').split('/').shift() ===
        href.replace(/^\//, '').split('/').shift()
      );
    }, [exactMatch, href, isActive, route]);

  return (
    <li className="group">
      {(() => {
        if (href) {
          return (
            <Link href={href} passHref={true}>
              <a>
                <NavLink {...{ ...props, isActive: isItemActive }}></NavLink>
              </a>
            </Link>
          );
        }
        return <NavLink {...{ ...props, isActive: isItemActive }}></NavLink>;
      })()}
      {after}
    </li>
  );
};

export const NavLink = ({
  children,
  className,
  icon,
  isActive,
  ...props
}: NavItemAttributes) => {
  const { orientation } = useContext(NavContext);
  const linkClassName = useMemo(() => {
    return [
      className,
      'cursor-pointer flex gap-2 items-center',
      isActive
        ? 'font-bold hover:text-blue-900 dark:hover:text-white'
        : 'font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
      orientation === 'horizontal' ? 'px-1' : 'py-1',
    ].join(' ');
  }, [className, isActive, orientation]);
  const iconClassName = useMemo(() => {
    return [
      'duration-300 grid place-items-center w-[24px]',
      isActive
        ? 'text-blue-500 hover:text-blue-900'
        : 'text-blue-200 dark:text-blue-300 group-hover:text-blue-400',
    ].join(' ');
  }, [isActive]);
  const contentClassName = useMemo(() => {
    return [
      'duration-300 inline-block transform text-sm',
      orientation === 'horizontal'
        ? 'group-hover:translate-y-0'
        : isActive
        ? 'translate-x-2'
        : 'group-hover:translate-x-2',
    ].join(' ');
  }, [isActive, orientation]);

  return (
    <span {...props} className={linkClassName}>
      {icon && <span className={iconClassName}>{icon}</span>}
      {children && <span className={contentClassName}>{children}</span>}
    </span>
  );
};
