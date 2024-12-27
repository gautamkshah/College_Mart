import axiosClient from '../lib/axiosClient'
export const getAllCategories = async () => {
      try {

            const response = await axiosClient.get('/api/categories');
            return response.data.categories;
      } catch (e) {
            console.log("Error fetching categoriess", e);
            return [];
      }
};



export const getProductByCategoryId = async (id:string) => {
      try {

            const response = await axiosClient.get('/api/products/'+id);
            return response.data;
      } catch (e) {
            console.log("Error fetching categories", e);
            return [];
      }
};
