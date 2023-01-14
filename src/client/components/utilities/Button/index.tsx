import React from 'react';
import styled from 'styled-components';

export enum ButtonColor {
  DEFAULT = 'btn-default',
  OUTLINE_PRIMARY = 'btn-outline-primary',
  PRIMARY = 'btn-primary',
  WHITE = 'white',
}

export enum ButtonSize {
  DEFAULT = 'default',
  LARGE = 'large',
}

export enum ButtonVariant {
  DEFAULT = 'default',
  ROUNDED = 'rounded',
}

interface IButtonElement {
  customClasses?: string;
  color?: ButtonColor;
  disabled?: boolean;
  iconOnly?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  withIcon?: boolean;
  withShadow?: boolean;
}

interface IButton extends IButtonElement {
  children: React.ReactNode;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const buttonElementClasses = (props: IButtonElement) => {
  const classList = ['font-bold', 'uppercase'];

  if (!props.disabled) {
    switch (props.color) {
      case ButtonColor.DEFAULT:
        classList.push('bg-default', 'text-default');
        break;
      case ButtonColor.OUTLINE_PRIMARY:
        classList.push(
          'border',
          'border-solid',
          'border-primary',
          'text-primary',
        );
        break;
      case ButtonColor.PRIMARY:
        classList.push('bg-primary', 'text-white');
        break;
      case ButtonColor.WHITE:
        classList.push('bg-white', 'text-secondary');
        break;
      default:
        classList.push('bg-primary', 'text-white');
        break;
    }
  }

  if (props.size === ButtonSize.LARGE) {
    classList.push('text-base', 'p-3');
  } else {
    classList.push('text-sm', 'px-3', 'py-1');
  }

  if (props.variant === ButtonVariant.ROUNDED) {
    classList.push('rounded-full');
  } else {
    classList.push('rounded-md');
  }

  if (props.withIcon) classList.push('flex', 'items-center', 'justify-center');

  if (props.withShadow) classList.push('filter drop-shadow');

  if (props.disabled) {
    classList.push('text-secondary');

    if (props.color !== ButtonColor.WHITE)
      classList.push('bg-gray', 'border-gray');
    if (props.iconOnly) classList.push('filter grayscale');
  }

  return classList.join(' ');
};

const ButtonElement = styled.button.attrs((props: IButtonElement) => ({
  className: buttonElementClasses(props).concat(` ${props.customClasses}`),
}))<IButtonElement>`
  > img {
    height: ${(props) => (props.size === ButtonSize.LARGE ? '24px' : 'auto')};
  }
`;

const Button = (props: IButton) => (
  <ButtonElement
    customClasses={props.customClasses || ''}
    color={props.color || ButtonColor.DEFAULT}
    disabled={props.disabled || false}
    onClick={props.onClick}
    iconOnly={props.iconOnly || false}
    size={props.size || ButtonSize.DEFAULT}
    variant={props.variant || ButtonVariant.DEFAULT}
    withIcon={props.withIcon || false}
    withShadow={props.withShadow || false}
  >
    {props.children}
  </ButtonElement>
);

export default Button;
