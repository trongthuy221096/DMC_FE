import {
    Box,
    Center,
    Flex,
    Heading,
    Image,
    Text,
    Button,
} from "@chakra-ui/react";
import { React } from "react";

function Page500() {
    return (
        <Box className="vh-100">
            <Center height="100%">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                >
                    <Heading as="h2" mb="2">
                        500 Server Error!
                    </Heading>
                    <Text as="p" mb="4">
                        Unfortunately we're having trouble loading the page you
                        are looking for. Please come back in a while.
                    </Text>
                    <Image
                        src="/assets/img/page500.png"
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

export default Page500;
