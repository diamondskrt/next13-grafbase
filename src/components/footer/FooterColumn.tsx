import { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Typography from '../Typography';

interface FooterColumnProps {
  title: string;
  links: string[];
  className?: string;
}

export const FooterColumn: FC<FooterColumnProps> = ({
  title,
  links,
  className
}) => (
  <div className={classNames('flex flex-col gap-2', className)}>
    <Typography variant="subtitle">{title}</Typography>
    <ul className="grid gap-2 default--text">
      {links.map((link) => (
        <Link href="/" key={link}>
          <li>
            <Typography variant="caption">{link}</Typography>
          </li>
        </Link>
      ))}
    </ul>
  </div>
);
