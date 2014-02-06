console.log('\'Allo \'Allo!');


  function Collection (models) {
    this.models = models;
    this.find = function(id){
      var result;
      if(typeof(id)  != 'string'){
        throw new Error ('Oops!');
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
      if (person === {}) {
        throw new Error ('You can\'t add someone without any information!');
      } 
      if (typeof(person.id) != 'string' || typeof(person.id) == '') {
        throw new Error ('Everyone must have proper ID!');
      }  
      this.models.push(person);
    };

    //can remove call find, then proceed?
    this.remove = function(id) {
      if(typeof(id)  != 'string'){
          throw new Error ('Wrong input!');
      }
      
      var result;
      
      this.models.forEach(function(value, index){
        if(value.id == id){
          result = value;
        }
      });  
        
      var location = this.models.indexOf(result);
      this.models.splice(location, 1);
      return true;
    };
 };


































