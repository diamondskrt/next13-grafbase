import { FC } from 'react';
import ProjectForm from '@/components/ProjectForm';
import Typography from '@/components/Typography';
import { ProjectInterface } from '@/types/common';
import { getProjectById } from '@/graphql/api';

interface EditPageParams {
  id: string;
}

interface EditPageProps {
  params: EditPageParams;
}

const EditPage: FC<EditPageProps> = async ({ params }) => {
  const result = (await getProjectById(params.id)) as {
    project?: ProjectInterface;
  };

  return (
    <div className="edit-project grid gap-4 paddings">
      <Typography variant="h3">Edit Project</Typography>

      <ProjectForm project={result?.project} />
    </div>
  );
};

export default EditPage;
