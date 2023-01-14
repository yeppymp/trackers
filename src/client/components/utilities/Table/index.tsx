import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IconContext } from 'react-icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Input, InputSize, InputType } from '../Input';

export enum ETableType {
  COMPLETE = 'complete',
  BASIC = 'basic',
}

interface ITable {
  type: ETableType;
  page?: number;
  perPage?: number;
  total?: number;
  onSearch?: (keyword: string) => void;
  resetSearch?: () => void;
  onPaginatePrev?: () => void;
  onPaginateNext?: () => void;
}

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  padding: 2rem 4rem;
`;

const TableElement = styled.table`
  margin-top: 1rem;
  width: 100%;

  tr th,
  tr td {
    color: white;
    text-align: center;
  }

  thead {
    border-bottom: 2px solid rgba(255, 255, 255, 0.25);

    tr th {
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: bold;
      font-size: 0.875rem;
      color: #bec8d1;

      svg {
        display: inline-flex;
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      cursor: pointer;

      td {
        padding: 8px;

        &.action > button {
          transition: all 0.5s;

          &:hover {
            transform: translateX(6px);
          }
        }
      }
    }
  }
`;

const Table: React.FC<ITable> = (props) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (!props.onSearch) return;

    if (!searchKeyword && props.resetSearch) props.resetSearch();

    props.onSearch(searchKeyword);
  }, [searchKeyword]);

  return (
    <Wrapper>
      {props.type === ETableType.COMPLETE && (
        <div className="flex justify-between items-center">
          <Input
            customWidth="w-72"
            type={InputType.TEXT}
            size={InputSize.SMALL}
            placeholder={'Search by Device ID / Type'}
            register={{
              value: searchKeyword,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchKeyword(e.target.value),
            }}
          />

          <div className="flex">
            <p className="text-tertiary text-sm mr-4">
              {props.perPage} data from {props.page} of {props.total} pages
            </p>

            <IconContext.Provider value={{ color: 'white' }}>
              <button className="mr-4" onClick={props.onPaginatePrev}>
                <FaChevronLeft />
              </button>
              <button onClick={props.onPaginateNext}>
                <FaChevronRight />
              </button>
            </IconContext.Provider>
          </div>
        </div>
      )}
      <TableElement>{props.children}</TableElement>
    </Wrapper>
  );
};

export default Table;
