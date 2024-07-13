import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getToken = () => localStorage.getItem('token');

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products`, product, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, product, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
    } catch (error) {
        throw error;
    }
};
