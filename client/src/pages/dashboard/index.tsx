import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image, Wrap, WrapItem } from "@chakra-ui/react";
import { Dashboard } from "../../layout/Dashboard";
import { useIsAuth } from "../../utils/useIsAuth";

const Index = () => {
  useIsAuth();

  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    title: "Projet Codeboxx",
    formattedPrice: "",
  };

  return (
    <Box>
      <Wrap>
        {Array(8)
          .fill("")
          .map((e) => {
            return (
              <WrapItem>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image src={property.imageUrl} alt={property.imageAlt} />

                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {property.title}
                    </Box>

                    <Box>
                      {property.formattedPrice}
                      <Box as="span" color="gray.600" fontSize="sm">
                        2021-30-10
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </WrapItem>
            );
          })}
      </Wrap>
    </Box>
  );
};

export default Index;

Index.layout = Dashboard;
