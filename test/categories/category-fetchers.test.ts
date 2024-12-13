import { getManyCategories } from '@/categories/category-fetchers';
import { getDb } from '@/db/db-utils';

jest.mock('@/db/db-utils', () => ({
  getDb: jest.fn(),
}));

describe('getManyCategories', () => {
  it('should fetch categories from the database', async () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
    (getDb as jest.Mock).mockResolvedValue({ categories: mockCategories });

    const categories = await getManyCategories();

    expect(categories).toEqual(mockCategories);
    expect(getDb).toHaveBeenCalledTimes(1);
  });
});
