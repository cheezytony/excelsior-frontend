/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import Image from 'next/image';
import { useMemo } from 'react';

interface AvatarAttributes {
  alt?: string;
  size?: 'lg' | 'md' | 'sm' | 'xl';
  src?: string;
}

export const Avatar = ({
  alt,
  size = 'md',
  src = '',
}: AvatarAttributes): JSX.Element => {
  const dimensions = useMemo(() => {
    switch (size) {
      case 'lg':
        return 'h-[64px] w-[64px]';
      case 'xl':
        return 'h-[128px] w-[128px]';
      case 'sm':
        return 'h-[32px] w-[32px]';
      case 'md':
      default:
        return 'h-[48px] w-[48px]';
    }
  }, [size]);

  return (
    <div
      className={`bg-gray-200 flex-shrink-0 ${dimensions} relative rounded`}
    >
      {!!src && (
        <Image
          src={src}
          alt={alt}
          className="h-full object-cover object-center rounded w-full"
          layout="fill"
        />
      )}
    </div>
  );
};
