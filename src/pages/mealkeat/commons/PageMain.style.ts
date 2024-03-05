import styled from "styled-components";

export const MainDiv = styled.main`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.tooBig};
  font-weight: bold;
  padding: 3rem 1rem;
  margin-top: 1.8rem;
  margin-bottom: 0.9rem;
  width: 90%;
  max-width: 2000px;
  margin: auto;
  ${({ theme }) => theme.media.sm`
    font-size: ${theme.fontSize.xl};
  `};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 50px 0;

  ${({ theme }) => theme.media.xl`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${({ theme }) => theme.media.sm`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const TopSlider = styled.div`
  width: 80%;
  height: 30%;
  margin: 50px auto;

  .sliderItem {
    img {
      padding: 0 10px;
  }
`;

export const UserRecommendSlider = styled.div`
  width: 80%;
  max-width: 1600px;
  height: 500px;
  margin: 0px auto;
`;

export const SlideImage = styled.img.attrs({ draggable: false })`
  width: 390px;
  height: 250px;
  display: block;
  margin: 15px auto 0;
  box-shadow:
    rgba(0, 0, 0, 0.15) -5px -2px 12px,
    rgba(0, 0, 0, 0.15) 5px -2px 12px;

  ${({ theme }) => theme.media.sm`
    width: 320px;
    height: 200px;
  `}
`;

export const MoreProductsButton = styled.button.attrs({ type: "button" })`
  width: 245px;
  height: 48px;
  border: solid 1px #fd6f21;
  padding: 12px 50px;
  margin: 34px auto;
  display: block;
  color: #fd6f21;
  font-weight: bold;
  background-color: transparent; // 배경색을 명시적으로 설정하지 않았으므로, 필요에 따라 추가
  cursor: pointer; // 버튼에 마우스 오버 시 커서 변경 추가
`;

export const SlideInfoBox = styled.div`
  width: 390px;
  height: 120px;
  margin: 0 auto 15px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
  ${({ theme }) => theme.media.sm`
    width: 320px;
    height: 70px;
  `}
`;

export const SlideContent = styled.div`
  width: 90%;
  height: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductName = styled.p`
  font-weight: bold;
  width: 100%;
`;

export const ProductPrice = styled.p`
  color: #898989;
  font-size: 14px;
  width: 100%;
`;
