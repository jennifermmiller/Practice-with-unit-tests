/* global describe, it */

(function(){
  'use strict';

  describe('A Collection constructor', function(){
    describe('when run', function(){
      it('should return a new object', function(){
        var students = new Collection;

        expect(students.constructor.name).to.equal("Collection");
      });

      it('stores its first param in a property called models', function(){
        var toBeAdded = [{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]
        var students = new Collection(toBeAdded)

        expect(students.models).to.be.a('Array');

        expect(students.models[1].name).to.equal('Jack');
      });
    });
  });
  
  //brainstorm on what a function should do
  //tests only help reveal bugs, can't prove they don't exsist
  describe("A Collection instance", function(){
    describe("has a .find() method",function(){
      it("should return an object when given an id that is present in the models", function(){
        var students = new Collection([{name: 'Jim', id: '99'},{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.find('99')).to.deep.equal({name: 'Jim', id: '99'})
        expect(students.find('2')).to.deep.equal({name:'Jack', id: '2'})
      });

      it("should not return an object when that id is not present in the models", function(){
        var students = new Collection([{name: 'Jim', id: '99'},{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.find('5')).to.not.equal({name: 'Jim', id: '99'});
        expect(students.find('90')).to.not.be.an('object');
      });

      it("should return undefined when that id is not present in the models", function(){
        var students = new Collection([{name: 'Jim', id: '99'}]);
        expect(students.find('1')).to.equal(undefined);
        expect(students.find('45')).to.equal(undefined);
      });

      it("should throw an error when given an argument other than a string", function(){
        var students = new Collection([{name: 'Jim', id: '99'}]);
        expect(function(){students.find(45)}).to.throw(Error);
        expect(function(){students.find({})}).to.throw(Error);
        expect(function(){students.find([])}).to.throw(Error);
        expect(function(){students.find(true)}).to.throw(Error);
      });

      it("should not accept an empty argument or more than one argument", function(){
        var students = new Collection([{name: 'Jim', id: '99'},{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(function(){students.find()}).to.throw(Error);
        expect(function(){students.find('2', '99')}).to.throw(Error);
      });
    });

    describe("has an .add() method",function(){
      it("should add the object it's given to the models property", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.add({name: 'Jim', id: '99'});
        expect(students.models[2]).to.deep.equal({name: 'Jim', id: '99'}); //Correct phrasing? does contain work?
      });

      it("should increase the models property's length by 1", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.add({name: 'Jim', id: '99'});
        expect(students.models.length).to.equal(3);
      });
      
      it("should only accept a single object as an argument", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.add({name: 'Fred', id: '3'},{name:'Jack', id:'15'});
        expect(students.models).to.deep.equal([{name: 'Fred', id: '1'},{name:'Jack', id: '2'},{name: 'Fred', id: '3'}]);
      });

      it("should not accept an empty object as an argument", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(function(){students.add({})}).to.throw(Error);
      });
      
      it("should throw an error when given an object without an id property", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(function(){students.add({name: 'Bob'})}).to.throw(Error) ; 
      });
    
    });
    
    describe("has a .remove() method",function(){
      it("should, when given an id, remove the corresponding object from the models property", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.remove('1');
        expect(students.models).to.not.contain({name: 'Fred', id: '1'}); 
        expect(students.models[1]).to.equal(undefined);
      });

      it("should decrease the models property's length by 1", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.remove('1');
        expect(students.models.length).to.equal(1);
      });

      it("should only accept a single string as an id argument", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(function(){students.remove('1','2')}).to.throw(Error);
      });

      it("should return true on successful removal", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.remove('1')).to.equal(true); //????
      });
    });

    describe("has an .empty() method", function(){
      it("should clear out the models array", function() {
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.empty();
        expect(students.models).to.be.empty;
      });
      
      it("should make the models property's length 0", function() { 
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.empty();
        expect(students.models.length).to.equal(0); //Same as one above test?
      });  
      
      it("should return true on successful removal of all objects", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.empty()).to.equal(true); 
      });
      
      it("should not accept arguments", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(function(){students.empty({name: 'Fred'})}).to.throw(Error);
      });
    });

    describe("has a .random() method", function(){
      it("should return a random object from the models array", function() {
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.models).to.contain(students.random()); //how to test for random?
      });
      
      //Is below valid 'it' statement? POintless?
      it("should not return an object that is outside of the models array", function() {
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.random()).to.not.deep.equal({name: 'Jim', id: '99'});
      });
      
      it("should not return anything other than an object", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.random()).to.not.be.a('Array');
        expect(students.random()).to.not.be.a('String');
        expect(students.random()).to.not.be.a('Number');
        expect(students.random()).to.not.be.a('Boolean');
      });
      
      it("should not return an empty object", function() {
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.random()).to.not.be.empty;
      });
    });

    describe("has a .length() method", function(){
      it("should return the length of models array", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.length()).to.equal(2);
      });
      
      it("should return a number", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(students.length()).to.not.be.a('Array');
        expect(students.length()).to.not.be.a('String');
        expect(students.length()).to.not.be.a('Boolean');
        expect(students.length()).to.not.be.a('Object');
      }); 
      
      it("should not accept arguments", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        expect(function(){students.length('hello')}).to.throw(Error);
      });
      
      it("should in no way alter the models array", function(){
        var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
        students.length();
        expect(students.models).to.deep.equal([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
      });
    });
  });  
})();










