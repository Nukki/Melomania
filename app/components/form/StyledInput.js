import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  color: ${props => props.inputColor || 'palevioletred'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 20vw;
`;

export default Input;
