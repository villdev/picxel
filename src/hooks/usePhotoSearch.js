import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services";
import { jsonParse } from "../utils";
// import { useToast } from "@chakra-ui/react";

const usePhotoSearch = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("idle");
  // const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const [pgNo, setPgNo] = useState(2);

  const getPhotos = async () => {
    try {
      const response = await axios.get(
        API_URL + "flickr.photos.search" + `&text=${searchQuery}`
      );
      if (response.status === 200) {
        const parsedResponse = jsonParse(response.data);
        setPhotos(parsedResponse.photos.photo);
        setStatus("resolved");
      }
    } catch (error) {
      // console.error(error);
      setStatus("rejected");
      // toast({
      //   title: `Error while loading! Please refresh.`,
      //   status: "error",
      //   isClosable: true,
      // });
    }
  };

  const getNextPage = async () => {
    try {
      const response = await axios.get(
        API_URL +
          "flickr.photos.search" +
          `&text${searchQuery}` +
          `&page=${pgNo}`
      );
      if (response.status === 200) {
        const parsedResponse = jsonParse(response.data);
        // setPhotos(parsedResponse.photos.photo);
        setPhotos((prevState) => {
          return [...prevState, ...parsedResponse.photos.photo];
        });
        setStatus("resolved");
        setPgNo((no) => no + 1);
      }
    } catch (error) {
      // console.error(error);
      setStatus("rejected");
      // toast({
      //   title: `Error while loading! Please refresh.`,
      //   status: "error",
      //   isClosable: true,
      // });
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      setStatus("pending");
      getPhotos();
    }
  }, [searchQuery]);
  return { status, photos, getNextPage, searchQuery, setSearchQuery };
};

export default usePhotoSearch;
