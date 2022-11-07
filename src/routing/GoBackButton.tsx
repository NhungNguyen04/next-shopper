'use client';

import Button from '@src/common/Button';
import { ArrowLeftIcon } from '@src/common/Icons';
import { useRouter } from 'next/navigation';

function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      aria-label="Go Back"
      circle
      variant="transparent"
      icon={<ArrowLeftIcon />}
      onClick={router.back}
    />
  );
}

export default GoBackButton;
