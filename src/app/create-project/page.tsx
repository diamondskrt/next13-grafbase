'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';
import Typography from '@/components/Typography';

const CreateProject = () => {
  const session = useSession();

  if (session.status === 'unauthenticated') redirect('/');

  return (
    <div className="create-project grid gap-4 paddings">
      <Typography variant="h3">Create Project</Typography>

      <ProjectForm />
    </div>
  );
};

export default CreateProject;
