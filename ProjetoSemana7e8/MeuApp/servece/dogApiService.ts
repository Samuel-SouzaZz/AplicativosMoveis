import axios from 'axios';

const DOG_IMAGE_API = 'https://dog.ceo/api/breeds/image/random';

export const fetchRandomDogImage = async (): Promise<string> => {
    try {
        const response = await axios.get(DOG_IMAGE_API);

        if (response.data && response.data.status === 'success') {
            return response.data.message;
        }

        return 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400';
    } catch (error) {
        console.error('Erro ao buscar imagem de cachorro:', error);
        return 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400';
    }
}; 