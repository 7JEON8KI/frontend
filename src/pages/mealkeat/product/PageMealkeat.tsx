/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Layout, Image } from "components/mealkeat";
import Tray from "assets/images/tray.png";
import EmptyTray from "assets/images/empty_tray.png";
import styled, { css } from "styled-components";
import { wantIngredients, wontIngredients } from "constants/ingredientsConstants";
import scrollToTop from "utils/scrollToTop";
import { useNavigate } from "react-router-dom";
import Pencil from "assets/images/icons/pencil.png";

export const CenteredDiv = styled.div`
  width: 600px;
  margin: 0 auto 5rem;
`;

export const VerticalCenterDiv = styled.div`
  vertical-align: center;
`;

export const HighlightedText = styled.span`
  color: #fd6f21;
  font-weight: bold;
  font-size: 60px;
`;

export const MainText = styled.p`
  width: auto;
  font-size: 60px;
  text-align: left;
  margin: auto;
  margin-top: 70px;
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  align-items: flex-start;
  gap: 3rem;
  justify-content: center;
`;

export const IngredientsPanel = styled.div`
  width: 720px;
  height: 1220px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f4f4;
`;

export const PanelTitle = styled.div`
  font-size: 50px;
  margin: 2rem auto;
  font-weight: bold;
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const IngredientsGrid = styled.div`
  display: grid;
  width: 600px;
  height: 430px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
`;

interface IngredientButtonProps {
  $selected: boolean;
  $color: string;
}
export const IngredientButton = styled.button<IngredientButtonProps>`
  ${({ $selected }) =>
    $selected
      ? css`
          & > img {
            filter: grayscale(0);
          }
        `
      : css`
          & > img {
            filter: grayscale(1);
          }
        `}

  overflow: hidden;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  align-items: center;

  & > span {
    color: ${({ $selected, $color }) => ($selected ? $color : "black")};
  }
`;

export const IngredientImage = styled.img.attrs({ draggable: false })`
  width: 170px;
  height: 100px;
  border-radius: 50px;

  -webkit-transition: 0.1s ease-in-out;
  transition: 0.1s ease-in-out;

  &:hover {
    opacity: 0.8;
    scale: 0.9;
  }
`;

export const IngredientName = styled.span`
  font-weight: bold;
`;

export const TrayContainer = styled.div`
  width: 700px;
  height: 375px;
  position: relative;
  top: 400px;
`;

export const EmptyTrayImage = styled.img.attrs({ draggable: false })`
  width: 680px;
  height: 260px;
  position: absolute;
  top: 145px;
`;

interface TrayProps {
  $disable: boolean;
}
export const TrayImage = styled.img.attrs({ draggable: false })<TrayProps>`
  width: 665px;
  height: 375px;
  position: absolute;
  left: 5px;
  transition: 0.5s;
  transform-origin: right bottom;
  &:hover {
    transform: rotate(10deg);
  }
  display: ${({ $disable }) => ($disable ? "block" : "none")};
`;

export const TrayTitle = styled.p<TrayProps>`
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.mainColor};
  position: absolute;
  top: ${({ $disable }) => ($disable ? "-100px" : "100px")};
  left: 80px;
`;

const PageMealkeat: React.FC = () => {
  const navigate = useNavigate();

  const [want, setWant] = React.useState(wantIngredients.map(el => ({ ...el, selected: false })));
  const [wont, setWont] = React.useState(wontIngredients.map(el => ({ ...el, selected: false })));
  const [selectAny, setSelectAny] = React.useState<boolean>(false);

  const checkSelectAny = () => {
    const wantAny = !want.every(el => !el.selected);
    const wontAny = !wont.every(el => !el.selected);
    return wantAny || wontAny;
  };

  const handleClickWant = (index: number) => {
    const newWant = [...want];
    newWant[index].selected = !newWant[index].selected;
    setWant(newWant);
  };

  // const checkSame = ():boolean => {
  //   const check =
  // };

  const handleClickWont = (index: number) => {
    const newWont = [...wont];
    newWont[index].selected = !newWont[index].selected;
    setWont(newWont);
  };

  const handleClickTray = () => {
    if (checkSelectAny()) {
      const searchRequest = {
        preferredIngredients: want?.filter(el => el.selected)?.map(el => el.value),
        unwantedIngredients: wont?.filter(el => el.selected)?.map(el => el.value),
      };
      scrollToTop({});
      navigate("/recommend/result", { state: { searchRequestDTO: { ...searchRequest } } });
    } else {
      window.alert("재료를 하나 이상 선택해주세요.");
    }
  };

  useEffect(() => {
    setSelectAny(checkSelectAny());
  }, [want, wont]);

  return (
    <Layout>
      <CenteredDiv>
        <VerticalCenterDiv>
          <MainText>
            맛있는<HighlightedText>선택</HighlightedText>, 나만의
            <HighlightedText>기준</HighlightedText>
          </MainText>
        </VerticalCenterDiv>
      </CenteredDiv>
      <FlexContainer>
        <IngredientsPanel>
          <PanelTitle>
            <Image alt="연필 아이콘" src={Pencil} width={40} height={40} />
            재료 메뉴판
          </PanelTitle>
          <p style={{ fontSize: "50px" }}>
            I <span style={{ fontWeight: "bold", color: "#FD6F21" }}>want</span> it
          </p>
          <p style={{ color: "#595959", margin: "1rem auto" }}>이곳에서 먹고싶은 재료를 클릭해주세요</p>
          <IngredientsGrid>
            {want?.map((el, index) => (
              <IngredientButton
                key={index}
                $selected={el.selected}
                $color="#FD6F21"
                onClick={() => handleClickWant(index)}
              >
                <IngredientImage src={el.src} draggable={false} />
                <IngredientName>{el.name}</IngredientName>
              </IngredientButton>
            ))}
          </IngredientsGrid>
          <p style={{ fontSize: "50px" }}>
            I <span style={{ fontWeight: "bold", color: "darkgreen" }}>{"won't"}</span> it
          </p>
          <p style={{ color: "#595959", margin: "1rem auto" }}>이곳에서 빼고싶은 재료를 클릭해주세요</p>
          <IngredientsGrid>
            {wont?.map((el, index) => (
              <IngredientButton
                key={index}
                $selected={el.selected}
                $color="#237C60"
                onClick={() => handleClickWont(index)}
              >
                <IngredientImage src={el.src} draggable={false} />
                <IngredientName>{el.name}</IngredientName>
              </IngredientButton>
            ))}
          </IngredientsGrid>
        </IngredientsPanel>
        <TrayContainer onClick={() => handleClickTray()}>
          <TrayTitle $disable={selectAny}>
            {selectAny ? "뚜껑을 열어 추천 확인해주세요!" : "원하는 재료를 넣고 클릭해주세요!"}
          </TrayTitle>
          <EmptyTrayImage src={EmptyTray} />
          <TrayImage src={Tray} $disable={selectAny} draggable={false} />
        </TrayContainer>
      </FlexContainer>
    </Layout>
  );
};

export default PageMealkeat;
