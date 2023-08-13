'use client';

import { FC, Fragment, useState } from 'react';
import classNames from 'classnames';
import { Popover, Transition } from '@headlessui/react';
import {
  Bars2Icon,
  PlusIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/solid';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import ConfirmDialog from '@/components/ConfirmDialog';
import Typography from '@/components/Typography';
import { navLinks } from '@/constants/common';
import { useNoScroll } from '@/hooks/no-scroll';
import { SessionUser } from '@/types/common';
import AuthProviders from './Auth';

interface DrawerProps {
  className?: string;
}

const Drawer: FC<DrawerProps> = ({ className }) => {
  const session = useSession();
  const user = session.data?.user as SessionUser;
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useNoScroll(drawerIsOpen);

  return (
    <div className={classNames('drawer text-white', className)}>
      <Button color="light" onClick={() => setDrawerIsOpen(true)}>
        <Bars2Icon className="w-4 h-4" />
      </Button>
      <Popover>
        {drawerIsOpen ? (
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDrawerIsOpen(false)}
          />
        ) : null}
        <Transition
          show={drawerIsOpen}
          as={Fragment}
          enter="transition ease-in-out duration-200 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-200 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Popover.Panel className="fixed right-0 inset-y-0 w-[80%] z-30 theme-bg">
            <div className="flex flex-col justify-center h-full">
              {user ? (
                <div className="flex divide-x dark:divide-zinc-600">
                  <div className="flexCenter bg-indigo-600 dark:bg-zinc-800 w-[40%] aspect-square">
                    {user.image ? (
                      <Image
                        src={user.image}
                        blurDataURL={user.image}
                        width={62}
                        height={62}
                        className="rounded-full"
                        alt={user.name}
                      />
                    ) : (
                      <div
                        className={
                          'grid primary justify-center items-center w-[62px] h-[62px] rounded-full cursor-pointer'
                        }
                      >
                        <div className="text-md font-semibold">U</div>
                      </div>
                    )}
                  </div>
                  <div className="grid divide-y dark:divide-zinc-600 bg-indigo-600 dark:bg-zinc-800 w-[60%]">
                    <Link
                      href="/create-project"
                      className="flexStart gap-2 p-2"
                      onClick={() => setDrawerIsOpen(false)}
                    >
                      <PlusIcon className="h-6 w-6" />
                      <Typography variant="caption">Create Project</Typography>
                    </Link>
                    <div
                      className="flexStart gap-2 p-2 cursor-pointer"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                      <Typography variant="caption">Log Out</Typography>
                    </div>
                  </div>
                </div>
              ) : (
                <AuthProviders className="text-center mb-4" />
              )}
              <ul className="drawer-menu grid font-medium text-center">
                {navLinks.map(({ key, href, text }) => (
                  <Link key={key} href={href} className="drawer-menu-link py-6">
                    <li>{text}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Sign Out"
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => signOut()}
      />
    </div>
  );
};

export default Drawer;
