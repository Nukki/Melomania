import styled from 'styled-components';

const Input = styled.input`
  padding: 0.3em 1em;
  color: ${props => props.inputColor || 'darkslateblue'};
  background: lightsteelblue;
  border: none;
  border-radius: 3px;
  font-size: 18px;
  width: 14em;
  height: 7vh;
`;

export default Input;
