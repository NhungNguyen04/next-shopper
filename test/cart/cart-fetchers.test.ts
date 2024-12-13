import { getCart } from '@/cart/cart-fetchers';
import { cookies } from 'next/headers';
import { getManyProductsByIds } from '@/products/product-fetchers';

// Mock dependencies
jest.mock('next/headers');
jest.mock('@/products/product-fetchers');

describe('getCart', () => {
  let cookieMock: any;

  beforeEach(() => {
    // Mock cookies functionality
    cookieMock = {
      get: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(cookieMock);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should return null if no cart cookie is present', async () => {
    cookieMock.get.mockReturnValue(undefined);

    const cart = await getCart();

    expect(cart).toBeNull();
  });

  it('should return null if cart cookie contains invalid JSON', async () => {
    cookieMock.get.mockReturnValue({ value: 'invalid json' });

    const cart = await getCart();

    expect(cart).toBeNull();
  });

  it('should return an empty cart if products are not found', async () => {
    const cartData = [{ productId: 1, count: 2 }];
    cookieMock.get.mockReturnValue({ value: JSON.stringify(cartData) });

    (getManyProductsByIds as jest.Mock).mockResolvedValue([]);

    const cart = await getCart();

    expect(cart).toEqual({
      cartItems: [],
      totalPrice: 0,
      totalCount: 0,
    });
  });

  it('should return cart details when cart cookie is valid', async () => {
    const cartData = [
      { productId: 1, count: 2 },
      { productId: 2, count: 1 },
    ];
    cookieMock.get.mockReturnValue({ value: JSON.stringify(cartData) });

    (getManyProductsByIds as jest.Mock).mockResolvedValue([
      { id: 1, price: 100 },
      { id: 2, price: 50 },
    ]);

    const cart = await getCart();

    expect(cart).toEqual({
      cartItems: [
        { product: { id: 1, price: 100 }, count: 2 },
        { product: { id: 2, price: 50 }, count: 1 },
      ],
      totalPrice: 250,
      totalCount: 3,
    });
  });
});
