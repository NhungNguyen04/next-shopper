import { completeCheckout } from '@/checkout/checkout-actions';
import { shippingInfoSchema } from '@/shipping/shipping-utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('completeCheckout', () => {
  const mockCookies = {
    delete: jest.fn(),
  };

  beforeEach(() => {
    (cookies as jest.Mock).mockReturnValue(mockCookies);
    jest.clearAllMocks();
  });

  it('should return field errors if input validation fails', async () => {
    const formData = new FormData();
    formData.set('continentId', '');
    formData.set('regionId', '');
    formData.set('cityId', '');
    formData.set('address', '');
    formData.set('phone', '');
    formData.set('email', '');

    const result = await completeCheckout(null, formData);

    expect(result.success).toBe(false);
  });

  it('should delete cart cookie and redirect on successful checkout', async () => {
    const formData = new FormData();
    formData.set('continentId', '1');
    formData.set('regionId', '1');
    formData.set('cityId', '1');
    formData.set('address', '123 Main St');
    formData.set('phone', '1234567890');
    formData.set('email', 'test@example.com');

    const result = await completeCheckout(null, formData);

    expect(result.success).toBe(true);
    expect(mockCookies.delete).toHaveBeenCalledWith('cart');
    expect(redirect).toHaveBeenCalledWith('/checkout/success');
  });
});
