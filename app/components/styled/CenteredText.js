import React from 'react';
import { Text } from 'rebass';

const CenteredText = (props) => {
  return (
    <Text
      {...props}
      color="white"
      textAlign="center"
      fontFamily="Rubik, sans-serif"
    />
  );
};
export default CenteredText;
