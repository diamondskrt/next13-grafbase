import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

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
      <div className="flexStart gap-2">
        {leftIcon && <Icon name={leftIcon} size={16} />}
        {children}
        {rightIcon && <Icon name={rightIcon} size={16} />}
      </div>
    </button>
  );
};

export default Button;
