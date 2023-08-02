import { FC } from 'react';
import Link from 'next/link';
import Typography from '../Typography';

interface FooterColumnProps {
  title: string;
  links: string[];
}

export const FooterColumn: FC<FooterColumnProps> = ({ title, links }) => (
  <div className="flex flex-1 flex-col gap-3 min-w-max">
    <Typography variant="subtitle">{title}</Typography>
    <ul className="flex flex-col gap-2 default--text">
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
