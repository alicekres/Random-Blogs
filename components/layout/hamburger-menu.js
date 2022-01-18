import { GiHamburgerMenu } from 'react-icons/gi';
import { IconContext } from 'react-icons';

function HamburgerMenu() {
  return (
    <IconContext.Provider
      value={{ color: 'var(--color-grey-50)', size: '22px' }}
    >
      <GiHamburgerMenu />
    </IconContext.Provider>
  );
}

export default HamburgerMenu;
