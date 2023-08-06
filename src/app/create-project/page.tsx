'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import CreateProjectForm from '@/components/CreateProjectForm';
import Typography from '@/components/Typography';

const CreateProject = () => {
  const session = useSession();

  if (session.status === 'unauthenticated') redirect('/');

  return (
    <>
      <section>
        <Typography variant="h1">Create Project</Typography>

        <CreateProjectForm />
      </section>
    </>
  );
};

export default CreateProject;
