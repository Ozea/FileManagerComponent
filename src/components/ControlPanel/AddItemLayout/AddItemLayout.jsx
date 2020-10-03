import React from 'react';
import Container from '../Container/Container';

import './AddItemLayout.scss';

const AddItemLayout = props => {
  return (
    <div className="edit-item">
      <Container className="l-col w-14"></Container>
      {props.children}
    </div>
  );
}

export default AddItemLayout;