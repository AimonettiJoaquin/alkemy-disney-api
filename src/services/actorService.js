const ActorRepository = require('../repositories/actorRepository');
const repository = new ActorRepository();

const findById = async(id) => {
    return await repository.findById(id);
}

const findByName = async(name) => {
    return await repository.findByName(name);
}


const findAll = async(filter, options) => {
    //return await repository.findAllWithPagination(filter, options);
    return await repository.findAll(filter,options)
} 


const save = async(a) => {
    return await repository.save(a);
}


const update = async(id, a) => {
    return await repository.update(id, a);
}

const remove = async(id) => {
    return await repository.remove(id);
}

module.exports = {
    findById,
    findByName,
    findAll,
    save,
    update,
    remove
}