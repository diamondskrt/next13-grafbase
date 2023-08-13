import { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import Typography from './Typography';
import Icon from './Icon';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  register?: any;
  onInputClick?: () => void;
  prependIcon?: string;
  onPrependIconClick?: () => void;
  appendIcon?: string;
  onAppendIconClick?: () => void;
}

const TextField: FC<TextFieldProps> = (props) => {
  const {
    defaultValue,
    label,
    type = 'text',
    required,
    errorMessage,
    register,
    onInputClick,
    prependIcon,
    onPrependIconClick,
    appendIcon,
    onAppendIconClick,
    ...otherProps
  } = props;

  return (
    <label className={classNames('text-field block', { required })}>
      <>
        {label || required ? (
          <span className="label">{label ?? 'Required'}</span>
        ) : null}
        <div className="relative">
          {prependIcon ? (
            <div className="prepend-icon" onClick={onPrependIconClick}>
              <Icon name={prependIcon} size={20} />
            </div>
          ) : null}
          <input
            defaultValue={defaultValue}
            {...register}
            {...otherProps}
            type={type}
            className={classNames('text-field', {
              error: errorMessage
            })}
            onClick={onInputClick}
          />
          {appendIcon ? (
            <div className="append-icon" onClick={onAppendIconClick}>
              <Icon name={appendIcon} size={20} />
            </div>
          ) : null}
        </div>

        {errorMessage ? (
          <Typography variant="caption" className="error--text mt-1">
            {errorMessage}
          </Typography>
        ) : null}
      </>
    </label>
  );
};

export default TextField;
