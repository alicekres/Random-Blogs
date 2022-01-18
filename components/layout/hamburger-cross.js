import { ImCross } from 'react-icons/im';
import { IconContext } from 'react-icons';

function HamburgerCross() {
  return (
    <IconContext.Provider
      value={{ color: 'var(--color-grey-50)', size: '20px' }}
    >
      <ImCross />
    </IconContext.Provider>
  );
}

export default HamburgerCross;
