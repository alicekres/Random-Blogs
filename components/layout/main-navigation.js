import Link from 'next/link';
import classes from './main-navigation.module.css';
import Logo from './logo.js';
import { useState } from 'react';
import HamburgerMenu from './hamburger-menu';
import HamburgerCross from './hamburger-cross';

function MainNavigation() {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  const toggleHamburgerMenu = () => {
    setHamburgerMenu((prevStatus) => !prevStatus);
  };

  const closeHamburgerMenuHandler = () => {
    setHamburgerMenu((prevStatus) => !prevStatus);
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <button onClick={toggleHamburgerMenu} className={classes.hamburger}>
        {hamburgerMenu ? <HamburgerCross /> : <HamburgerMenu />}
      </button>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <Link href="/newpost">Add Post</Link>
          </li>
          <li className={classes.li}>
            <Link href="/posts">Posts</Link>
          </li>
          <li className={classes.li}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      {hamburgerMenu && (
        <nav className={classes.hamburgerItems}>
          <ul className={classes.hamburgerul}>
            <li
              className={classes.hamburgerli}
              onClick={closeHamburgerMenuHandler}
            >
              <Link href="/newpost">Add Post</Link>
            </li>
            <li
              className={classes.hamburgerli}
              onClick={closeHamburgerMenuHandler}
            >
              <Link href="/posts">Posts</Link>
            </li>
            <li
              className={classes.hamburgerli}
              onClick={closeHamburgerMenuHandler}
            >
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default MainNavigation;
