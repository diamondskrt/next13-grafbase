'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/constants/common';
import Button from './Button';

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category');

  const onSelectCategory = (category: string) => {
    router.push(`${pathName}?category=${category}`);
  };

  const onSelectAllCategory = () => {
    router.push(pathName);
  };

  return (
    <div className="flex overflow-auto gap-4 py-2">
      <Button
        type="button"
        variant={!selectedCategory ? 'default' : 'text'}
        onClick={onSelectAllCategory}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          type="button"
          variant={selectedCategory === category.name ? 'default' : 'text'}
          onClick={() => onSelectCategory(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
