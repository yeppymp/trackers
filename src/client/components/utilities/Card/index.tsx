import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface ICard {
  children: React.ReactNode;
  withShadow?: boolean;
  withBorder?: boolean;
  isVoucherCard?: boolean;
}

const CardContainer = styled.div`
  &.card-voucher {
    position: relative;
    margin-left: 8px;

    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 10px;
      top: 0;
      left: -10px;
      background: radial-gradient(
          circle at left center,
          transparent 10px,
          white 0
        )
        left center / 10px 30px;
    }
  }
`;

const Card = (props: ICard) => (
  <CardContainer
    className={classNames({
      'bg-white': true,
      'filter drop-shadow': props.withShadow,
      'border border-gray-500': props.withBorder,
      'rounded-md': !props.isVoucherCard,
      'card-voucher rounded-r-md': props.isVoucherCard,
    })}
  >
    {props.children}
  </CardContainer>
);

export default Card;
