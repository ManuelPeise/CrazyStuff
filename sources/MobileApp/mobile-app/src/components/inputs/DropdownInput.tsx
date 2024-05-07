import React from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export type DropdownItem = {
  label: string;
  value: number;
};

interface IProps {
  selectedValue: number;
  items: DropdownItem[];
  placeholder: string;
  handleChange: (value: number | undefined) => void;
}

const DropdownInput: React.FC<IProps> = props => {
  const {selectedValue, items, placeholder, handleChange} = props;
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <DropDownPicker
      style={styles.dropdown}
      open={open}
      setOpen={setOpen}
      value={selectedValue}
      placeholder={placeholder}
      items={items}
      multiple={false}
      setValue={() => {}}
      onSelectItem={item => handleChange(item.value)}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    zIndex: 1000,
  },
});
export default DropdownInput;
