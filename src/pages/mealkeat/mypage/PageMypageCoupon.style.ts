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
  margin: 25px auto;
  width: 90%;
`;

export const CouponName = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 25px auto;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  border: 1px solid #5f5f5f;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50px;
  margin: auto;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #5f5f5f;
  margin: 0 5px;
  height: 40px;
  width: 80%;
  margin: auto;
  align-items: center;
`;

export const Input = styled.input`
  width: 60%;
  border: none;
  padding: 5px;
  height: 32px;
`;

export const Button = styled.button`
  margin: 0 5px;
  padding: 10px;
  background-color: #fd6f21;
  color: white;
  &:hover {
    background-color: #ff8c4b;
  }
`;

export const MainContainer = styled.div`
  margin: auto;
  padding: auto;
  height: 50vh;
  width: 90%;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 10vh;
  gap: 10px;
`;

export const SubTitle = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 25px 0;
`;

export const CouponSection = styled.div`
  height: 5vh;
  width: 100%;
  margin: auto;
`;

export const CouponItem = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 20px;
`;

export const IconContainer = styled.div`
  margin-right: 10px;
`;

export const CouponInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
