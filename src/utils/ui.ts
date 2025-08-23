import { cva, type VariantProps } from 'class-variance-authority';

// Button variants using class-variance-authority
export const buttonVariants = cva(
  'btn inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        link: 'btn-link',
      },
      size: {
        default: 'btn-md',
        sm: 'btn-sm',
        lg: 'btn-lg',
        icon: 'btn-sm btn-square',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonProps = VariantProps<typeof buttonVariants>;

// Input variants
export const inputVariants = cva(
  'input w-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'input-bordered',
        ghost: 'input-ghost',
      },
      size: {
        default: 'input-md',
        sm: 'input-sm',
        lg: 'input-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type InputProps = VariantProps<typeof inputVariants>;

// Modal variants
export const modalVariants = cva('modal', {
  variants: {
    open: {
      true: 'modal-open',
      false: '',
    },
  },
  defaultVariants: {
    open: false,
  },
});

export type ModalProps = VariantProps<typeof modalVariants>;
