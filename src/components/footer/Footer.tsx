import { footerLinks } from '@/constants/common';
import { FooterColumn } from './FooterColumn';
import Typography from '../Typography';

export const Footer = () => {
  const getFullYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="flexStart flex-col w-full gap-20 paddings">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
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
