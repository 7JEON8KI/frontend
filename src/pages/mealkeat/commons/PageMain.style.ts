import styled from "styled-components";

export const StyledMainDiv = styled.main`
  width: 100%;
  height: 100%;
`;

interface StyledTitleProps {
  $paddingLeft: number;
}

export const StyledTitle = styled.div<StyledTitleProps>`
  font-size: ${({ theme }) => theme.fontSize.tooBig};
  font-weight: bold;
  padding-left: ${({ $paddingLeft }) => $paddingLeft}px;
  margin-top: 1.8rem;
  margin-bottom: 0.9rem;
  ${({ theme }) => theme.media.sm`
    font-size: ${theme.fontSize.xl};
  `}
`;

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 50px 0;

  ${({ theme }) => theme.media.xl`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${({ theme }) => theme.media.lg`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${({ theme }) => theme.media.sm`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const StyledTopSlider = styled.div`
  width: 80%;
  height: 30%;
  margin: 50px auto;

  .sliderItem {
    img {
      padding: 0 10px;
  }
`;
