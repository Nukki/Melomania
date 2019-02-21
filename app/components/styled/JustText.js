import React from 'react';
import { Text } from 'rebass';

const JustText = (props) => {
  return (
    <Text
      {...props}
      color={props.color || 'white'}
      fontFamily="Rubik, sans-serif"
    />
  );
};
export default JustText;
