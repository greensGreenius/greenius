import { NormalButton } from '../button';
import './breadcrumb.scss';

export const Normalbreadcrumb = (props) => {
  const {
    className = '',
    title = '',
    btnLabel = '',
    onBtnClick = () => {},
    count = 0,
    isCount = true
  } = props;

  return (
    <div className={`page-breadcrumb mb-4 ${className}`}>
      {btnLabel && (
        <NormalButton
          className="float-end btn btn-primary"
          onClick={onBtnClick}
          label={btnLabel}
        />
      )}

      <h2 className="mb-2 breadcrumb-title">{title}</h2>
      {isCount && <small className="sub-title">Count {count}</small>}
    </div>
  );
};
