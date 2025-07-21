import styled from 'styled-components';
export const TimelineContainer = styled.div `
  overflow-x: auto;
  overflow-y: hidden;
  padding-left: 50%;
  padding-right: 50%;
  width: 100%;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    height: 0px !important;
    width: 1px !important;
  }

  &:hover::-webkit-scrollbar {
    display: block;
  }
`;
