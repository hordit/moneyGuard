import { components } from 'react-select';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { StyledSelect } from '../Add.styled';

const DropdownIndicator = props => {
  if (props.isFocused) {
    return (
      <components.DropdownIndicator {...props}>
        <VscChevronUp />
      </components.DropdownIndicator>
    );
  }
  return (
    <components.DropdownIndicator {...props}>
      <VscChevronDown />
    </components.DropdownIndicator>
  );
};

export const CustomSelect = ({ onChange, options, value, className }) => {
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : '';
  };

  return (
    <div className={className}>
      <StyledSelect
        value={defaultValue(options, value)}
        placeholder="Select a category"
        components={{ DropdownIndicator }}
        onChange={value => onChange(value)}
        options={options}
        classNamePrefix="Select"
      />
    </div>
  );
};
