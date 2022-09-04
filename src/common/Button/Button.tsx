import React from 'react';

import './Button.scss';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ onClick, children }) => (
  <button
    type="button"
    className="Button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
