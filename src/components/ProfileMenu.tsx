'use client';

import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/solid';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import ConfirmDialog from './ConfirmDialog';
import Typography from './Typography';
import AuthProviders from './AuthProviders';
import Button from './Button';
import { SessionUser } from '@/types/common';

const ProfileMenu = () => {
  const session = useSession();

  const user = session.data?.user as SessionUser;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getShortUserName = (username?: string | null) => {
    if (!username) return 'U';

    return username
      .split(' ')
      .map((el) => el[0])
      .join('')
      .toUpperCase();
  };

  return user ? (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button as={Fragment}>
              <div className="grid primary justify-center items-center w-[42px] h-[42px] rounded-full cursor-pointer">
                <Typography variant="body">
                  {getShortUserName(user.name)}
                </Typography>
              </div>
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0" />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={
                  'absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xs'
                }
              >
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="grid divide-y theme-devide theme-bg">
                    <div className="flex items-center gap-2 p-4">
                      {user.image ? (
                        <Image
                          src={user.image}
                          blurDataURL={user.image}
                          width={42}
                          height={42}
                          className="rounded-full cursor-pointer"
                          alt={user.name}
                        />
                      ) : (
                        <div
                          className={
                            'grid primary justify-center items-center w-[42px] h-[42px] rounded-full cursor-pointer'
                          }
                        >
                          <div className="text-md font-semibold">U</div>
                        </div>
                      )}
                      <div>
                        <Typography variant="caption">{user.name}</Typography>
                        <Typography variant="caption">{user.email}</Typography>
                      </div>
                    </div>

                    <div>
                      <Link href={`profile/${user.id}`}>
                        <div className="menu_item">
                          <UserCircleIcon className="h-6 w-6" />
                          <Typography variant="caption" className="ml-2">
                            Profile
                          </Typography>
                        </div>
                      </Link>
                      <Link href={`profile/${user.id}`}>
                        <div className="menu_item">
                          <Cog6ToothIcon className="h-6 w-6" />
                          <Typography variant="caption" className="ml-2">
                            Settings
                          </Typography>
                        </div>
                      </Link>
                    </div>
                    <div className="hover:bg-[rgb(244,244,244)] dark:hover:bg-[rgb(91,91,91)] p-4">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsDialogOpen(true)}
                      >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                        <Typography variant="caption" className="ml-2">
                          Sign Out
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Sign Out"
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => signOut()}
      />

      <Link href="/create-project">
        <Button>Share Work</Button>
      </Link>
    </>
  ) : (
    <AuthProviders />
  );
};

export default ProfileMenu;
