import { Fragment, useState } from 'react';
import RedishButton from '../redish-button/redish-button';
import RedishLink from '../redish-link/redish-link';
import styles from './redish-header.module.scss';
import cn from 'classnames';

export interface RedishHeaderProps {
  actions: Array<{ labelSmall?: string; label: string; onClick: () => void }>;
  navigation: Array<{ label: string; to: string }>;
  handleLogoClicked: () => void;
}

export function RedishHeader({
  actions,
  navigation,
  handleLogoClicked,
}: Readonly<RedishHeaderProps>) {
  const [showMenu, setShowMenu] = useState(false);

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
      <button
        className={styles.burgerMenu}
        onClick={(event) => {
          event.preventDefault();
          setShowMenu(!showMenu);
        }}
      >
        <img src="assets/icons/menu-icon.svg" alt="menu" />
      </button>
      <div className={cn(styles.content, showMenu && styles.showMenu)}>
        <div className={styles.actions}>
          {actions.map((action) => (
            <Fragment key={action.label}>
              <RedishButton
                className={styles.medium}
                onClick={() => {
                  action.onClick();
                  setShowMenu(false);
                }}
              >
                {action.label}
              </RedishButton>
              <RedishButton
                className={styles.small}
                onClick={() => {
                  action.onClick();
                  setShowMenu(false);
                }}
              >
                {action.labelSmall ?? action.label}
              </RedishButton>
            </Fragment>
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
    </div>
  );
}

export default RedishHeader;
