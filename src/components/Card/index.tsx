import React from 'react';
import './styles.scss';

interface Props {
  title: string
  description: string
}

function Card(props: Props) {
  const {title, description} = props
  
  return (
    <div className='card'>
      <div className='title'>{title}</div>
      <div className='descrition'>{description}</div>
    </div>
  );
}

export default Card;
