import { getManyContinents } from '@/shipping/shipping-fetchers';
import { getDb } from '@/db/db-utils';

jest.mock('@/db/db-utils');

describe('getManyContinents', () => {
  it('should return all continents from the database', async () => {
    const mockContinents = [
      { id: 1, name: 'Asia' },
      { id: 2, name: 'Europe' },
    ];
    (getDb as jest.Mock).mockResolvedValue({ continents: mockContinents });

    const continents = await getManyContinents();
    expect(continents).toEqual(mockContinents);
  });
});
