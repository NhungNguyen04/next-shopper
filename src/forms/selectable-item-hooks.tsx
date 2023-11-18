import { CheckIcon } from '@/common/icons';
import classNames from 'classnames';

export function useSelectableItemProps() {
  return {
    rootClassName: 'flex items-center gap-1',
    // TODO: Improve focus styles
    itemClassName: classNames(
      'h-7 w-7 flex-none rounded-md border-2 border-primary-main',
      'data-[state=checked]:bg-primary-light',
      'disabled:opacity-50 [&+label]:disabled:opacity-50',
      '[&+label]:enabled:cursor-pointer [&+label]:enabled:hover:bg-overlay-light [&+label]:enabled:active:bg-overlay-main',
    ),
    indicatorClassName: 'flex items-center justify-center text-white',
    icon: <CheckIcon className="mt-0.5" size="1.2rem" />,
    labelClassName: 'w-full select-none rounded-md p-2',
  };
}