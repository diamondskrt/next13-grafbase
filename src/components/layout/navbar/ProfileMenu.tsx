'use client';

import { FC, Fragment, useState } from 'react';
import classNames from 'classnames';
import {
  PlusIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import ConfirmDialog from '@/components/ConfirmDialog';
import Typography from '@/components/Typography';
import { SessionUser } from '@/types/common';
import Auth from './Auth';

interface ProfileMenuProps {
  className?: string;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ className }) => {
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

  return (
    <div className={classNames('profile-menu', className)}>
      {user ? (
        <>
          <Popover className="relative">
            <>
              <Popover.Button as={Fragment}>
                <div className="avatar">
                  <Typography variant="body" className="font-medium">
                    {getShortUserName(user.name)}
                  </Typography>
                </div>
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0" />
              <Transition
                as={Fragment}
                enter="transition ease-in-out duration-200 transform"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-200 transform"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="absolute right-0 z-20 w-[300px] mt-3">
                  <div className="rounded-md shadow-lg">
                    <div className="grid divide-y theme-devide theme-bg">
                      <div className="flex items-center gap-2 p-4">
                        {user.image ? (
                          <Image
                            src={user.image}
                            blurDataURL={user.image}
                            width={42}
                            height={42}
                            className="rounded-full"
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
                          <Typography variant="caption">
                            {user.email}
                          </Typography>
                        </div>
                      </div>

                      <Popover.Button as={Link} href="/create-project">
                        <div className="menu_item">
                          <PlusIcon className="h-6 w-6" />
                          <Typography variant="caption" className="ml-2">
                            Create Project
                          </Typography>
                        </div>
                      </Popover.Button>
                      <div className="menu_item opacity-40">
                        <UserCircleIcon className="h-6 w-6" />
                        <Typography variant="caption" className="ml-2">
                          Profile
                        </Typography>
                      </div>
                      <div className="menu_item opacity-40">
                        <Cog6ToothIcon className="h-6 w-6" />
                        <Typography variant="caption" className="ml-2">
                          Settings
                        </Typography>
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
          </Popover>

          <ConfirmDialog
            isOpen={isDialogOpen}
            title="Sign Out"
            onClose={() => setIsDialogOpen(false)}
            onConfirm={() => signOut()}
          />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default ProfileMenu;
