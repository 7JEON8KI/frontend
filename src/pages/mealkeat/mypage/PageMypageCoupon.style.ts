import styled from "styled-components";

export const ContentContainer = styled.aside`
  width: 200px;
  display: inline-flex;
  flex-direction: column;
  width: 80%;
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 25px 0;
`;

export const Container = styled.div`
  display: flex;
  border: 1px solid #000000;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

export const InputContainer = styled.div`
  flex: 1;
  align-items: center;
  border: 1px solid #000000;
  margin: 0 5px;
`;

export const Input = styled.input`
  width: 70%;
  border: none;
  padding: 5px;
`;

export const Button = styled.button`
  margin: 0 5px;
  padding: 10px;
  border: 1px solid orange;
  color: orange;
`;

export const MainContainer = styled.div`
  margin: auto;
  padding: auto;
  height: 50vh;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 10vh;
`;

export const SubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 25px 0;
`;

export const CouponSection = styled.div`
  height: 5vh;
`;

export const CouponItem = styled.div`
  width: 48%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #e5e5e5;
  height: 20vh;
  margin: 10px;
  border-radius: 10%;
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;

export const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
