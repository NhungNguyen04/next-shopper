import classNames from 'classnames';

type ContainerProps = React.PropsWithChildren<{
  as?: keyof React.JSX.IntrinsicElements;
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}>;

export default function Container({
  as = 'div',
  maxWidth,
  className,
  children,
}: ContainerProps) {
  const As = as;

  return (
    <As
      className={classNames(
        {
          'max-w-screen-sm': maxWidth === 'sm',
          'max-w-screen-md': maxWidth === 'md',
          'max-w-screen-lg': maxWidth === 'lg',
          'max-w-screen-xl': maxWidth === 'xl',
          'max-w-screen-2xl': maxWidth === '2xl',
        },
        'mx-auto w-full',
        className,
      )}
    >
      {children}
    </As>
  );
}