import {
  Box,
  useColorModeValue,
  Flex,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import { NavItemLink } from "./NavItemLink";

interface SideBarContentProps {
  onClose: () => void;
  display?: {
    base: string;
    md: string;
  };
}

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

export const SideBarContent: React.FC<SideBarContentProps> = ({
  onClose,
  ...rest
}) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Rise.
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItemLink key={link.name} icon={link.icon}>
          {link.name}
        </NavItemLink>
      ))}
    </Box>
  );
};
