import Select from 'react-select';
import type { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';

interface Props extends StateManagerProps {
  name: string;
  label?: string;
  required?: boolean;
}

const SelectDropDown = ({ name, label, required, ...attr }: Props) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="label capitalize">
        {label}
      </label>
      <div className="flex w-full gap-2">
        <Select
          {...attr}
          className="block mt-1 w-full"
          name={name}
          autoFocus
          closeMenuOnSelect
        />
        {required && <span className="text-red-500 text-xl mt-2">*</span>}
      </div>
    </div>
  );
};
export default SelectDropDown;
