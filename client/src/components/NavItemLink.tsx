import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactText } from "react";
import { IconType } from "react-icons";

interface NavItemLinkProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

export const NavItemLink = ({ children, icon, ...rest }: NavItemLinkProps) => {
  return (
    <Link href="#">
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
