import styles from './redish-button.module.scss';
import cn from 'classnames';

export interface RedishButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  secondary?: boolean;
}

export function RedishButton({
  className,
  onClick,
  children,
  secondary,
}: RedishButtonProps) {
  return (
    <button
      className={cn(styles.container, secondary && styles.secondary, className)}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default RedishButton;
