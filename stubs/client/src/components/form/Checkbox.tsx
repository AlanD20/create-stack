import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  parentClass?: string;
  labelClass?: string;
  className?: string;
}

const Checkbox = ({
  name,
  label,
  children,
  parentClass = '',
  labelClass = '',
  className = '',
  ...attr
}: Props) => {
  return (
    <>
      <label
        className={`label cursor-pointer flex w-max gap-4 items-center ${parentClass}`}
      >
        <input
          {...attr}
          type="checkbox"
          name={name}
          className={`checkbox checkbox-primary ${className}`}
        />

        <span className={`label-text ${labelClass}`}>
          {label ? label : children}
        </span>
      </label>
    </>
  );
};
export default Checkbox;
