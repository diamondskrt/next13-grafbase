'use client';

import { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import { categories } from '@/constants/common';

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const swiperRef = useRef<any | null>(null);

  const selectedCategory = searchParams.get('category');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onSelectCategory = (category: string) => {
    router.push(pathName + '?' + createQueryString('category', category), {
      scroll: false
    });
  };

  const onSelectAllCategory = () => {
    router.push(pathName, { scroll: false });
  };

  return (
    <>
      <div className="categories flex gap-2 overflow-hidden">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor
          onInit={(swiper) => (swiperRef.current = swiper)}
        >
          <SwiperSlide className="w-auto">
            <Button
              type="button"
              variant={!selectedCategory ? 'default' : 'text'}
              onClick={onSelectAllCategory}
            >
              All
            </Button>
          </SwiperSlide>
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="w-auto">
              <Button
                type="button"
                variant={
                  selectedCategory === category.name ? 'default' : 'text'
                }
                onClick={() => onSelectCategory(category.name)}
              >
                {category.name}
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button onClick={() => swiperRef?.current?.slideNext()}>
          <div className="icon w-4 h-4">
            <ChevronRightIcon />
          </div>
        </Button>
      </div>
    </>
  );
};

export default Categories;
