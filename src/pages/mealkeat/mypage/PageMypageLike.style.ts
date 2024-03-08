// PageMypageLike.styles.tsx
import styled from "styled-components";
import checktPath from "assets/images/icons/except.png";
import checkClickPath from "assets/images/icons/except_click.png";

export const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 25px auto;
  width: 90%;
`;
export const StyledSection = styled.section`
  width: "90%";
  margin: "auto";
`;

export const StyledFlexRow = styled.div`
  height: "55px";
  display: "flex";
  gap: "1rem";
  padding: "1.5rem 1rem";
  font-size: "20px";
  align-items: "center";
`;

export const StyledButton = styled.button<{ selected?: boolean }>`
  width: "24px";
  height: "24px";
  background-image: url(${props => (props.selected ? checkClickPath : checktPath)});
  background-size: "cover";
`;

export const StyledActionButton = styled.button`
  width: "100px";
  height: "30px";
  padding: "0.5rem 1rem";
  font-size: "1rem";
  border: "1px solid #d0d0d0";
  color: "#fd6f21";
`;

export const StyledProductContainer = styled.div`
  height: "210px";
  display: "flex";
  gap: "1rem";
  padding: "1.5rem 1rem";
  bordertop: "1px solid #d0d0d0";
  justifycontent: "space-between";
`;

export const StyledProductInfo = styled.div`
  width: "550px";
  font-size: "20px";
  fontweight: "bold";
  display: "flex";
  flexdirection: "column";
  justifycontent: "space-evenly";
`;

export const StyledImage = styled.img.attrs({ draggable: false })`
  width: "150px";
  height: "150px";
`;

export const StyledEmptyMessage = styled.div`
  height: "210px";
  padding: "1.5rem 1rem";
  bordertop: "1px solid #d0d0d0";
  font-size: "1.5rem";
  font-family: "bold";
  display: "flex";
  justifycontent: "center";
  alignitems: "center";
`;
