/* global describe, it */

// (function () {
//   'use strict';

//   describe('Give it some context', function () {
//     describe('maybe a bit more context here', function () {
//       it('should run here few assertions', function () {
//         var answer = 1;
//         expect(2).to.equal(answer);
//       });
//     });
//   });
// })();


(function(){
  'use strict';

  describe('A Collection constructor', function(){
    describe(', when run', function(){
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

        //Attempt at my own it statements:
        //it('should not accept an empty string as an argument.',)
      });
 
      describe("has an .add() method",function(){
        it("should add the object it's given to the models property", function(){
          var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
          students.add({name: 'Jim', id: '99'});
          expect(students.models).to.contain({name: 'Jim', id: '99'}); //Correct phrasing?
        });

        it("should increase the models property's length by 1", function(){
          var students = new Collection([{name: 'Fred', id: '1'},{name:'Jack', id: '2'}]);
          students.add({name: 'Jim', id: '99'});
          expect(students.models.length).to.equal(3);
        });

        //Can I just throw errors for all of these below? Better way of doing this? Maybe something with respondTo?
        it("should only accept a single object as an argument", function(){
          var students = new Collection({name: 'Fred', id: '1'},{name:'Jack', id: '2'});
          expect(function(){students.add({name: 'Fred', id: '3'},{name:'Jack', id:'15'})}).to.throw(Error);
        });

        it("should not accept an empty object as an argument", function(){
          var students = new Collection({name: 'Fred', id: '1'},{name:'Jack', id: '2'});
          expect(students.add({})).to.be(undefined);//how do I do this?!? Not exactly what we're testinf for
        });
        it("should throw an error when given an object without an id property", function(){
          var students = new Collection({name: 'Fred', id: '1'},{name:'Jack', id: '2'});
          expect(function(){students.add({name: 'Fred'})}).to.throw(Error) ; 
        });
      
      });
      
 
      describe("has a .remove() method",function(){
        it("should, when given an id, remove the corresponding object from the models property", function(){
          var students = new Collection({name: 'Fred', id: '1'},{name:'Jack', id: '2'});
          students.remove('1');
          expect(students.models).to.not.contain({name: 'Fred', id: '1'}); 
        });

        it("should decrease the models property's length by 1", function(){
          var students = new Collection({name: 'Fred', id: '1'},{name:'Jack', id: '2'});
          students.remove('1');
          expect(students.models.length).to.equal(1);
        });

        it("should only accept a single string as an id argument", function(){
          var students = new Collection({name: 'Fred', id: '1'},{name:'Jack', id: '2'});
          expect(students.remove('1','2')).to.throw(Error);//I don't know what I'm doing!
        });

        it("should return true on successful removal", function(){
          var students = new Collection({name: 'Fred', id: '1'},{name:'Jack', id: '2'});
          expect(students.remove('1')).to.satisfy(true); //????
        });
      });
    });  
})();


//brainstorm on what a function should do
//tests only help reveal bugs, can't prove they don't exsist
//






