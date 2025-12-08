import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080') + '/api/sales';

export const fetchSales = async (params) => {
    try {
        // Filter out null/undefined/empty string values
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v != null && v !== '')
        );

        // Handle array parameters for comma-separated lists (Spring Boot default handling variation)
        // Spring @ModelAttribute with List<String> often works best with repeated params ?regions=North&regions=South
        // Axios handles arrays as repeated params by default with bracket format [] usually, we need to ensure compatibility
        // Let's use standard paramsSerializer if needed, but default often works with Spring.
        // Actually, for @ModelAttribute List<String>, ?regions=A,B might not work out of box without splitter. 
        // Safer to use paramsSerializer to repeat config: { arrayFormat: 'repeat' } but axios default is 'brackets'.
        // Spring Boot reads repeated parameters `regions=North&regions=South` correctly.

        const response = await axios.get(API_URL, {
            params: cleanParams,
            paramsSerializer: {
                indexes: null // leads to regions=North&regions=South
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sales data", error);
        throw error;
    }
};
