import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Flex, Box, Text, Button } from 'rebass';
import Input from './StyledInput';
import { submitUserForm } from '../../actions/UserActions';

const renderField = ({ input, label, type }) => (
  <Box>
    <Input {...input} placeholder="name" type={type} />
  </Box>
);

const NameForm = (props) => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form className="wrapper" onSubmit={handleSubmit(submitUserForm)}>
      <Flex
        flexDirection={['column', 'row', 'row']}
      >
        <Field
          name="username"
          type="text"
          component={renderField}
        />
        {error && <strong>{error}</strong>}
        <Box>
          <Button type="submit" disabled={submitting}>
            Enter
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default reduxForm({
  form: 'username',
})(NameForm);
