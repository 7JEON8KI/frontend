import styled from "styled-components";

export const StyledFooter = styled.footer`
  display: flex;
  background-color: #f7f7f7;
  gap: 0 3.75rem;
  margin: 0 auto 60px;
  max-width: 2000px;
  min-width: 320px;
  width: 80%;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0 10%;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #d9d9d9;
    margin-top: 5rem;
  }
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding: 2rem 0;

  .title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
  }

  @media only screen and (min-width: 530x) {
    padding: 1rem;
    .title {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;
