import React from "react";
import styled from "styled-components";

// 直接使用内联样式，避免字体加载问题
const LogoText = styled.div`
  font-weight: 800;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 6px;
  color: white;
  font-family: "Mona Sans", "Futura", "Helvetica", sans-serif;
  white-space: nowrap;
  mix-blend-mode: difference;
  margin: 0;
  z-index: 10;
  vertical-align: middle;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const Logo = () => {
  const handleClick = () => {
    // 直接设置页面 URL，强制页面跳转
    document.location.href = "/";
  };

  return (
    <LogoText onClick={handleClick} title="返回主页">
      JsonFormat
    </LogoText>
  );
};
