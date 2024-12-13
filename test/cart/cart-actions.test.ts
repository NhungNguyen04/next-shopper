import { addProductToCart, decreaseProductInCart, removeProductFromCart, clearCart } from '@/cart/cart-actions';
import { getCart } from '@/cart/cart-fetchers';
import { cookies } from 'next/headers';

// Mock dependencies
jest.mock('@/cart/cart-fetchers');
jest.mock('next/headers');

describe('Cart Actions', () => {
  let cookieMock: any;

  beforeEach(() => {
    // Mock cookies functionality
    cookieMock = {
      set: jest.fn(),
      delete: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(cookieMock);

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('addProductToCart', () => {
    it('should add a new product to the cart', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce(null);

      await addProductToCart(1);

      expect(cookieMock.set).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([{ productId: 1, count: 1 }])
      );
    });

    it('should increment count of existing product in the cart', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [{ product: { id: 1 }, count: 2 }],
      });

      await addProductToCart(1);

      expect(cookieMock.set).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([{ productId: 1, count: 3 }])
      );
    });

    it('should add a new product when cart already has other products', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [{ product: { id: 2 }, count: 1 }],
      });

      await addProductToCart(1);

      expect(cookieMock.set).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([
          { productId: 2, count: 1 },
          { productId: 1, count: 1 },
        ])
      );
    });

    it('should throw an error if productId is invalid', async () => {
      await expect(addProductToCart(null as unknown as number)).rejects.toThrow();
    });

    it('should throw an error if productId is negative', async () => {
      await expect(addProductToCart(-1)).rejects.toThrow('Invalid productId');
    });
  });

  describe('decreaseProductInCart', () => {
    it('should decrement product count in the cart', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [{ product: { id: 1 }, count: 2 }],
      });

      await decreaseProductInCart(1);

      expect(cookieMock.set).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([{ productId: 1, count: 1 }])
      );
    });

    it('should remove product if count becomes less than 1', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [{ product: { id: 1 }, count: 1 }],
      });

      await decreaseProductInCart(1);

      expect(cookieMock.delete).toHaveBeenCalledWith('cart');
    });

    it('should do nothing if product is not in the cart', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [{ product: { id: 2 }, count: 1 }],
      });

      await decreaseProductInCart(1);

      expect(cookieMock.set).not.toHaveBeenCalled();
      expect(cookieMock.delete).not.toHaveBeenCalled();
    });

    it('should do nothing if cart is empty', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce(null);

      await decreaseProductInCart(1);

      expect(cookieMock.set).not.toHaveBeenCalled();
      expect(cookieMock.delete).not.toHaveBeenCalled();
    });

    it('should throw an error if productId is not a number', async () => {
      await expect(decreaseProductInCart(null as unknown as number)).rejects.toThrow('Invalid productId');
    });
  });

  describe('removeProductFromCart', () => {
    it('should remove a product from the cart', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [
          { product: { id: 1 }, count: 1 },
          { product: { id: 2 }, count: 3 },
        ],
      });

      await removeProductFromCart(1);

      expect(cookieMock.set).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([{ productId: 2, count: 3 }])
      );
    });

    it('should delete the cart if no products remain', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [{ product: { id: 1 }, count: 1 }],
      });

      await removeProductFromCart(1);

      expect(cookieMock.delete).toHaveBeenCalledWith('cart');
    });

    it('should do nothing if product is not in the cart', async () => {
      (getCart as jest.Mock).mockResolvedValueOnce({
        cartItems: [{ product: { id: 2 }, count: 1 }],
      });

      await removeProductFromCart(1);

      expect(cookieMock.set).not.toHaveBeenCalled();
      expect(cookieMock.delete).not.toHaveBeenCalled();
    });
  });

  describe('clearCart', () => {
    it('should clear the cart by deleting the cookie', async () => {
      await clearCart();

      expect(cookieMock.delete).toHaveBeenCalledWith('cart');
    });
  });
});
