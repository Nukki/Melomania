import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Flex, Box, Text, Button } from 'rebass';
import Input from '../styled/StyledInput';
import ButtonOutline from '../styled/ButtonOutline';
import { submitUserForm } from '../../actions/UserActions';

const renderField = ({ input, label, type }) => (
  <Box mr={[0, 2, 3]}>
    <Input {...input} placeholder="name" type={type} />
  </Box>
);

const NameForm = (props) => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form className="wrapper" onSubmit={handleSubmit(submitUserForm)}>
      <Flex
        flexDirection={['column', 'row', 'row']}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Field
          name="username"
          type="text"
          component={renderField}
        />
        {error && <strong>{error}</strong>}
        <Box>
          <ButtonOutline
            width={['15em', '7em', '7em']}
            type="submit"
            disabled={submitting}
          >
            Enter
          </ButtonOutline>
        </Box>
      </Flex>
    </form>
  );
};

export default reduxForm({
  form: 'username',
})(NameForm);
