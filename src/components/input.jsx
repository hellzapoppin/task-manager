import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-brand-border px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
};

export default Input;
