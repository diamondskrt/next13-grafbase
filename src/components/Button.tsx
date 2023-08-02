import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

interface ButtonProps {
  children: ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  variant?: string;
  loading?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  variant = 'primary',
  loading,
  type = 'button',
  className,
  onClick
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={classNames(`btn-${variant}`, className)}
      onClick={onClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left icon" />
      )}
      {children}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right icon" />
      )}
    </button>
  );
};

export default Button;
