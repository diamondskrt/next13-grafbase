import { ChangeEvent, FC } from 'react';
import Typography from './Typography';
import classNames from 'classnames';

interface FileInputProps {
  file?: File;
  label?: string;
  accept?: string;
  description?: string;
  required?: boolean;
  errorMessage?: string | null;
  onChange: (file?: File) => void;
}

const FileInput: FC<FileInputProps> = ({
  file,
  label,
  accept,
  description,
  required,
  errorMessage,
  onChange
}) => {
  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.files?.[0]);
  };

  return (
    <div className={classNames('file-input', { required })}>
      <label className="flex flex-col items-start">
        {label || required ? (
          <span className="label mb-1">{label ?? 'Required'}</span>
        ) : null}
        <input type="file" accept={accept} onChange={onChangeHandler} />
        <div className="flex items-center gap-4">
          <div className="btn btn-primary">Choose file</div>
          {file ? <Typography variant="caption">{file.name}</Typography> : null}
        </div>
        {description ? (
          <Typography variant="caption" className="default--text mt-1">
            {description}
          </Typography>
        ) : null}
      </label>

      {errorMessage ? (
        <Typography variant="caption" className="error--text mt-1">
          {errorMessage}
        </Typography>
      ) : null}
    </div>
  );
};

export default FileInput;
