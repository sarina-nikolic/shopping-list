import styled from "styled-components";

export default function ShoppingItem({ name }) {
  return (
    <>
      <StyledList>{name}</StyledList>
    </>
  );
}

const StyledList = styled.li`
  list-style: none;
  margin: 0.5rem;
  padding: 1rem;
  border: 2px solid green;
  border-radius: 5px;
  background-color: lightgreen;
`;
