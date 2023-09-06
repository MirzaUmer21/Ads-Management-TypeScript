import { Col } from 'react-bootstrap';
import { memo } from 'react';

const InputField = ({
  autoFocus = false,
  bottomInfo,
  col = 12,
  disabled = false,
  isMutual = false,
  label,
  name,
  placeholder,
  required = false,
  topInfo,
  type = 'text',
  className,
  value
}: InputFieldProps) => {
  return (
    <Col lg={col} md={col} sm={col} xs={12} className='mb-3'>
      <div className='form-group'>
        <label className='mb-1 customLabel '>
          <strong>
            {label}
            {required && <span className='ml-1 text-danger'>*</span>}
          </strong>
        </label>
        {topInfo && (
          <div className='small-info mb-2 mt-1 text-muted'>{topInfo}</div>
        )}
        <input
          autoFocus={autoFocus}
          className={
            className
              ? `${className} form-control customInput`
              : 'form-control customInput'
          }
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          type={type}
          defaultValue={value}
        />
        {bottomInfo && (
          <div className='small-info mb-2 mt-1 text-muted'>{bottomInfo}</div>
        )}
      </div>
    </Col>
  );
};

export default memo(InputField);

interface InputFieldProps {
  autoFocus?: boolean;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  disabled?: boolean;
  label: string | JSX.Element;
  name: string;
  placeholder?: string;
  required?: boolean;
  topInfo?: string;
  type?: string;
  bottomInfo?: string | JSX.Element;
  isMutual?: boolean;
  className?: string;
  value?: string;
}
