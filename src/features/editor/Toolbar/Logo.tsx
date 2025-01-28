import React from "react";
import { JSONCrackLogo } from "src/layout/JsonCrackLogo";
import { StyledToolElement } from "./styles";

export const Logo = () => {
  return (
    <StyledToolElement title="JsonFormat">
      <JSONCrackLogo fontSize="1.2rem" hideText />
    </StyledToolElement>
  );
};
