import { footerLinks } from '@/constants/common';
import { FooterColumn } from './FooterColumn';
import Typography from '../Typography';

export const Footer = () => {
  const getFullYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="grid gap-20 paddings">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-5">
        <FooterColumn
          title={footerLinks[0].title}
          links={footerLinks[0].links}
          className="hidden sm:grid auto-rows-min gap-3"
        />
        <FooterColumn
          title={footerLinks[1].title}
          links={footerLinks[1].links}
          className="hidden sm:grid auto-rows-min gap-3"
        />
        <FooterColumn
          title={footerLinks[2].title}
          links={footerLinks[2].links}
          className="text-center sm:text-left grid auto-rows-min gap-3"
        />
        <FooterColumn
          title={footerLinks[3].title}
          links={footerLinks[3].links}
          className="hidden sm:grid auto-rows-min gap-3"
        />
        <FooterColumn
          title={footerLinks[4].title}
          links={footerLinks[4].links}
          className="hidden sm:grid auto-rows-min gap-3"
        />
        <FooterColumn
          title={footerLinks[5].title}
          links={footerLinks[5].links}
          className="hidden sm:grid auto-rows-min gap-3"
        />
      </div>

      <div className="flexBetween max-sm:flex-col w-full">
        <Typography variant="caption">
          &copy; {getFullYear()} Next13-Graftbase. All rights reserved
        </Typography>
        <Typography variant="caption">
          <span className="text-black dark:text-white font-semibold">
            10,214
          </span>{' '}
          projects submitted
        </Typography>
      </div>
    </footer>
  );
};
