import { getOneProductById, getManyProductsByIds, getRelatedProducts } from '@/products/product-fetchers';
import { getDb } from '@/db/db-utils';
import { filterProducts } from '@/search/search-fetchers';

// Remove mocking of getOneProductById
// jest.mock('@/products/product-fetchers');

jest.mock('@/db/db-utils');
jest.mock('@/search/search-fetchers');

describe('Product Fetchers', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getOneProductById', () => {
    it('should return the product with the given id', async () => {
      const mockProduct = { id: 1, name: 'Test Product' }; // Changed id to number
      (getDb as jest.Mock).mockResolvedValue({ products: [mockProduct] });

      const product = await getOneProductById(1); // Ensure ID is number
      expect(product).toEqual(mockProduct);
    });

    it('should return undefined if product not found', async () => {
      (getDb as jest.Mock).mockResolvedValue({ products: [] });

      const product = await getOneProductById(2); // Ensure ID is number
      expect(product).toBeUndefined();
    });
  });

  describe('getManyProductsByIds', () => {
    it('should return products matching the given ids', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1' }, // Changed ids to numbers
        { id: 2, name: 'Product 2' },
      ];
      (getDb as jest.Mock).mockResolvedValue({ products: mockProducts });

      const products = await getManyProductsByIds([1, 2]); // Ensure IDs are numbers
      expect(products).toEqual(mockProducts);
    });
  });

  describe('getRelatedProducts', () => {
    it('should return related products excluding the original product', async () => {
      const mockProduct = { id: 1, category: { value: 'electronics' } }; // Changed id to number
      const mockRelatedProduct = { id: 2, category: { value: 'electronics' } };
      // Remove mocking getOneProductById
      // (getOneProductById as jest.Mock).mockResolvedValue(mockProduct);
      (getDb as jest.Mock).mockResolvedValue({ products: [mockProduct, mockRelatedProduct] });
      (filterProducts as jest.Mock).mockResolvedValue({ products: [mockProduct, mockRelatedProduct] });

      const relatedProducts = await getRelatedProducts(1); // Ensure ID is number
      expect(relatedProducts).toEqual([mockRelatedProduct]);
    });

    it('should return empty array if original product not found', async () => {
      // Remove mocking getOneProductById
      // (getOneProductById as jest.Mock).mockResolvedValue(undefined);
      (getDb as jest.Mock).mockResolvedValue({ products: [] });

      const relatedProducts = await getRelatedProducts(1); // Ensure ID is number
      expect(relatedProducts).toEqual([]);
    });
  });
});
