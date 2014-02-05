
//Collection Spec....mapping out what we wan to accomplish

//Should make a new instance of a Collection
students = new Collection();

//if given array, store array in property called 'models'
var q1_2014[
	{
		name: "Fred",
    id:1
	},
  {
    name: "Jack",
    id:2
  }
]

students = new Collection(q1_2014)
//would return:
  {
    models:[{name: 'Fred', id:1},{name:'Jack', id:2}]
  }

//a Collection has a .find() method that searches by ID
students.find('1') //should find Fred

//a Collection has an .add() method that takes an object literal and adds to the models array
.students.add({name: 'Jim', id:3})

//a Collection has a .remove() method that takes an id and removes it from models array
.students.removes('2')