import RedishCard from '../redish-card/redish-card';
import RedishLink from '../redish-link/redish-link';
import styles from './redish-footer.module.scss';

export interface RedishFooterProps {
  navigation: Array<{ label: string; to: string; external?: boolean }>;
}

export function RedishFooter({ navigation }: RedishFooterProps) {
  return (
    <footer className={styles.footer}>
      <RedishCard>
        <>
          <h1>Continue exploring</h1>
          {navigation.length > 0 && (
            <ul>
              {navigation.map((nav) => (
                <li key={nav.label}>
                  <RedishLink to={nav.to} external={nav.external}>
                    {nav.label}
                  </RedishLink>
                </li>
              ))}
              <li>
                <RedishLink
                  to="https://icons8.com/icon/4GWa2qYLPZSU/apple-arcade"
                  external
                >
                  Apple Arcade
                </RedishLink>{' '}
                icon by{' '}
                <RedishLink to="https://icons8.com" external>
                  Icons8
                </RedishLink>
              </li>
            </ul>
          )}
        </>
      </RedishCard>
      <RedishCard>
        <>
          <h1>Thanks for playing</h1>
          <p>If you enjoy this, wait for our space program and cars!</p>
        </>
      </RedishCard>
    </footer>
  );
}

export default RedishFooter;
