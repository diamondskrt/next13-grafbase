import { FC } from 'react';
import Typography from '@/components/Typography';
import Categories from '@/components/pages/home/Categories';
import LoadMore from '@/components/pages/home/LoadMore';
import ProjectCard from '@/components/pages/home/ProjectCard';
import { fetchAllProjects } from '@/graphql/api';
import { PageInfo, ProjectInterface } from '@/types/common';

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
      <section className="relative flexCenter bg-black h-[550px] overflow-hidden">
        <video
          className="absolute h-[100%] sm:h-auto sm:w-full max-w-none transition-all brightness-50"
          autoPlay
          muted
          loop
          data-src-lg="https://cdn.dribbble.com/uploads/39421/original/963b4f8739cbdf86ca3f3a23245efd18.mp4?1657824985"
          data-src-sm="https://cdn.dribbble.com/uploads/39422/original/2a124f438241970f60b377e881b8dc0b.mp4?1657824997"
        >
          <source
            src="https://cdn.dribbble.com/uploads/39421/original/963b4f8739cbdf86ca3f3a23245efd18.mp4?1657824985"
            type="video/mp4"
          />
        </video>
        <div className="grid text-white text-center w-full md:w-[60%] lg:w-[40%] gap-4 z-[2] p-2">
          <Typography variant="h1" className="font-semibold">
            Explore the world’s leading design portfolios
          </Typography>
          <Typography variant="body">
            Millions of designers and agencies around the world showcase their
            portfolio work on Dribbble - the home to the world’s best design and
            creative professionals.
          </Typography>
        </div>
      </section>
      <section className="projects grid gap-10 paddings">
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
