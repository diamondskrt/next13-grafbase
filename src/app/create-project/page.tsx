'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';
import Typography from '@/components/Typography';

const CreateProject = () => {
  const session = useSession();

  if (session.status === 'unauthenticated') redirect('/');

  return (
    <div className="create-project">
      <Typography variant="h1">Create Project</Typography>

      <ProjectForm />
    </div>
  );
};

export default CreateProject;
