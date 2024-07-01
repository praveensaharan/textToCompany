import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Input, message as antdMessage } from "antd";
import { useDropzone } from "react-dropzone";
import ConditionalComponent from "./Response";
const { Title, Text } = Typography;
const { TextArea } = Input;

const Home = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePasted, setImagePasted] = useState(false);
  const [textDisabled, setTextDisabled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [responseDatatext, setResponseDatatext] = useState(false);
  const [responseDataimage, setResponseDataimage] = useState(false);
  const [imageResponse, setImageResponse] = useState({});
  const [textResponse, setTextResponse] = useState({});

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImagePasted(false);
      setTextDisabled(true);
      antdMessage.success(`${file.name} file uploaded successfully`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text || image) {
      try {
        if (text) {
          const response = await axios.post(
            "https://s3-to-emai.vercel.app/uploadtext",
            {
              text: text,
            }
          );
          setTextResponse(response.data);
          setResponseDatatext(true);
          console.log(response.data);
        }

        if (image) {
          const formData = new FormData();
          formData.append("image", image);

          const response = await axios.post(
            "https://s3-to-emai.vercel.app/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setImageResponse(response.data);
          setResponseDataimage(true);
          console.log(response.data);
        }

        setText("");
        setImage(null);
        setImagePreview(null);
        setImagePasted(false);
        setTextDisabled(false);
        setFormSubmitted(true);
      } catch (error) {
        antdMessage.error(
          "An error occurred. Maybe there is no email in that."
        );
        console.error("Error:", error);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handlePaste = useCallback((event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setImage(file);
          setImagePreview(URL.createObjectURL(file));
          setImagePasted(true);
          setTextDisabled(true);
          antdMessage.success("Image pasted successfully");
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  useEffect(() => {
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 pt-24 pb-20">
      <div className=" bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <Title level={2} className="mb-4 text-center">
          Send a Message or Image
        </Title>
        <Text className="text-center mb-4">
          Please fill in the details below to send your message or image
        </Text>
        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            className={`p-4 border-2 border-dashed rounded-lg ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            } mb-4`}
          >
            {!text && <input {...getInputProps()} />}

            {isDragActive ? (
              <p className="text-center">Drop the files here ...</p>
            ) : (
              <p className="text-center">
                Drag 'n' drop an image here, or click to select an image
              </p>
            )}
          </div>
          {imagePreview && (
            <div className="mb-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-20 h-auto"
              />
            </div>
          )}
          <TextArea
            rows={4}
            placeholder="Type a message or paste an image that contains an email"
            value={text}
            onChange={handleTextChange}
            disabled={imagePreview || imagePasted}
            className="mb-4"
          />
          {imagePasted && (
            <Text className="text-green-600 text-sm mb-2">
              Image pasted from clipboard
            </Text>
          )}
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={formSubmitted}
          >
            Send
          </Button>
        </form>
        <div className="flex mt-2">
          <div>
            {responseDatatext && (
              <ConditionalComponent url={null} results={textResponse.results} />
            )}
          </div>
          <div>
            {responseDataimage && (
              <ConditionalComponent
                url={imageResponse.url}
                results={imageResponse.results}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
