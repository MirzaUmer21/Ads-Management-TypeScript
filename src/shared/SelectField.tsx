import { memo } from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';

const SelectField = ({
  col = 12,
  disabled = false,
  fieldName,
  fieldSelect = false,
  fields,
  isMulti = false,
  label,
  onChange,
  onInputChange,
  placeholder,
  value,
  isCustomDisable = false
}: SelectFieldProps) => {
  const changeHandle = (option: Field) => onChange?.(option.value, option);
  if (!fields.length) return null;

  return (
    <Col md={col} sm={col} xs={12} className='mb-3 '>
      <div
        className={'form-group objectiveCustomSelect'}
        id={fieldSelect ? 'react-select-field' : 'react-select'}
      >
        {label && (
          <label className='mb-1 customLabel objectiveSelectLabel'>
            <strong>{label}</strong>
          </label>
        )}
        <Select
          className={
            isCustomDisable ? 'app-select h-38 color-white' : 'app-select h-38'
          }
          // eslint-disable-next-line eqeqeq
          defaultValue={fields.filter(el => el.value == value)}
          isDisabled={disabled}
          onChange={option => option && changeHandle(option)}
          onInputChange={onInputChange}
          options={fields}
          isSearchable={true}
          placeholder={placeholder ?? label}
          formatOptionLabel={country => {
            // console.log(country);
            return (
              <div className='option'>
                {fields.filter(el => el.image).length ? (
                  <img
                    className='optionImg'
                    src={fields.filter(el => el.image)[0].image}
                    alt='ads'
                  />
                ) : null}
                <span>{country.label}</span>
              </div>
            );
          }}
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? '#fafafa' : 'white',
              // backgroundColor: '#fffff',
              borderRadius: '0.75rem !important',
              color: state.isSelected ? '#444' : '#444',
              height: 'fit-content',
              border: '1px solid #fafafa'
            })
          }}
        />
      </div>
    </Col>
  );
};

export default memo(SelectField);

type Field = { label: string | number; value: string | number; image?: string };
interface SelectFieldProps {
  fieldSelect?: boolean;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  disabled?: boolean;
  fieldName: string;
  fields: Array<Field>;
  isMulti?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: (
    option: string | number,
    optionObject: Record<string, string | number>
  ) => void;
  onInputChange?: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  isCustomDisable?: boolean;
}
