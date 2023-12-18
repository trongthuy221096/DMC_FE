import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import { React } from "react";

function Page404() {
    return (
        <Box className="vh-100">
            <Center height="100%">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                >
                    <Heading as="h2" mb="2">
                        Page Not Found :(
                    </Heading>
                    <Text as="p" mb="4">
                        Oops! 😖 The requested URL was not found on this server.
                    </Text>
                    <Image
                        src="/assets/img/page-misc-error-light.png"
                        alt="page-misc-error-light"
                        maxWidth="500px"
                        mx="auto"
                        mt="3"
                    />
                </Flex>
            </Center>
        </Box>
    );
}

export default Page404;
