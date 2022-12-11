import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  type?: 'submit' | 'button' | 'reset';
  className?: string;
}

const Button = ({ label, className = '', ...attr }: Props) => (
  <button {...attr} className={`btn capitalize flex items-center ${className}`}>
    {label ? <span>{label}</span> : attr.children}
  </button>
);

export default Button;
