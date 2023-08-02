import { FC } from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: FC<IconProps> = ({ name, size, className }) => {
  return (
    <svg width={size} height={size} className={className}>
      <use xlinkHref={`/images/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
