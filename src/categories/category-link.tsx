import type { NextLinkProps } from '@/routing/next-link';
import NextLink from '@/routing/next-link';
import BaseImage from '@/common/base-image';

type CategoryLinkProps = Pick<NextLinkProps, 'href'> & {
  imageSrc: string;
  title: string;
};

export default function CategoryLink({
  href,
  imageSrc,
  title,
}: CategoryLinkProps) {
  return (
    <NextLink
      className="relative block w-full h-80 group rounded-md overflow-hidden"
      href={href}
    >
      <BaseImage
        src={imageSrc}
        alt={title}
        className="object-cover transition duration-700 transform group-hover:scale-110"
        fill
        priority
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="p-6 bg-black bg-opacity-50 rounded-md">
          <h2 className="text-white text-3xl md:text-4xl font-bold border-b-4 mb-2 text-center">
            {title}
          </h2>
        </div>
      </div>
    </NextLink>
  );
}