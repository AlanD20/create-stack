import { FormHTMLAttributes } from 'react';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: React.ChangeEventHandler<HTMLFormElement>;
  children: React.ReactNode | JSX.Element;
  className?: string;
}

const FormControl = ({
  onSubmit,
  children,
  className = '',
  ...attr
}: Props) => (
  <form
    {...attr}
    onSubmit={onSubmit}
    className={`form-control w-[40ch] ${className}`}
  >
    {children}
  </form>
);

export default FormControl;
