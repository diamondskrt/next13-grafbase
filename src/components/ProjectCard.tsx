'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Typography from './Typography';
import Icon from './Icon';

interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  creatorId: string;
  creatorAvatarUrl: string;
  creatorName: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  id,
  image,
  title,
  creatorId,
  creatorAvatarUrl,
  creatorName
}) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState(0);

  useEffect(() => {
    const likes = Math.floor(Math.random() * 10000);
    const views = Math.floor(Math.random() * 10000) / 1000;

    setRandomLikes(likes);
    setRandomViews(Number(views.toFixed(1)));
  }, []);

  return (
    <div className="shadow rounded-xl theme-bg max-w-xs overflow-hidden">
      <Link href={`/project/${id}`}>
        <div className="relative aspect-square">
          <Image src={image} blurDataURL={image} fill priority alt={title} />
          <div className="absolute inset-0 hover:bg-black/20 flexEnd group transition-all text-white p-3">
            <Typography
              variant="subtitle"
              className="font-bold opacity-0 group-hover:opacity-100"
            >
              {title}
            </Typography>
          </div>
        </div>
      </Link>
      <div className="flexBetween gap-6 p-3">
        <Link href={`/profile/${creatorId}`}>
          <div className="flexStart gap-2">
            <Image
              src={creatorAvatarUrl}
              blurDataURL={creatorAvatarUrl}
              width={42}
              height={42}
              className="rounded-full cursor-pointer"
              alt={creatorName}
            />
            <Typography variant="caption">{creatorName}</Typography>
          </div>
        </Link>
        <div className="flexStart gap-2">
          {randomLikes ? (
            <div className="flexStart gap-1">
              <Icon name="heart-fill" size={20} className="text-zinc-300" />
              <Typography variant="caption">{randomLikes}</Typography>
            </div>
          ) : null}
          {randomViews ? (
            <div className="flexStart gap-1">
              <Icon name="eye-fill" size={20} className="text-zinc-300" />
              <Typography variant="caption">{randomViews} k</Typography>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
