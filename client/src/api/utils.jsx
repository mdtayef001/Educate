import axios from "axios";

const imgUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", "educate");

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dxlagwetk/image/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.url;
};

const addUserToDB = async (email = "", name = "", image = "") => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/${email}`,
    {
      name,
      image,
      email,
    }
  );

  return data;
};

export { imgUpload, addUserToDB };
