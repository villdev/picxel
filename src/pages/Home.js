import React, { useState } from "react";
import { Gallery, Header } from "../components";
import { usePhotos } from "../hooks";
import {
  Spinner,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const {
    photos,
    status,
    getNextPage,
    // searchResults,
    getNextSearchPage,
    searchQuery,
    setSearchQuery,
    getSearchResults,
    variant,
  } = usePhotos();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImg, setCurrentImg] = useState(null);

  const openPopup = (url) => {
    setCurrentImg(url);
    onOpen();
  };

  const closePopup = () => {
    setCurrentImg(null);
    onClose();
  };

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        getSearchResults={getSearchResults}
      />
      <Modal isCentered isOpen={isOpen} onClose={closePopup} size={"xl"}>
        <ModalOverlay />
        <ModalContent
          paddingTop="1.5rem"
          paddingBottom="0.5rem"
          paddingRight="0.5rem"
          paddingLeft="0.5rem"
          backgroundColor="gray.800"
        >
          <ModalCloseButton size="sm" />
          <ModalBody>
            <img className="popup-img" src={currentImg} alt="" />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">
              <a
                href={currentImg}
                download
                rel="noopener noreferrer"
                target="_blank"
              >
                Download image
              </a>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {status === "pending" && (
        <div className="loader-wrapper">
          <Spinner />
        </div>
      )}
      {status === "resolved" && (
        <InfiniteScroll
          dataLength={photos.length}
          next={variant === "default" ? getNextPage : getNextSearchPage}
          hasMore={true}
          loader={
            <div className="loader-wrapper">
              <Spinner />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all the photos.</b>
            </p>
          }
        >
          <Gallery imgArray={photos} openPopup={openPopup} />
        </InfiniteScroll>
      )}
      {status === "rejected" && (
        <div className="alert-wrapper">
          <Alert justifyContent={"center"} status="error">
            <AlertIcon />
            There was an error processing your request. Please refresh.
          </Alert>
        </div>
      )}
    </div>
  );
}
