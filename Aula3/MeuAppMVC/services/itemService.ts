import { Item } from "../models/item";

class ItemService {
    private items: Item[] = [
        {id: '1', title: 'Item Exemplo 1'},
        {id: '2', title: 'Item Exemplo 2'},
    ];

    getAllItems(): Item[] {
        return this.items;
    }

    addItem(item: Item): void {
        this.items.push(item);
    }

    updateItem(updatedItem: Item): void {
        const index = this.items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            this.items[index] = updatedItem;
        }
    }

    deleteItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }
}

export default new ItemService();