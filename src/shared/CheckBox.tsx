import { Form } from 'react-bootstrap';
import { memo } from 'react';

const CheckBox = ({
  field,
  onChange,
  defaultChecked,
  isLabel = false,
  customClass
}: CheckBoxProps) => {
  return (
    <Form.Check
      type='checkbox'
      defaultChecked={defaultChecked}
      onChange={e => onChange(field)}
      id={`${field.name}`}
      label={isLabel ? `${field.name}` : ''}
      className={customClass}
    />
  );
};

export default memo(CheckBox);

interface CheckBoxProps {
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  field: any;
  onChange: (field: segment) => void;
  defaultChecked: boolean;
  isLabel?: boolean;
  customClass?: string;
}
export interface segment {
  id: number;
  name: string;
  checked: boolean;
  description: string;
}
export interface assignCompaigns {
  key: number;
  selected: string;
  content: Array<compaignContentArray>;
}
interface compaignContentArray {
  key: number;
  heading: string;
  value: string;
}
