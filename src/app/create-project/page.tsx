'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import FileInput from '@/components/FileInput';
import { useState } from 'react';

type Inputs = {
  email: string;
  description: string;
};

export default function CreateProject() {
  const { register, handleSubmit } = useForm<Inputs>();

  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (file?: File) => {
    if (!file) return;

    setFile(file);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <section>
        <Typography variant="h1">Create Project</Typography>

        <form
          className="grid w-1/3 gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileInput
            file={file}
            onChange={onFileChange}
            accept="image/*"
            description="Choose a poster for your project"
          />

          <TextField
            register={register('email')}
            label="Email"
            placeholder="Enter email"
            required
          />

          <TextArea
            register={register('description')}
            label="Description"
            placeholder="Write your description"
            required
          />

          <div className="actions">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </section>
    </>
  );
}
