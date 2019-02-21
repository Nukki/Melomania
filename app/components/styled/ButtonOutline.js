import React from 'react';
import { Button } from 'rebass';

const ButtonOutline = (props) => {
  return (
    <Button
      {...props}
      variant="outline"
      borderRadius={8}
      css={{
        border: '4px solid white',
        backgroundColor: 'darkslateblue',
        color: 'white',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        '&: hover': {
          backgroundColor: 'white',
          color: 'darkslateblue',
        },
      }}
    />
  );
};
export default ButtonOutline;
