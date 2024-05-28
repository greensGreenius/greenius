import { forwardRef } from 'react';
import './navLink.scss';
import { NavLink as NavLinkBase } from 'react-router-dom';

export const NavLink = forwardRef((props, ref) => (
  <NavLinkBase
    ref={ref}
    {...props}
    className={`nav-link  ${props.activeClassName}`}
  />
));
