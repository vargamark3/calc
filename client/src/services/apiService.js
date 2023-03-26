import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || "http:/localhost:3000/api";

export const postNumber = async (number) => {
    try {
        await axios.post(`${apiUrl}/number`, { number });
    } catch (error) {
        console.error(error);
    }
};

export const getNumber = async () => {
    try {
        const response = await axios.get(`${apiUrl}/number`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
