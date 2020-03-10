const db = require("../data/config")

function findBy(id){
    return db("users")
        .first()
        .where({ "projects.id": id })
}

function add(users){
    return db("users")
        .insert(users)
        .then(ids => {
            return findBy(ids)
        })
}

function find(){
    return db("users")
}

module.exports = {
    findBy,
    add,
    find
}