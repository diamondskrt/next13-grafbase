import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
  label?: string;
  required?: boolean;
  register?: any;
}

const TextField: FC<TextFieldProps> = (props) => {
  const {
    defaultValue,
    label,
    type = 'text',
    required,
    register,
    ...otherProps
  } = props;

  return (
    <label className={classNames('block', { required })}>
      <>
        {label || required ? (
          <span className="label">{label ?? 'Required'}</span>
        ) : null}
        <input
          defaultValue={defaultValue}
          {...register}
          {...otherProps}
          type={type}
          className="w-full border-b border-zinc-400 focus:border-indigo-600 outline-0 transition-all py-1"
        />
      </>
    </label>
  );
};

export default TextField;
