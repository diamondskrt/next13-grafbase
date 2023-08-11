import { ChangeEvent, FC } from 'react';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/solid';
import Typography from './Typography';
import classNames from 'classnames';

interface FileInputProps {
  fileUrl?: string;
  label?: string;
  accept?: string;
  description?: string;
  required?: boolean;
  errorMessage?: string | null;
  onChange: (file: string | ArrayBuffer) => void;
}

const FileInput: FC<FileInputProps> = ({
  fileUrl,
  label,
  accept,
  description,
  required,
  errorMessage,
  onChange
}) => {
  const convertBase64Image = (image: File | undefined) => {
    if (!image) return;

    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = ({ target }: ProgressEvent<FileReader>) => {
      if (!target?.result) return;

      onChange(target.result);
    };
  };

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    convertBase64Image(target.files?.[0]);
  };

  return (
    <div className={classNames('file-input', { required })}>
      {fileUrl ? (
        <div className="relative aspect-square rounded-xl overflow-hidden w-[250px]">
          <Image
            src={fileUrl as string}
            fill
            blurDataURL={fileUrl as string}
            alt="project image"
          />
          <div className="absolute inset-0 hover:bg-black/20 flexCenter group transition-all text-white p-3">
            <div
              className="icon w-6 h-6 opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={() => onChange(null)}
            >
              <TrashIcon />
            </div>
          </div>
        </div>
      ) : (
        <>
          <label className="flex flex-col items-start">
            {label || required ? (
              <span className="label mb-1">{label ?? 'Required'}</span>
            ) : null}
            <input type="file" accept={accept} onChange={onChangeHandler} />
            <div className="flex items-center gap-4">
              <div className="btn btn-primary">Choose file</div>
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
        </>
      )}
    </div>
  );
};

export default FileInput;
