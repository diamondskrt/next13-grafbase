import { FC } from 'react';
import classNames from 'classnames';
import Typography from '@/components/Typography';

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
  <div
    className={classNames('flex-col text-center sm:text-left gap-4', className)}
  >
    <Typography variant="subtitle" className="hidden sm:block font-semibold">
      {title}
    </Typography>
    <ul className="grid gap-2">
      {links.map((link) => (
        <li>
          <Typography variant="caption">{link}</Typography>
        </li>
      ))}
    </ul>
  </div>
);
