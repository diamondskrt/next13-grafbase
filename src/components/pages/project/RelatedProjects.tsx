import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Typography from '@/components/Typography';
import { getUserProjects } from '@/graphql/api';
import { ProjectInterface, UserProfile } from '@/types/common';

interface GetUserProjectsResult {
  user: UserProfile;
}

interface RelatedProjectsProps {
  userId: string;
  projectId: string;
}

const RelatedProjects: FC<RelatedProjectsProps> = async ({
  userId,
  projectId
}) => {
  const result = (await getUserProjects(userId)) as GetUserProjectsResult;

  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );

  if (!filteredProjects.length) {
    return null;
  }

  return (
    <div className="grid gap-3">
      <Typography variant="h5">Related Projects</Typography>

      <div className="card-grid">
        {filteredProjects.map(({ node: project }) => (
          <Link href={`/project/${project.id}`}>
            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src={project.image}
                blurDataURL={project.image}
                fill
                alt={project.title}
              />
              <div className="absolute inset-0 hover:bg-black/20 flexEnd group transition-all text-white p-3">
                <Typography
                  variant="subtitle"
                  className="font-bold opacity-0 group-hover:opacity-100"
                >
                  {project.title}
                </Typography>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;
