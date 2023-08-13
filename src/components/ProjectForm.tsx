'use client';

import { FC, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { categories } from '@/constants/common';
import { createProject, fetchToken, updateProject } from '@/graphql/api';
import { FormInputs, ProjectInterface, SessionUser } from '@/types/common';
import FileInput from './FileInput';
import TextField from './TextField';
import TextArea from './TextArea';
import Button from './Button';
import Select from './Select';

interface ProjectFormProps {
  project?: ProjectInterface;
}

const ProjectForm: FC<ProjectFormProps> = ({ project }) => {
  const session = useSession();

  const router = useRouter();

  const isEditMode = useMemo(() => Boolean(project), [project]);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      image: project?.image || '',
      title: project?.title || '',
      description: project?.description || '',
      siteUrl: project?.siteUrl || '',
      githubUrl: project?.githubUrl || '',
      category: project?.category || ''
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { token } = await fetchToken();

    try {
      setIsLoading(true);

      if (isEditMode) {
        await updateProject(data, token, project!.id);
      } else {
        const user = session.data?.user as SessionUser;
        await createProject(data, token, user.id);
      }

      /* Not working
        export const revalidate = 0;
      */
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
              fileUrl={field.value}
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
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
