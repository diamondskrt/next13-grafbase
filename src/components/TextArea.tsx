import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import Typography from './Typography';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  defaultValue?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  register?: any;
  rows?: number;
}

const TextArea: FC<TextAreaProps> = (props) => {
  const {
    defaultValue,
    label,
    rows = 3,
    required,
    errorMessage,
    register,
    ...otherProps
  } = props;

  return (
    <>
      <label className={classNames('block', { required })}>
        {label || required ? (
          <span className="label">{label ?? 'Required'}</span>
        ) : null}

        <textarea
          defaultValue={defaultValue}
          {...register}
          {...otherProps}
          rows={rows}
          className={classNames('textarea', { error: errorMessage })}
        />

        {errorMessage ? (
          <Typography variant="caption" className="error--text mt-1">
            {errorMessage}
          </Typography>
        ) : null}
      </label>
    </>
  );
};

export default TextArea;
