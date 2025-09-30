import { useReducer, useEffect } from 'react';
import { Dog } from '../model/dogs';
import DogService from '../servece/dogServece';
import { fetchRandomDogImage } from '../servece/dogApiService';

interface ValidationErrors {
    name?: string;
    description?: string;
}

interface DogState {
    dogs: Dog[];
    loading: boolean;
    errors: ValidationErrors;
}

type DogAction =
    | { type: 'SET_DOGS'; payload: Dog[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERRORS'; payload: ValidationErrors }
    | { type: 'CLEAR_ERRORS' };

const initialState: DogState = {
    dogs: [],
    loading: false,
    errors: {},
};

const dogReducer = (state: DogState, action: DogAction): DogState => {
    switch (action.type) {
        case 'SET_DOGS':
            return { ...state, dogs: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, errors: {} };
        default:
            return state;
    }
};

export const useDogController = () => {
    const [state, dispatch] = useReducer(dogReducer, initialState);

    useEffect(() => {
        loadDogs();
    }, []);

    const loadDogs = () => {
        const allDogs = DogService.getAllDogs();
        dispatch({ type: 'SET_DOGS', payload: [...allDogs] });
    }

    const validateDog = (name: string, description: string): boolean => {
        const errors: ValidationErrors = {};

        if (!name.trim()) {
            errors.name = 'O nome é obrigatório';
        } else if (name.trim().length < 2) {
            errors.name = 'O nome deve ter pelo menos 2 caracteres';
        }

        if (!description.trim()) {
            errors.description = 'A descrição é obrigatória';
        } else if (description.trim().length < 5) {
            errors.description = 'A descrição deve ter pelo menos 5 caracteres';
        }

        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERRORS', payload: errors });
            return false;
        }

        dispatch({ type: 'CLEAR_ERRORS' });
        return true;
    }

    const addDog = async (name: string, description: string): Promise<boolean> => {
        if (!validateDog(name, description)) {
            return false;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const imageUrl = await fetchRandomDogImage();
            DogService.addDog(name, description, imageUrl);
            loadDogs();
            dispatch({ type: 'CLEAR_ERRORS' });
            return true;
        } catch (error) {
            console.error('Erro ao adicionar cachorro:', error);
            dispatch({ type: 'SET_ERRORS', payload: { name: 'Erro ao adicionar cachorro' } });
            return false;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    const deleteDog = (id: string) => {
        DogService.deleteDog(id);
        loadDogs();
    }

    const clearErrors = () => {
        dispatch({ type: 'CLEAR_ERRORS' });
    }

    return {
        dogs: state.dogs,
        loading: state.loading,
        errors: state.errors,
        addDog,
        deleteDog,
        clearErrors,
    };
}
