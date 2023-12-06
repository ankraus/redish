import cn from 'classnames';
import styles from './redish-card.module.scss';

export interface RedishCardProps {
  className?: string;
  children: React.ReactNode;
}

export function RedishCard({ className, children }: RedishCardProps) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}

export default RedishCard;
