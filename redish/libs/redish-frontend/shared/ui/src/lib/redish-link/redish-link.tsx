import { Link, To } from 'react-router-dom';
import styles from './redish-link.module.scss';

export interface RedishLinkProps {
  children: React.ReactNode;
  to: To;
  external?: boolean;
}

export function RedishLink({ children, to, external }: RedishLinkProps) {
  return (
    <Link
      className={styles.container}
      to={to}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}{external && <span className={styles.hint}>&nbsp;🡕</span>}
    </Link>
  );
}

export default RedishLink;
