import Button from './Button';
import AddIcon from '../assets/icons/add.svg?react';
import TrashIcon from '../assets/icons/trash.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';
import CloudSun from '../assets/icons/cloud-sun.svg?react';
import MoonIcon from '../assets/icons/moon.svg?react';

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>
          <Button>
            Adicionar tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="rounded-lg bg-white p-6">
        <div className="space-y-3">
          <div className="border-[#E4F4F5 flex gap-2 border-b border-solid pb-1">
            <SunIcon />
            <p className="text-sm text-[#9A9C9F]">Manhã</p>
          </div>
        </div>
        <div className="my-6 space-y-3">
          <div className="border-[#E4F4F5 flex gap-2 border-b border-solid pb-1">
            <CloudSun />
            <p className="text-sm text-[#9A9C9F]">Tarde</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="border-[#E4F4F5 flex gap-2 border-b border-solid pb-1">
            <MoonIcon />
            <p className="text-sm text-[#9A9C9F]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
