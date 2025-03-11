import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeft,
  ChevronRight,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState([]);
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();
  const handleBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });

      const data = await response.json();
      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  const handleSaveClick = async () => {
    setSaveIsLoading(true);
    const title = titleRef.current.value;
    const time = timeRef.current.value;
    const description = descriptionRef.current.value;
    const newErrors = [];
    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório',
      });
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório',
      });
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória',
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    });
    if (!response.ok) {
      toast.error('Ocorreu um erro ao salva a tarefa');
      return setSaveIsLoading(false);
    }
    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
    toast.success('Tarefa salva com sucesso!');
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error('Erro ao deletar tarefa');
    }

    toast.success('Tarefa deletada com sucesso');
    navigate(-1);
  };

  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeft />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRight className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            disabled={saveIsLoading}
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Nome"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            ></Input>
          </div>
          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            ></Input>
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button size="large" onClick={handleSaveClick}>
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
