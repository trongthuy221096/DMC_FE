import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function LoginModal({ onClose, isOpen }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody p={10}>
          <Image
            src="/assets/img/DMC.png"
            alt="ảnh"
            w={"35%"}
            m={"auto"}
            borderRadius="lg"
          />
          <h4 className="mb-2 ">Welcome to DMC! </h4>
          <p className="mb-4">Please sign-in to your account</p>
          <Stack mt="6" spacing="3">
            <FormControl>
              <FormLabel>Email </FormLabel>
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                mb={3}
                htmlSize={40}
              />
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="********"
                  htmlSize={40}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    onClick={handleClick}
                    colorScheme="teal"
                    variant="ghost"
                  >
                    {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
          <Button w={"100%"} my={5}>Sign in</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default LoginModal;
