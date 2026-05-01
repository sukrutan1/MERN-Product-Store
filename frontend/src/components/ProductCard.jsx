import React, { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  VStack,
  IconButton,
  useColorModeValue,
  Input,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textcolor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast({
        title: "Success",
        description: "Product Deleted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Product Delete Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleupdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: "Product Update Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-20px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} textColor={textcolor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={(id) => handleDelete(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  name="name"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  name="name"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleupdateProduct(product._id, updatedProduct)}
              >
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default ProductCard;
