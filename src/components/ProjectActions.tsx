'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { deleteProject, fetchToken } from '@/graphql/api';
import { SessionUser } from '@/types/common';
import ConfirmDialog from './ConfirmDialog';

interface ProjectActionsProps {
  projectId: string;
  creatorEmail: string;
}

const ProjectActions: FC<ProjectActionsProps> = ({
  projectId,
  creatorEmail
}) => {
  const session = useSession();
  const user = session.data?.user as SessionUser;
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteProject = async () => {
    try {
      setIsLoading(true);

      const { token } = await fetchToken();

      await deleteProject(projectId, token);

      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.email !== creatorEmail) {
    return null;
  }

  return (
    <>
      <div className="flexStart gap-2">
        <Link href={`/edit-project/${projectId}`}>
          <div className="btn icon">
            <PencilIcon />
          </div>
        </Link>
        <div
          className={classNames('btn icon', { disabled: isLoading })}
          onClick={() => setIsDialogOpen(true)}
        >
          <TrashIcon />
        </div>
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete Project"
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => onDeleteProject()}
      />
    </>
  );
};

export default ProjectActions;
