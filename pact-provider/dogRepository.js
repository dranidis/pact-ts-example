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
        console.log("🎃 INSERTING", entity);
        this.entities.push(entity);
    }
}

const dogRepository = new DogRepository();

// dogRepository.insert({ id: 1, name: "Fido" });
// console.log(dogRepository.fetchAll());

module.exports = dogRepository;
