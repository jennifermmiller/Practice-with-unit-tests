console.log('\'Allo \'Allo!');

function Collection (models) {
  this.models = models;
  this.find = function(id){
    var result;
    if((!(_.isString(id))) || (arguments.length != 1)) {
      throw new Error ('Need a valid id');
    }

    this.models.forEach(function(value, index){
      if(value.id == id){
        result = value;
      }
    });
    if (result){
      return  result;
    }
  };

  this.add = function(person) {
    if(!(_.isObject(person))) {
      throw new Error('Can\'t add something that\'s not an object.');
    }
    if (_.isEmpty(person)) {
      throw new Error ('You can\'t add someone without any information!');
    } 
    if (!(_.isString(person.id)) || _.isEmpty(person.id)) {
      throw new Error ('Everyone must have proper a ID!');
    }  
    this.models.push(person);
  };

  this.remove = function(removeId){
    if(!(_.isString(removeId))) {
      throw new Error('ID is not a string!')
    }
    if(arguments.length != 1) {
      throw new Error('Can only remove one at a time!')
    }
    if(_.isEmpty(removeId)){
      throw new Error('Can\'t remove without an ID.');
    }

    this.models = _.reject(this.models, function(model){
      return model.id == removeId;
    });

    return true;
  };

  this.empty = function() {
    if(arguments.length != 0) {
      throw new Error('.empty() does not need an argument.');
    }
    for(var i = 0; i<models.length; i++) {
      this.models = _.without(this.models, models[i]);
    }
    return true;
  };

  this.random = function() {
    var rndm = _.sample(this.models)
    return rndm;
  };

  this.length = function() {
    if(arguments.length != 0) {
      throw new Error('.empty() does not need an argument.');
    }
    var modelLength = this.models.length;
    return modelLength;
  }
};






























