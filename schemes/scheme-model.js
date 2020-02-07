const db = require('../data/db-config.js');

function find() {
  return db('schemes');
};

function findById(id) {
  return db('schemes').where({ id }).first();
};

function findSteps(id) {
  return db('steps')
    .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
    .select('steps.id', 'schemes.scheme_name', 'steps.instructions')
    .where({ scheme_id: id })
    .orderBy('steps.step_number');
};

function add(schemeData) {
  return db('schemes').insert(schemeData)
    .then(idArray => {
      return db('schemes').where({ id: idArray[0] }).first();
    })
};

function update(changes, id) {
  return db('schemes').where({ id }).update(changes)
    .then(count => {
      return db('schemes').where({ id }).first();
    });
};

function remove(id) {
  return db('schemes').where({ id }).first()
    .then(schemeToRemove => {
      return db('schemes').where({ id }).del()
        .then(count => {
          return schemeToRemove;
        })
    })
    .catch(err => {
      if (!id) {
        return null;
      } else {
        return err;
      };
    });
}


module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}