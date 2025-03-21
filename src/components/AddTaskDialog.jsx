import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'sonner';
import { v4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import { useAddTask } from '../hooks/data/use-add-task';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate: addTask } = useAddTask();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: '',
      description: '',
    },
  });

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    };

    addTask(task, {
      onSuccess: () => {
        handleClose();
        reset({
          title: '',
          time: '',
          description: '',
        });
        toast.success('Tarefa adicionada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao adicionar tarefa');
      },
    });
  };

  const handleCancelClick = () => {
    reset({
      title: '',
      time: '',
      description: '',
    });
    handleClose();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insera as informações abaixo
              </p>
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  {...register('title', {
                    required: 'O título é obrigatório',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio';
                      }
                      return true;
                    },
                  })}
                  label="Titulo"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                />
                <TimeSelect
                  {...register('time', { required: 'O período é obrigatório' })}
                  errorMessage={errors?.time?.message}
                  disabled={isSubmitting}
                />
                <Input
                  id="description"
                  {...register('description', {
                    required: 'A descrição é obrigatório',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia';
                      }
                      return true;
                    },
                  })}
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                />
                <div className="flex gap-3">
                  <Button
                    color="secondary"
                    className="w-full"
                    size="large"
                    onClick={handleCancelClick}
                    type="reset"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="w-full"
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propType = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
