import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  defaultValue?: string;
  label?: string;
  required?: boolean;
  register?: any;
  rows?: number;
}

const TextArea: FC<TextAreaProps> = (props) => {
  const {
    defaultValue,
    label,
    rows = 3,
    required,
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
          className="w-full border-b border-zinc-400 focus:border-indigo-600 outline-0 transition-all py-1"
        />
      </label>
    </>
  );
};

export default TextArea;
