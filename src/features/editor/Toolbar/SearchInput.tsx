import React from "react";
import { Flex, Text, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useFocusNode } from "src/hooks/useFocusNode";
import { useTranslation } from "next-i18next";

const StyledSearchWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  width: 250px;
`;

export const SearchInput = () => {
  const { t } = useTranslation("editor");
  const [searchValue, setValue, skip, nodeCount, currentNode] = useFocusNode();

  return (
    <StyledSearchWrapper>
      <TextInput
        type="search"
        size="md"
        id="search-node"
        value={searchValue}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder={t("editor.search.placeholder")}
        autoComplete="off"
        autoCorrect="off"
        onKeyDown={getHotkeyHandler([["Enter", skip]])}
        leftSection={<AiOutlineSearch />}
        rightSection={
          searchValue && (
            <Flex h={30} align="center">
              <Text size="xs" c="dimmed" pr="md">
                {searchValue && `${nodeCount}/${nodeCount > 0 ? currentNode + 1 : "0"}`}
              </Text>
            </Flex>
          )
        }
      />
    </StyledSearchWrapper>
  );
};
