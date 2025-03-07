import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: 'flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-60',
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        secondary: 'bg-brand-light-gray text-brand-dark-blue',
        ghost: 'bg-transparent text-brand-dark-gray',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  });

  return (
    <button
      className={button({ color: color, size: size, className })}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'ghost', 'secondary']),
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
};

export default Button;
