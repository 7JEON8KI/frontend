/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Layout } from "components/mealkeat";
import Tray from "assets/images/tray.png";
import EmptyTray from "assets/images/empty_tray.png";
import styled, { css } from "styled-components";
import { wantIngredients, wontIngredients } from "constants/ingredientsConstants";
import scrollToTop from "utils/scrollToTop";
import { useNavigate } from "react-router-dom";

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
  align-items: center;
  gap: 3rem;
  justify-content: center;
`;

export const IngredientsPanel = styled.div`
  width: 720px;
  height: 1420px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PanelTitle = styled.p`
  font-size: 50px;
  margin: 2rem auto;
  font-weight: bold;
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
        `};
`;

export const IngredientImage = styled.img`
  width: 170px;
  height: 100px;
  border-radius: 50px;
`;

export const IngredientName = styled.span`
  font-weight: bold;
`;

export const TrayContainer = styled.div`
  width: 700px;
  height: 375px;
  position: relative;
`;

export const EmptyTrayImage = styled.img`
  width: 680px;
  height: 260px;
  position: absolute;
  top: 145px;
`;

interface TrayProps {
  $disable: boolean;
}
export const TrayImage = styled.img<TrayProps>`
  width: 665px;
  height: 375px;
  position: absolute;
  left: 5px;
  transition: 0.5s;
  transform-origin: right bottom;
  &:hover {
    transform: rotate(5deg);
  }
  display: ${({ $disable }) => ($disable ? "block" : "none")};
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
          <PanelTitle>재료 메뉴판</PanelTitle>
          <p style={{ fontSize: "50px" }}>
            I <span style={{ fontWeight: "bold", color: "#FD6F21" }}>want</span> it
          </p>
          <p style={{ color: "#595959", margin: "1rem auto" }}>이곳에서 먹고싶은 재료를 클릭해주세요</p>
          <IngredientsGrid>
            {want?.map((el, index) => (
              <IngredientButton
                key={index}
                $selected={el.selected}
                onClick={() => {
                  const newWant = [...want];
                  newWant[index].selected = !newWant[index].selected;
                  setWant(newWant);
                }}
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
                onClick={() => {
                  const newWont = [...wont];
                  newWont[index].selected = !newWont[index].selected;
                  setWont(newWont);
                }}
              >
                <IngredientImage src={el.src} draggable={false} />
                <IngredientName>{el.name}</IngredientName>
              </IngredientButton>
            ))}
          </IngredientsGrid>
        </IngredientsPanel>
        <TrayContainer
          onClick={() => {
            scrollToTop({});
            navigate("/recommend/result");
          }}
        >
          <EmptyTrayImage src={EmptyTray} />
          <TrayImage src={Tray} $disable={selectAny} />
        </TrayContainer>
      </FlexContainer>
    </Layout>
  );
};

export default PageMealkeat;
