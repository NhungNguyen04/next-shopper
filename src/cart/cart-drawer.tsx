import { Badge } from '@/common/badge';
import { CartIcon } from '@/common/icons';
import { Price } from '@/common/price';
import { getCart } from './cart-fetchers';
import { CartTotalPrice } from './cart-total-price';
import { CartItemList } from './cart-item-list';
import { ClearCartButton } from './clear-cart-button';
import { CheckoutLink } from '../checkout/checkout-linkt';
import { Button } from '@/common/button';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerTrigger,
} from '@/common/drawer';

export async function CartDrawer() {
  const cart = await getCart();

  return (
    <Drawer
      from="right"
      closeOnPathnameChange
      trigger={
        <Badge value={cart?.totalCount}>
          <DrawerTrigger asChild>
            <Button aria-label="Open Cart Info" icon={<CartIcon />}>
              <Price value={cart?.totalPrice} />
            </Button>
          </DrawerTrigger>
        </Badge>
      }
    >
      <DrawerHeader>
        <h2>Cart</h2>
      </DrawerHeader>
      <DrawerBody className="flex flex-col overflow-auto !p-0">
        <div className="p-2">
          <ClearCartButton cart={cart} />
        </div>
        <CartItemList isDense className="flex-grow overflow-y-auto" />
        <div className="flex flex-col gap-3 bg-background-dark p-4">
          <CartTotalPrice />
          <CheckoutLink />
        </div>
      </DrawerBody>
    </Drawer>
  );
}
