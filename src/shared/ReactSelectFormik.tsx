import { ErrorMessage, useField } from 'formik';
import { memo, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';

const ReactSelectFormik = ({
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
  isCustomDisable = false,
  isformik,
  stateChange,
  stateCampaignChange,
  hasError,
  stateGlobalChange
}: SelectFieldProps) => {
  const [field, meta, helpers] = useField(fieldName);

  useEffect(() => {
    helpers.setValue(value);
  }, []);

  let val: any = value ? value : null;
  if (fields.length) {
    val =
      fields.find(
        option => option.value === field.value || option.value === value
      ) || null;
  }
  const changeHandle = (option: Field) => {
    onChange?.(option);
    stateChange?.('service_titan_client_id', option.id);
    stateCampaignChange?.('campaign_id', option.id);

    helpers.setValue(option.value);
  };
  return (
    <Col md={col} sm={col} xs={12} className='mb-3 '>
      <div
        className={
          'form-group objectiveCustomSelect objectiveCustomSelectFormik'
        }
        id={fieldSelect ? 'react-select-field' : 'react-select'}
      >
        {label && (
          <label className='mb-1 customLabel objectiveSelectLabel d-flex justify-content-between'>
            <strong>{label}</strong>
            <span>{hasError}</span>
          </label>
        )}
        {!label && <span className='errorFieldWithoutLabel'>{hasError}</span>}
        <Select
          className={
            isCustomDisable ? 'app-select h-38 color-white' : 'app-select h-38'
          }
          // eslint-disable-next-line eqeqeq
          defaultValue={val}
          isDisabled={disabled}
          onChange={option => option && changeHandle(option)}
          onBlur={() => helpers.setTouched(true)}
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

export default memo(ReactSelectFormik);

type Field = {
  label: string | number;
  value: string | number;
  image?: string;
  id?: string | number;
};
interface SelectFieldProps {
  fieldSelect?: boolean;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  disabled?: boolean;
  fieldName: string;
  fields: Array<Field>;
  isMulti?: boolean;
  label?: string;
  placeholder?: string;
  onChange?: any;
  onInputChange?: (value?: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  isCustomDisable?: boolean;
  isformik?: boolean;
  stateChange?: any;
  stateCampaignChange?: any;
  hasError?: any;
  stateGlobalChange?: any;
}
