'use client';

import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { categories } from '@/constants/common';
import { FormInputs, SessionUser } from '@/types/common';
import { createProject, fetchToken } from '@/graphql/api';
import FileInput from './FileInput';
import TextField from './TextField';
import TextArea from './TextArea';
import Button from './Button';
import Select from './Select';

interface CreateProjectFormProps {}

const CreateProjectForm: FC<CreateProjectFormProps> = () => {
  const session = useSession();

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { isLoading, errors }
  } = useForm<FormInputs>();

  const convertImage = (
    image: File,
    callbackFn: (base64Image: string | ArrayBuffer | null) => void
  ) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = () => {
      callbackFn(reader.result);
    };
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { image } = data;

    if (!image) {
      console.error('image loading error');
      return;
    }

    convertImage(image, async (base64Image: string | ArrayBuffer | null) => {
      if (!base64Image) {
        console.error('image loading error');
        return;
      }

      try {
        const formInputs = { ...data, image: base64Image };

        const { token } = await fetchToken();

        const user = session.data?.user as SessionUser;

        await createProject(formInputs, user.id, token);

        router.push('/');
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <form
      className="grid w-full md:w-1/2 2xl:w-1/3 gap-4 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="image"
        render={({ field }) => {
          return (
            <FileInput
              file={field.value}
              label="File"
              accept="image/*"
              description="Choose a poster for your project"
              required
              errorMessage={errors?.image?.message}
              onChange={field.onChange}
            />
          );
        }}
        control={control}
        rules={{ required: 'Poster is required' }}
      />

      <TextField
        register={register('title', {
          required: 'Title is required'
        })}
        errorMessage={errors?.title?.message}
        required
        label="Title"
        placeholder="Enter title"
      />

      <TextArea
        register={register('description', {
          required: 'Description is required',
          minLength: {
            value: 10,
            message: 'Description must be more than 10 characters'
          }
        })}
        errorMessage={errors?.description?.message}
        required
        label="Description"
        placeholder="Showcase and discover remarkable developer projects"
      />

      <TextField
        type="url"
        register={register('siteUrl', {
          required: 'Website Url is required'
        })}
        errorMessage={errors?.siteUrl?.message}
        required
        label="Website Url"
        placeholder="Enter website url"
      />

      <TextField
        type="url"
        register={register('githubUrl', {
          required: 'Github Url is required'
        })}
        errorMessage={errors?.githubUrl?.message}
        required
        label="Github Url"
        placeholder="Enter github url"
      />

      <Controller
        name="category"
        render={({ field }) => {
          return (
            <Select
              defaultValue={field.value}
              items={categories}
              itemTitle="name"
              itemValue="name"
              errorMessage={errors?.category?.message}
              required
              onChange={field.onChange}
            />
          );
        }}
        control={control}
        rules={{ required: 'Category is required' }}
      />

      <div className="actions">
        <Button leftIcon="plus" loading={isLoading} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
