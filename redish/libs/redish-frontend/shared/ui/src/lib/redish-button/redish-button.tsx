import styles from './redish-button.module.scss';
import cn from 'classnames';

export interface RedishButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  secondary?: boolean;
}

export function RedishButton({
  onClick,
  children,
  secondary,
}: RedishButtonProps) {
  return (
    <button
      className={cn(styles.container, secondary && styles.secondary)}
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
