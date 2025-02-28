import { useEffect } from 'react';

function Header(props) {
  // componentDidUnmount
  useEffect(() => {
    return () => {
      console.log('Unmounting');
    };
  }, []);
  return <header className="header">{props.children}</header>;
}

export default Header;
