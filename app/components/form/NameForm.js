import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { submitUserForm } from '../../actions/UserActions';

const NameForm = (props) => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit(submitUserForm)}>
      <Field
        name="username"
        type="text"
        component="input"
        label="Username"
      />
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Enter
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'username',
})(NameForm);
