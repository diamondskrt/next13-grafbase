import { footerLinks } from '@/constants/common';
import Typography from '@/components/Typography';
import { FooterColumn } from './FooterColumn';

const Footer = () => {
  const getFullYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="footer grid gap-20 bg-indigo-600 dark:bg-zinc-900 text-white px-5 lg:px-20 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <FooterColumn
          title={footerLinks[0].title}
          links={footerLinks[0].links}
          className="hidden sm:flex"
        />
        <FooterColumn
          title={footerLinks[1].title}
          links={footerLinks[1].links}
          className="hidden sm:flex"
        />
        <FooterColumn
          title={footerLinks[2].title}
          links={footerLinks[2].links}
          className="flex"
        />
        <FooterColumn
          title={footerLinks[3].title}
          links={footerLinks[3].links}
          className="hidden sm:flex"
        />
        <FooterColumn
          title={footerLinks[4].title}
          links={footerLinks[4].links}
          className="hidden sm:flex"
        />
        <FooterColumn
          title={footerLinks[5].title}
          links={footerLinks[5].links}
          className="hidden sm:flex"
        />
      </div>

      <div className="flexBetween text-center text-zinc-200 dark:text-zinc-400 sm:text-left max-sm:flex-col w-full">
        <Typography variant="caption">
          &copy; {getFullYear()} Next13-Graftbase. All rights reserved
        </Typography>
        <Typography variant="caption">
          <span className="font-semibold">10,214</span> projects submitted
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
