class ProductRepository {
    constructor() {
        this.entities = [];
    }

    fetchAll() {
        return this.entities;
    }

    getById(id) {
        return this.entities.find((entity) => id == entity.id);
    }

    insert(entity) {
        this.entities.push(entity);
    }

    clearAll() {
        this.entities = [];
    }
}

const productRepository = new ProductRepository();


module.exports = productRepository;
