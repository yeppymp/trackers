import React from 'react';
import styled from 'styled-components';

import { InputColor, InputSize, InputType } from './input.type';

export interface IInput {
  customClasses?: string;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  customWidth?: string;
  type: InputType;
  register?: any;
  size?: InputSize;
  color?: InputColor;
}

const InputElement = styled.input.attrs((props: IInput) => {
  const classList = [
    'border',
    'border-tertiary',
    'text-base',
    'rounded-full',
    'p-4',
  ];

  if (props.customWidth) {
    classList.push(props.customWidth);
  } else {
    classList.push('w-full');
  }

  if (props.color === InputColor.GRAY || props.disabled) {
    classList.push('bg-default', 'focus:outline-none');
  } else {
    classList.push('bg-white', 'focus:border-primary', 'focus:outline-primary');
  }

  if (props.size === InputSize.SMALL) {
    classList.push('h-10');
  } else {
    classList.push('h-12');
  }

  let classes = classList.join(' ');

  if (props.customClasses) classes = classes.concat(` ${props.customClasses}`);

  return { className: classes };
})<IInput>``;

const Input = (props: IInput) => (
  <InputElement
    type={props.type}
    placeholder={props.placeholder}
    color={props.color || InputColor.DEFAULT}
    disabled={props.disabled || false}
    readOnly={props.readOnly || false}
    size={props.size || InputSize.DEFAULT}
    customWidth={props.customWidth || ''}
    customClasses={props.customClasses || ''}
    {...props.register}
  />
);

export default Input;
