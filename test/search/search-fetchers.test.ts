import { ProductSorting } from '@/search/search-utils';
import { filterProducts } from '@/search/search-fetchers';
import { ProductFilterArgs, ProductFilterResponse } from '@/search/search-types';

jest.mock('@/db/db-utils', () => ({
  getDb: jest.fn().mockResolvedValue({
    sortings: [{ value: ProductSorting.PRICE_ASC, label: 'Price: Low to High' }],
    categories: [{ value: 'electronics', label: 'Electronics' }],
    priceRanges: [{ value: '0-100', label: '$0 - $100' }],
    products: [
      { id: 1, category: { value: 'electronics' }, price: 50 },
      { id: 2, category: { value: 'electronics' }, price: 150 },
    ],
  }),
}));

describe('filterProducts', () => {
  it('should return filtered products based on categories', async () => {
    const args: ProductFilterArgs = { categories: ['electronics'] };
    const response: ProductFilterResponse = await filterProducts(args);

    expect(response.products).toHaveLength(2);
    expect(response.products[0].category.value).toBe('electronics');
  });

  it('should return filtered products based on price ranges', async () => {
    const args: ProductFilterArgs = { priceRanges: ['0-100'] };
    const response: ProductFilterResponse = await filterProducts(args);

    expect(response.products).toHaveLength(1);
    expect(response.products[0].price).toBeLessThanOrEqual(100);
  });

  it('should return sorted products based on price ascending', async () => {
    const args: ProductFilterArgs = { sorting: ProductSorting.PRICE_ASC };
    const response: ProductFilterResponse = await filterProducts(args);

    expect(response.products).toHaveLength(2);
    expect(response.products[0].price).toBeLessThanOrEqual(response.products[1].price);
  });

  it('should return selected filter options', async () => {
    const args: ProductFilterArgs = { categories: ['electronics'], priceRanges: ['0-100'] };
    const response: ProductFilterResponse = await filterProducts(args);

    expect(response.selectedOptions).toHaveLength(2);
    expect(response.selectedOptions[0].value).toBe('electronics');
    expect(response.selectedOptions[1].value).toBe('0-100');
  });
});
