import axios from "axios";

const apiUrl = "http://localhost:3000/presents";

const getPresentsList = async () => {
  try {
    const presents = await axios.get(apiUrl);
    if (!presents) return [];
    return presents.data;
  } catch (err) {
    console.error(err);
  }
};

const getPresentById = async (id) => {
  try {
    const present = await axios.get(`${apiUrl}/${id}`);
    console.log("w api ", present);
    if (!present) return {};
    return present.data;
  } catch (err) {
    console.error(err);
  }
};

const addPresent = async (presentData) => {
  try {
    const addedPresent = await axios.post(apiUrl, presentData);
    if (addedPresent) return addedPresent;
  } catch (err) {
    console.error(err);
  }
};

const updatePresent = async (id, presentData) => {
  try {
    const updatedPresent = await axios.put(`${apiUrl}/${id}`, presentData);
    if (updatedPresent) return updatedPresent;
  } catch (err) {
    console.error(err);
  }
};

const deletePresent = async (id) => {
  try {
    const deletedPresent = await axios.delete(`${apiUrl}/${id}`);
    if (deletedPresent) return "OK";
  } catch (err) {
    console.error(err);
  }
};

export {
  getPresentsList,
  getPresentById,
  addPresent,
  updatePresent,
  deletePresent,
};
