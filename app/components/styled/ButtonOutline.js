import React from 'react';
import { Button } from 'rebass';

const ButtonOutline = (props) => {
  return (
    <Button
      {...props}
      variant="outline"
      borderRadius={8}
      css={{
        border: '4px solid black',
        backgroundColor: 'white',
        color: 'black',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    />
  );
};
export default ButtonOutline;
