'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { categories } from '@/constants/common';

const Categories = () => {
  const searchParams = useSearchParams();
  const swiperRef = useRef<any | null>(null);

  const selectedCategory = searchParams.get('category');

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
            <Link href="/" scroll={false}>
              <Button
                type="button"
                variant={!selectedCategory ? 'default' : 'text'}
              >
                All
              </Button>
            </Link>
          </SwiperSlide>
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="w-auto">
              <Link
                href={{ query: { category: category.name } }}
                scroll={false}
              >
                <Button
                  type="button"
                  variant={
                    selectedCategory === category.name ? 'default' : 'text'
                  }
                >
                  {category.name}
                </Button>
              </Link>
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
