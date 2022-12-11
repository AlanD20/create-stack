import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'textarea' | 'file' | 'password' | 'email';
  name: string;
  label?: string;
  className?: string;
}

const Input = ({ type, name, label, className = '', ...attr }: Props) => {
  const input = getInputTag(type, name, attr, className);

  return (
    <div className="input-container mb-2 [&+.input-container]:mb-4">
      <label htmlFor={name} className="label capitalize">
        {label}
      </label>
      <div className="flex w-full gap-2">
        {input}
        {attr.required && <span className="text-red-500 text-xl mt-2">*</span>}
      </div>
    </div>
  );
};

function getInputTag(type: string, name: string, attr: any, className = '') {
  if (type === 'file') {
    return (
      <>
        <input
          {...attr}
          type={type}
          name={name}
          id={name}
          className={`w-full text-base focus:outline-none focus:border-gray-500 ${className}`}
        />
      </>
    );
  } else if (type === 'textarea') {
    return (
      <textarea
        name={name}
        className={`textarea textarea-bordered h-24 border-2 border-solid input-md w-full text-base focus:outline-none
          focus:border-gray-500 ${className}`}
        {...attr}
      ></textarea>
    );
  } else {
    return (
      <input
        {...attr}
        type={type}
        name={name}
        id={name}
        className={`input input-bordered border-2 border-solid input-md w-full text-base focus:outline-none
    focus:border-gray-500 ${className}`}
      />
    );
  }
}

export default Input;
