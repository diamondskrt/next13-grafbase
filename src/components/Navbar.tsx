import Link from 'next/link';
import { navLinks } from '@/constants/common';
import ProfileMenu from './ProfileMenu';
import Typography from './Typography';
import ThemeSwitcher from './ThemeSwitcher';
import Icon from './Icon';

const Navbar = async () => {
  return (
    <nav className="flexBetween shadow-md shadow-black/20 gap-4 py-5 px-8">
      <div className="flexStart gap-10">
        <Link href="/">
          <Icon name="logo" size={28} />
        </Link>
        <ul className="xl:flex hidden font-medium gap-7">
          {navLinks.map(({ key, href, text }) => (
            <Link key={key} href={href}>
              <Typography variant="caption">{text}</Typography>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        <ThemeSwitcher />
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
