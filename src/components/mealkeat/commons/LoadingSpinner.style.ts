import styled, { keyframes } from "styled-components";

// 스피너 애니메이션 정의
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 스피너 스타일드 컴포넌트
export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${({ theme }) => theme.colors.mainColor};
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;
