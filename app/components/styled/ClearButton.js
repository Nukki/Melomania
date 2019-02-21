import React from 'react';
import { Button } from 'rebass';

const ClearButton = (props) => {
  return (
    <Button
      {...props}
      bg="transparent"
      css={{
        '&: hover': {
          cursor: 'pointer',
        },
        '&: focus': {
          outline: '0',
        },
      }}
    />
  );
};
export default ClearButton;

// css={{
//   backgroundColor: 'transparent',
// }}
