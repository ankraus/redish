import styles from './redish-card.module.scss';

export interface RedishCardProps {
  children: React.ReactNode;
}

export function RedishCard({ children }: RedishCardProps) {
  return <div className={styles.container}>{children}</div>;
}

export default RedishCard;
