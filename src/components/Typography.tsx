import { FC, ReactNode, createElement } from 'react';
import classNames from 'classnames';

interface TypographyProps {
  variant: 'h1' | 'h3' | 'h5' | 'subtitle' | 'body' | 'caption';
  className?: string;
  children: ReactNode;
}

const Typography: FC<TypographyProps> = ({ variant, className, children }) => {
  const typographyVariants: Record<string, string> = {
    subtitle: 'h6',
    body: 'p',
    caption: 'p'
  };

  return createElement(
    typographyVariants[variant] ?? variant,
    { className: classNames(`text-${variant}`, className) },
    children
  );
};

export default Typography;
