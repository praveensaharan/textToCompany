import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Button, Input, message as antdMessage } from "antd";
import { useDropzone } from "react-dropzone";
import Footer from "./Footer";

const { TextArea } = Input;

const Home = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePasted, setImagePasted] = useState(false);
  const [textDisabled, setTextDisabled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
          console.log(response.data);
        }

        setText("");
        setImage(null);
        setImagePreview(null);
        setImagePasted(false);
        setTextDisabled(false);
        setFormSubmitted(true);
      } catch (error) {
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Footer />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Send a Message or Image
        </h2>
        <div
          {...getRootProps()}
          className={`p-4 border-2 border-dashed rounded-lg ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          } mb-4 flex justify-center items-center`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-gray-700">Drop the files here ...</p>
          ) : (
            <p className="text-center text-gray-700">
              Drag 'n' drop an image here, or click to select an image
            </p>
          )}
        </div>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <TextArea
          rows={4}
          placeholder="Type a message or paste Image"
          value={text}
          onChange={handleTextChange}
          disabled={textDisabled}
          className="mb-4"
          style={{ borderRadius: "8px" }}
        />

        {imagePasted && (
          <p className="text-green-600 text-sm mb-2">
            Image pasted from clipboard
          </p>
        )}
        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={formSubmitted}
          className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Home;
