import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface TagAttributes {
  children?: ReactNode;
  className?: HTMLAttributes<HTMLElement>['className'];
  isActive?: boolean;
  isPreview?: boolean;
  size?: 'md' | 'lg' | 'sm';
  style?: HTMLAttributes<HTMLElement>['style'];
  onClick?: () => void;
}

export const Tag: React.FC<TagAttributes> = ({
  children,
  className,
  isActive,
  size = 'sm',
  onClick,
  ...props
}: TagAttributes) => {
  const tagRef = useRef<HTMLDivElement>(null);
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const dimension = useMemo(() => {
    switch (size) {
      case 'md':
        return 'gap-2 px-4 py-2';

      case 'sm':
      default:
        return 'gap-1 py-1 px-3';
    }
  }, [size]);
  const computedClassName = useMemo(
    () =>
      [
        className,
        'bg-blue-50 border-2 border-blue-50 duration-300 flex font-medium items-center rounded text-blue-400 text-sm',
        dimension,
        isClickable &&
          'cursor-pointer hover:border-blue-400 hover:text-blue-500',
        isActive && 'border-blue-400 text-blue-500',
      ]
        .filter((name) => !!name)
        .join(' '),
    [className, dimension, isActive, isClickable]
  );

  useEffect(() => {
    setIsClickable(tagRef.current?.matches('a *, button *') || !!onClick);
  }, []);

  return (
    <div {...{ ...props, className: computedClassName, onClick, ref: tagRef }}>
      {children}
    </div>
  );
};
