class DogRepository {
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
        // console.log("INSERTING", entity);
        this.entities.push(entity);
    }

    clearAll() {
        this.entities = [];
    }
}

const dogRepository = new DogRepository();

dogRepository.insert({ id: 1, name: "Hera", age: 12 });
dogRepository.insert({ id: 2, name: "Dias" , age: 2});
// console.log(dogRepository.fetchAll());

module.exports = dogRepository;
