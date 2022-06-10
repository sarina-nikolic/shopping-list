import styled from "styled-components";

export default function Heading() {
  return <StyledHeading>My Shopping List</StyledHeading>;
}

const StyledHeading = styled.h1`
  margin: 1rem;
  padding: 1rem;
  color: teal;
`;
