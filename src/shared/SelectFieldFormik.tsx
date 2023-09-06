import { Field } from 'formik';
import { memo } from 'react';
import { Col } from 'react-bootstrap';

const SelectFieldFormik = ({
  col = 12,
  fieldName,
  fieldSelect = false,
  fields,
  label
}: SelectFieldProps) => {
  if (!fields.length) return null;
  return (
    <Col md={col}>
      <div
        className={'form-group objectiveCustomSelect'}
        id={fieldSelect ? 'react-select-field' : 'react-select'}
      >
        {label && (
          <label className='mb-1 customLabel objectiveSelectLabel'>
            <strong>{label}</strong>
          </label>
        )}
        <Field as='select' className='app-select-formik h-38 ' name={fieldName}>
          {fields.map((val, index) => {
            return <option value={val.label}>{val.label} </option>;
          })}
        </Field>
      </div>
    </Col>
  );
};

export default memo(SelectFieldFormik);

type FieldData = { label: string; value: string; image?: string };
interface SelectFieldProps {
  fieldSelect?: boolean;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  fieldName: string;
  fields: Array<FieldData>;

  label?: string;
}
