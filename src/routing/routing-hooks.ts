import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

// https://nextjs.org/docs/app/api-reference/functions/use-pathname#do-something-in-response-to-a-route-change
export function useOnRouteChange(handler: VoidFunction) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handlerRef = useRef<VoidFunction>(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    return () => {
      handlerRef.current();
    };
  }, [pathname, searchParams]);
}