import NextLink from '@src/routing/NextLink';
import BaseImage, { imageProps } from '@src/common/BaseImage';
import Price from '@src/common/Price';
import { Product } from './ProductsTypes';
import { routes } from '@src/routing/routes';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <NextLink href={routes.product({ params: { productId: product.id } })}>
      <article className="flex flex-col gap-2 h-full group border-2 p-2 md:p-4 rounded-md">
        <div className="relative cursor-pointer">
          <div className="p-2">
            <div className="transition duration-500 ease-out bg-transparent transform group-hover:scale-110">
              <BaseImage
                src={product.image}
                alt={product.title}
                {...imageProps.responsive({
                  aspectRatio: '12 / 10',
                  objectFit: 'contain',
                })}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <div>
            <Price className="text-primary-dark" value={product.price} />
          </div>
          <h3 className="font-bold text-sm">{product.title}</h3>
        </div>
      </article>
    </NextLink>
  );
}
