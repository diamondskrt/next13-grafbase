'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { PageInfo } from '@/types/common';

interface LoadMoreProps {
  pageInfo: PageInfo | null;
}

const LoadMore: FC<LoadMoreProps> = ({ pageInfo }) => {
  const router = useRouter();

  if (!pageInfo) return null;

  const { hasPreviousPage, hasNextPage, endCursor } = pageInfo;

  if (!hasPreviousPage && !hasNextPage) return null;

  const navigate = (type: 'prev' | 'next') => {
    const currentParams = new URLSearchParams(window.location.search);

    if (type === 'prev') {
      currentParams.delete('endcursor');
    }

    if (type === 'next') {
      currentParams.set('endcursor', endCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname, { scroll: false });
  };
  return (
    <div className="flexCenter w-full gap-5">
      <Button disabled={!hasPreviousPage} onClick={() => navigate('prev')}>
        First Page
      </Button>
      <Button disabled={!hasNextPage} onClick={() => navigate('next')}>
        Next Shots
      </Button>
    </div>
  );
};

export default LoadMore;
