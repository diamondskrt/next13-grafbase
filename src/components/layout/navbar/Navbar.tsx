import Link from 'next/link';
import Icon from '@/components/Icon';
import { navLinks } from '@/constants/common';
import ProfileMenu from './ProfileMenu';
import ThemeSwitcher from './ThemeSwitcher';
import Drawer from './Drawer';

const Navbar = async () => {
  return (
    <nav className="navbar">
      <div className="flexStart text-white gap-10">
        <Link href="/">
          <Icon name="logo" size={28} />
        </Link>
        <ul className="menu hidden lg:flex font-medium gap-7">
          {navLinks.map(({ text }) => (
            <li>{text}</li>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        <ThemeSwitcher className="text-white" />
        <Drawer className="block lg:hidden" />
        <ProfileMenu className="hidden lg:block" />
      </div>
    </nav>
  );
};

export default Navbar;
