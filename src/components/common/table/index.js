export const NormalTable = (props) => {
  const {
    columnData = [],
    rowData = [],
    renderItem = Number,
    isLoader = false
  } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          {columnData?.map(({ lable = '' }) => (
            <th scope="col">{lable}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!isLoader && rowData?.map((item, i) => renderItem(item, i))}

        {isLoader && rowData?.length === 0 && (
          <tr>
            <td className="text-center" colSpan={columnData?.length}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </td>
          </tr>
        )}

        {!isLoader && rowData?.length === 0 && (
          <tr>
            <td className="text-center" colSpan={columnData?.length}>
              <h5 className="mb-0">No Data Found</h5>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
