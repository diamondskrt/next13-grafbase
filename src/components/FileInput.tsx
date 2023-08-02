import { ChangeEvent, FC } from 'react';
import Typography from './Typography';

interface FileInputProps {
  file: File | null;
  onChange: (file?: File) => void;
  accept?: string;
  description?: string;
}

const FileInput: FC<FileInputProps> = ({
  file,
  accept,
  description,
  onChange
}) => {
  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.files?.[0]);
  };

  return (
    <div className="file-input">
      <label className="flex flex-col items-start">
        <input type="file" accept={accept} onChange={onChangeHandler} />
        <div className="flex items-center">
          <div className="btn btn-primary">Choose file</div>
          {file ? <Typography variant="caption">{file.name}</Typography> : null}
        </div>
        {description ? (
          <Typography variant="caption" className="default--text mt-1">
            {description}
          </Typography>
        ) : null}
      </label>
    </div>
  );
};

export default FileInput;
