import { FC } from 'react';
import ProjectCard from '@/components/ProjectCard';
import Typography from '@/components/Typography';
import { fetchAllProjects } from '@/graphql/api';
import { PageInfo, ProjectInterface } from '@/types/common';
import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';

export interface ProjectSearchEdges {
  node: ProjectInterface;
}

interface ProjectSearchData {
  projectSearch: {
    edges: ProjectSearchEdges[];
    pageInfo: PageInfo;
  };
}

interface SearchParams {
  category?: string;
  endcursor?: string;
}

interface HomePageProps {
  searchParams: SearchParams;
}

const HomePage: FC<HomePageProps> = async ({
  searchParams: { category, endcursor }
}) => {
  const data = (await fetchAllProjects(
    category,
    endcursor
  )) as ProjectSearchData;

  const projects = data?.projectSearch?.edges || [];
  const pageInfo = data?.projectSearch?.pageInfo || null;

  return (
    <>
      <section className="grid gap-10">
        <Categories />

        {projects.length ? (
          <div className="card-grid">
            {projects.map(({ node: project }) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                image={project.image}
                title={project.title}
                creatorAvatarUrl={project.createdBy.avatarUrl}
                creatorName={project.createdBy.name}
                creatorId={project.createdBy.id}
              />
            ))}
          </div>
        ) : (
          <Typography variant="body">
            No projects found, go create some first.
          </Typography>
        )}

        <LoadMore pageInfo={pageInfo} />
      </section>
    </>
  );
};

export default HomePage;
