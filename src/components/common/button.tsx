import Link from 'next/link';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { IconLoader } from './icons';

interface ButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  colorScheme?: 'black' | 'blue' | 'gray' | 'red';
  disabled?: boolean;
  href?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: 'lg' | 'md' | 'sm';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'icon' | 'link' | 'solid' | 'soft' | 'outline';
}

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonAttributes>(
  (
    {
      children,
      className,
      colorScheme,
      href,
      disabled = false,
      isDisabled = false,
      isLoading = false,
      size,
      variant,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const padding = (() => {
      if (['icon', 'link'].includes(variant)) return;

      switch (size) {
        case 'lg':
          return 'gap-3 px-16 py-6';
        case 'md':
          return 'gap-2 px-8 py-4';
        case 'sm':
          return 'gap-1 px-4 py-2';
      }
    })();
    const theme = (() => {
      switch (colorScheme) {
        case 'black':
          return 'bg-gray-700 text-white hover:bg-gray-900';
        case 'blue':
          return 'bg-blue-500 text-white hover:bg-blue-400';
        case 'gray':
          return 'bg-gray-300 text-gray-500 hover:bg-gray-200';
        case 'red':
          return 'bg-red-500 text-white hover:bg-red-400';
      }
    })();
    const dimensions = (() => {
      switch (variant) {
        case 'icon':
          switch (size) {
            case 'md':
              return 'h-8 w-8';
          }
      }
    })();
    const computedClassName = `duration-300 font-semibold inline-flex items-center justify-center rounded transform hover:-translate-y-1 active:scale-95 ${padding} ${theme} ${dimensions} ${className}`;
    if (href) {
      return (
        <Link href={href}>
          <a className={`${computedClassName} hover:underline`}>{children}</a>
        </Link>
      );
    }
    return (
      <button
        ref={ref}
        {...{
          ...props,
          type,
          className: computedClassName,
          disabled: isLoading || isDisabled || disabled,
        }}
      >
        {isLoading ? (
          <span className="animate-spin">
            <IconLoader />
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

// export const Button = ({
//   children,
//   className,
//   colorScheme,
//   href,
//   disabled = false,
//   isDisabled = false,
//   isLoading = false,
//   size,
//   variant,
//   type = 'button',
//   ...props
// }: ButtonAttributes) => {
//   const padding = (() => {
//     if (['icon', 'link'].includes(variant)) return;

//     switch (size) {
//       case 'lg':
//         return 'gap-3 px-16 py-6';
//       case 'md':
//         return 'gap-2 px-8 py-4';
//       case 'sm':
//         return 'gap-1 px-4 py-2';
//     }
//   })();
//   const theme = (() => {
//     switch (colorScheme) {
//       case 'black':
//         return 'bg-gray-700 text-white hover:bg-gray-900';
//       case 'blue':
//         return 'bg-blue-500 text-white hover:bg-blue-400';
//       case 'gray':
//         return 'bg-gray-300 text-gray-500 hover:bg-gray-200';
//       case 'red':
//         return 'bg-red-500 text-white hover:bg-red-400';
//     }
//   })();
//   const dimensions = (() => {
//     switch (variant) {
//       case 'icon':
//         switch (size) {
//           case 'md':
//             return 'h-8 w-8';
//         }
//     }
//   })();
//   const computedClassName = `duration-300 font-semibold inline-flex items-center justify-center rounded transform hover:-translate-y-1 active:scale-95 ${padding} ${theme} ${dimensions} ${className}`;
//   if (href) {
//     return (
//       <Link href={href}>
//         <a className={`${computedClassName} hover:underline`}>{children}</a>
//       </Link>
//     );
//   }
//   return (
//     <button
//       {...{
//         ...props,
//         type,
//         className: computedClassName,
//         disabled: isLoading || isDisabled || disabled,
//       }}
//     >
//       {isLoading ? (
//         <span className='animate-spin'>
//           <IconLoader />
//         </span>
//       ) : (
//         children
//       )}
//     </button>
//   );
// };
