import { Dog } from "../model/dogs";

class DogService {
    private dogs: Dog[] = [
        {
            id: '1',
            name: 'Leona',
            description: 'Uma cachorra muito esperta',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'
        }
    ];

    getAllDogs(): Dog[] {
        return this.dogs;
    }

    addDog(name: string, description: string, image: string): void {
        const newDog: Dog = {
            id: Date.now().toString(),
            name,
            description,
            image,
        };
        this.dogs.push(newDog);
    }

    deleteDog(id: string): void {
        this.dogs = this.dogs.filter(dog => dog.id !== id);
    }
}

export default new DogService();