import RedishButton from '../redish-button/redish-button';
import RedishLink from '../redish-link/redish-link';
import styles from './redish-header.module.scss';

export interface RedishHeaderProps {
  actions: Array<{ label: string; onClick: () => void }>;
  navigation: Array<{ label: string; to: string }>;
  handleLogoClicked: () => void;
}

export function RedishHeader({
  actions,
  navigation,
  handleLogoClicked,
}: RedishHeaderProps) {
  return (
    <div className={styles.container}>
      <button
      className={styles.logo}
        onClick={(event) => {
          event.preventDefault();
          handleLogoClicked();
        }}
      >
        <img src="assets/icons/redish-24-white.svg" alt="logo" />
        <h1>redish</h1>
      </button>
      <div className={styles.actions}>
        {actions.map((action) => (
          <RedishButton key={action.label} onClick={action.onClick}>
            {action.label}
          </RedishButton>
        ))}
      </div>
      {navigation.length > 0 && (
        <ul>
          {navigation.map((nav) => (
            <li key={nav.label}>
              <RedishLink to={nav.to}>{nav.label}</RedishLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RedishHeader;
