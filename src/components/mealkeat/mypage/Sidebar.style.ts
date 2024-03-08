import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 200px;
  display: inline-flex;
  flex-direction: column;
  padding-left: 20px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  height: 100%;
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 25px 0;
`;

export const Section = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const SectionButton = styled.button`
  font-size: 20px;
  text-align: left;
  margin-top: 16px;
`;
