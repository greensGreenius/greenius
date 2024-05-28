/* eslint-disable jsx-a11y/label-has-associated-control */
export const ForgotPasswordPage = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};
