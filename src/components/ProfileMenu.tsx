'use client';

import { FC, Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { SessionInterface } from '@/types/common';
import ConfirmDialog from './ConfirmDialog';
import Typography from './Typography';

interface ProfileMenuProps {
  session: SessionInterface;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ session }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!session.user) return null;

  const getShortUserName = (username?: string) => {
    if (!username) return 'U';

    return username
      .split(' ')
      .map((el) => el[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button as={Fragment}>
              <div className="grid primary justify-center items-center w-[42px] h-[42px] rounded-full cursor-pointer">
                <Typography variant="body">
                  {getShortUserName(session.user.name)}
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
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          width={42}
                          height={42}
                          className="rounded-full cursor-pointer"
                          alt={session.user.name}
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
                        <Typography variant="caption">
                          {session.user.name}
                        </Typography>
                        <Typography variant="caption">
                          {session.user.email}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Link href={`profile/${session.user.id}`}>
                        <div className="profile_item">
                          <UserCircleIcon className="h-6 w-6" />
                          <Typography variant="caption" className="ml-2">
                            Profile
                          </Typography>
                        </div>
                      </Link>
                      <Link href={`profile/${session.user.id}`}>
                        <div className="profile_item">
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
    </div>
  );
};

export default ProfileMenu;
