import React, { useEffect } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image } from "@mantine/core";
import styled from "styled-components";

const monaSans = localFont({
  src: "../assets/fonts/Mona-Sans.woff2",
  variable: "--mona-sans",
  display: "swap",
  fallback: ["Futura, Helvetica, sans-serif", "Tahoma, Verdana, sans-serif"],
});

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  mix-blend-mode: difference;
`;

const StyledTitle = styled.span<{ fontSize: string }>`
  font-weight: 800;
  margin: 0;
  font-family: ${monaSans.style.fontFamily} !important;
  font-size: ${({ fontSize }) => fontSize};
  white-space: nowrap;
  z-index: 10;
  vertical-align: middle;
`;

interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
  fontSize?: string;
  hideLogo?: boolean;
  hideText?: boolean;
}

export const JSONCrackLogo = ({ fontSize = "1.2rem", hideText, hideLogo, ...props }: LogoProps) => {
  const [isWidget, setIsWidget] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    // 只有在嵌入式小部件模式下才在新窗口打开链接
    setIsWidget(window !== undefined && window.location.href.includes("widget"));
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    // 如果是小部件模式，使用默认的链接行为（在新窗口打开）
    if (isWidget) return;
    
    // 否则，阻止默认行为并使用路由导航
    e.preventDefault();
    router.push("/");
  };

  return (
    <Link href="/" prefetch={false} target={isWidget ? "_blank" : "_self"} onClick={handleLogoClick}>
      <StyledLogoWrapper>
        {!hideLogo && (
          <Image
            src="/assets/logo.svg"
            loading="eager"
            width={parseFloat(fontSize) * 18}
            height={parseFloat(fontSize) * 18}
            alt="logo"
            mb="2"
          />
        )}
        {!hideText && (
          <StyledTitle fontSize={fontSize} {...props}>
            JsonFormat
          </StyledTitle>
        )}
      </StyledLogoWrapper>
    </Link>
  );
};
