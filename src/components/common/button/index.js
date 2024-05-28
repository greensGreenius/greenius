import './button.scss';

export const NormalButton = (props) => {
  const {
    label = '',
    className = 'btn-primary',
    isLoader = false,
    disabled
  } = props;

  return (
    <button
      {...props}
      type="button"
      disabled={isLoader || disabled}
      className={`btn  ${className}`}
    >
      {isLoader && (
        <span
          className="spinner-border spinner-border-sm me-1"
          role="status"
          aria-hidden="true"
        />
      )}
      {label}
    </button>
  );
};
