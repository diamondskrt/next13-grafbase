import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectById } from '@/graphql/api';
import { ProjectInterface } from '@/types/common';
import Typography from '@/components/Typography';
import RelatedProjects from '@/components/RelatedProjects';
import ProjectActions from '@/components/ProjectActions';

interface ProjectPageParams {
  id: string;
}

interface GetProjectByIdResult {
  project: ProjectInterface | null;
}

interface ProjectPageProps {
  params: ProjectPageParams;
}

const ProjectPage: FC<ProjectPageProps> = async ({ params: { id } }) => {
  const result = (await getProjectById(id)) as GetProjectByIdResult;

  const project = result?.project;

  return (
    <div>
      {project ? (
        <div className="grid gap-10">
          <div>
            <div className="flexBetween">
              <div className="flexStart gap-2">
                <Link href={`/profile/${project.createdBy.id}`}>
                  <Image
                    src={project.createdBy.avatarUrl}
                    blurDataURL={project.createdBy.avatarUrl}
                    width={50}
                    height={50}
                    alt="profile"
                    className="rounded-full"
                  />
                </Link>
                <div className="grid">
                  <Typography variant="subtitle" className="font-semibold">
                    {project.title}
                  </Typography>
                  <div className="flexStart gap-2">
                    <Typography variant="caption">
                      {project.createdBy.name}
                    </Typography>
                    <div className="text-zinc-300">|</div>
                    <Link
                      href={`/?category=${project.category}`}
                      className="primary--text"
                    >
                      <Typography variant="caption">
                        {project.category}
                      </Typography>
                    </Link>
                  </div>
                </div>
              </div>
              <ProjectActions
                projectId={project.id}
                creatorEmail={project.createdBy.email}
              />
            </div>

            <div className="grid w-[40%] gap-4 mt-6">
              <div className="relative aspect-square w-[400px]">
                <Image
                  src={project.image}
                  blurDataURL={project.image}
                  fill
                  alt={project.title}
                  className="rounded-xl"
                />
              </div>
              <Typography variant="body">{project.description}</Typography>
              <div className="flex gap-2">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary--text"
                >
                  <Typography variant="body">
                    <span className="underline">Github</span>
                  </Typography>
                </Link>
                <Link
                  href={project.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary--text"
                >
                  <Typography variant="body">
                    <span className="underline">Live Site</span>
                  </Typography>
                </Link>
              </div>
            </div>
          </div>

          <RelatedProjects
            userId={project.createdBy.id}
            projectId={project.id}
          />
        </div>
      ) : (
        <Typography variant="body">Failed to fetch project</Typography>
      )}
    </div>
  );
};

export default ProjectPage;
