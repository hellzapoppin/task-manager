import PropTypes from 'prop-types';
import { useState } from 'react';

import { AddIcon, TrashIcon } from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';

function Header({ subtitle, title }) {
  const [AddTaskDialogisOpen, setAddTaskDialogisOpen] = useState(false);
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button color="ghost">
          Limpar tarefa
          <TrashIcon />
        </Button>
        <Button onClick={() => setAddTaskDialogisOpen(true)}>
          Adicionar tarefa
          <AddIcon />
        </Button>
        <AddTaskDialog
          isOpen={AddTaskDialogisOpen}
          handleClose={() => setAddTaskDialogisOpen(false)}
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Header;
