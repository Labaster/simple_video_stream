/* eslint-disable max-len */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable camelcase */
/* eslint-disable func-names */
import lodash from 'lodash';

/** Abstract factory - is simply an object that creates other objects */
class Employee {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`I am employee ${this.name}`);
  }
}

class EmployeeFactory {
  create(name) {
    this.employeeInstance = new Employee(name);
    return this.employeeInstance;
  }
}

class Vendor {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`I am vendor ${this.name}`);
  }
}

class VendorFactory {
  create(name) {
    this.vendorInstance = new Vendor(name);
    return this.vendorInstance;
  }
}

function runAbstaractFactory() {
  const persons = [];
  const employeeFactory = new EmployeeFactory();
  const vendorFactory = new VendorFactory();

  persons.push(employeeFactory.create('Joan DiSilva'));
  persons.push(employeeFactory.create('Tim O\'Neill'));
  persons.push(vendorFactory.create('Gerald Watson'));
  persons.push(vendorFactory.create('Nicole McNight'));

  for (let i = 0; i < persons.length; i += 1) persons[i].say();
}

// runAbstaractFactory();

/** ************************************************************ */

/** Builder - is a factory that creates an object step by step */
function Shop() {
  this.construct = function (builder) {
    builder.step1();
    builder.step2();
    return builder.get();
  };
}

function Car() {
  this.doors = 0;

  this.addParts = function () {
    this.doors = 4;
  };

  this.say = function () {
    console.log(`I am a ${this.doors}-door car`);
  };
}

function Truck() {
  this.doors = 0;

  this.addParts = function () {
    this.doors = 2;
  };

  this.say = function () {
    console.log(`I am a ${this.doors}-door truck`);
  };
}

function CarBuilder() {
  this.car = null;

  this.step1 = function () {
    this.car = new Car();
  };

  this.step2 = function () {
    this.car.addParts();
  };

  this.get = function () {
    return this.car;
  };
}

function TruckBuilder() {
  this.truck = null;

  this.step1 = function () {
    this.truck = new Truck();
  };

  this.step2 = function () {
    this.truck.addParts();
  };

  this.get = function () {
    return this.truck;
  };
}

function runBuilder() {
  const shop = new Shop();
  const carBuilder = new CarBuilder();
  const truckBuilder = new TruckBuilder();
  const car = shop.construct(carBuilder);
  const truck = shop.construct(truckBuilder);

  car.say();
  truck.say();
}

// runBuilder();
/** ************************************************************ */

/** Factory Method - is a factory that creates an object based on a parameter */
const FullTime = function () {
  this.hourly = '$12';
};

const PartTime = function () {
  this.hourly = '$11';
};

const Temporary = function () {
  this.hourly = '$10';
};

const Contractor = function () {
  this.hourly = '$15';
};

const Factory = function () {
  this.createEmployee = function (type) {
    let employee = null;

    switch (type) {
      case 'fulltime': employee = new FullTime(); break;
      case 'parttime': employee = new PartTime(); break;
      case 'temporary': employee = new Temporary(); break;
      case 'contractor': employee = new Contractor(); break;
      default: throw new Error(`No such employee type: ${type}`);
    }
    employee.type = type;

    employee.say = function () {
      console.log(`${this.type}: rate ${this.hourly}/hour`);
    };

    return employee;
  };
};

function runAbstractMethod() {
  const employees = [];
  const factory = new Factory();

  employees.push(factory.createEmployee('fulltime'));
  employees.push(factory.createEmployee('parttime'));
  employees.push(factory.createEmployee('temporary'));
  employees.push(factory.createEmployee('contractor'));

  for (let i = 0, len = employees.length; i < len; i += 1) employees[i].say();
}

// runAbstractMethod();
/** ************************************************************ */

/** Prototype - it returns objects that are initialized with values it copied from a prototype */
class Customer {
  constructor(first, last, status) {
    this.first = first;
    this.last = last;
    this.status = status;
  }

  say() {
    console.log(`name: ${this.first} ${this.last}, status: ${this.status}`);
  }
}

class CustomerPrototype {
  constructor(_class, protoOfClass) {
    this.proto = protoOfClass;
    this.classInstance = new _class();
  }

  clone() {
    if (!this.classInstance) throw new Error('No class instance');

    const classPrototype = this.classInstance;
    lodash.each(this.proto, (val, prop) => {
      classPrototype[prop] = val;
    });
    return classPrototype;
  }
}

function runPrototype() {
  const proto = new Customer('n/a', 'n/a', 'pending');
  const prototype = new CustomerPrototype(Customer, proto);

  const customer = prototype.clone();
  customer.say();
}

// runPrototype();
/** ************************************************************ */

/** Singleton - is a class that can only have one instance */
const Singleton = (() => {
  let instance;

  const createInstance = () => new Object('I am the instance');

  return {
    // eslint-disable-next-line no-return-assign
    getInstance: () => (instance || (instance = createInstance())),
  };
})();

class SingletonV2 {
  constructor() {
    this.count = 0;
    if (typeof SingletonV2.instance === 'object') return SingletonV2.instance;
    SingletonV2.instance = this;
    return SingletonV2.instance;
  }

  getCounter() {
    return this.count;
  }

  incCounter() {
    this.count += 1;
  }
}

const runSingletone = () => {
  const instance_1 = Singleton.getInstance();
  const instance_2 = Singleton.getInstance();

  console.log(`Same instance example1? ${instance_1 === instance_2}`);

  const instanceV2_1 = new SingletonV2();
  const instanceV2_2 = new SingletonV2();

  instanceV2_1.incCounter();
  instanceV2_2.incCounter();
  instanceV2_2.incCounter();
  instanceV2_2.incCounter();

  console.log(`Same instance example2? ${instanceV2_1 === instanceV2_2}`);
  console.log(instanceV2_1.getCounter(), instanceV2_2.getCounter());
};

// runSingletone();
/** ************************************************************ */

/** Adapter - translates one interface (an object‘s properties and methods) to another */
class SimpleEarphones {
  constructor() {
    this.type = 1;
  }

  getType() {
    console.log(this.type);
  }
}

class EarPhoneAdapter extends SimpleEarphones {
  constructor(typeCphone) {
    super();
    this.type = typeCphone.type;
  }
}

class TypeCPhone {
  constructor() {
    this.type = 2;
  }

  getType() {
    console.log(this.type);
  }
}

const runAdapter = () => {
  const typeCphone = new TypeCPhone();
  const adapter = new EarPhoneAdapter(typeCphone);
  adapter.getType();
};

// runAdapter();
/** ************************************************************ */


/** Bridge - allows two components, a client and a service, to work together with each component having its own interface */
// input devices

class Gestures {
  constructor(output) {
    this.output = output;

    this.tap = function () { this.output.click(); };
    this.swipe = function () { this.output.move(); };
    this.pan = function () { this.output.drag(); };
    this.pinch = function () { this.output.zoom(); };
  }
}

class Mouse {
  constructor(output) {
    this.output = output;

    this.click = function () { this.output.click(); };
    this.move = function () { this.output.move(); };
    this.down = function () { this.output.drag(); };
    this.wheel = function () { this.output.zoom(); };
  }
}

// output devices
class Screen {
  constructor() {
    this.click = function () { console.log('Screen select'); };
    this.move = function () { console.log('Screen move'); };
    this.drag = function () { console.log('Screen drag'); };
    this.zoom = function () { console.log('Screen zoom in'); };
  }
}

class Audio {
  constructor() {
    this.click = function () { console.log('Sound oink'); };
    this.move = function () { console.log('Sound waves'); };
    this.drag = function () { console.log('Sound screetch'); };
    this.zoom = function () { console.log('Sound volume up'); };
  }
}

const runBridge = () => {
  const screen = new Screen();
  const audio = new Audio();

  const hand = new Gestures(screen);
  const mouse = new Mouse(audio);

  hand.tap();
  hand.swipe();
  hand.pinch();

  mouse.click();
  mouse.move();
  mouse.wheel();
};

// runBridge();
/** ************************************************************ */

/** Composite - allows the creation of objects with properties that are primitive items or a collection of objects. Each item in the collection can hold other collections themselves, creating deeply nested structures */

// Component
class Employers {
  constructor(name, position, progress) {
    this.name = name;
    this.position = position;
    this.progress = progress;
  }

  // eslint-disable-next-line class-methods-use-this
  getProgress() {}
}

// Leaf subclass
class Developers extends Employers {
  getProgress() {
    return this.progress;
  }
}

// Leaf subclass
class FreeLanceDev extends Employers {
  getProgress() {
    return this.progress;
  }
}

// Composite subclass
class DevTeamLead extends Employers {
  constructor(name, position) {
    super(name, position);
    this.teamMembers = [];
  }

  addMember(employee) {
    this.teamMembers.push(employee);
  }

  removeMember(employee) {
    for (let i = 0; i < this.teamMembers.length; i += 1) {
      if (this.teamMembers[i] === employee) {
        this.teamMembers.splice(i, 1);
      }
    }
    return this.teamMembers;
  }

  getProgress() {
    for (let i = 0; i < this.teamMembers.length; i += 1) {
      console.log(this.teamMembers[i].getProgress());
    }
  }

  showTeam() {
    for (let i = 0; i < this.teamMembers.length; i += 1) {
      console.log(this.teamMembers[i].name);
    }
  }
}

const runComposite = () => {
  const seniorDev = new Developers('Rachel', 'Senior Developer', '60%');
  const juniorDev = new Developers('Joey', 'Junior Developer', '50%');
  const teamLead = new DevTeamLead('Regina', 'Dev Team Lead', '90%');
  const freelanceDev = new FreeLanceDev('John', 'Freelance Developer', '80%');
  teamLead.addMember(seniorDev);
  teamLead.addMember(juniorDev);
  teamLead.addMember(freelanceDev);

  console.log('Team members list:');
  teamLead.showTeam();

  console.log('Get Team members progress:');
  teamLead.getProgress();

  console.log('Removing Rachel from team:');
  teamLead.removeMember(seniorDev);

  console.log('Updated team members list:');
  teamLead.showTeam();

  console.log("Get freelance developer's progress:");
  console.log(freelanceDev.getProgress());
};

// runComposite();
/** ************************************************************ */

/** Decorator - allows to add new functionality to an existing object without altering its structure */
class User {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`User: ${this.name}`);
  }
}

class DecoratedUser {
  constructor(user, street, city) {
    this.user = user;
    this.name = user.name; // ensures interface stays the same
    this.street = street;
    this.city = city;
  }

  say() {
    console.log(`Decorated User: ${this.name}, ${this.street}, ${this.city}`);
  }
}

const runDecorator = () => {
  const user = new User('Kelly');
  user.say();
  const decorated = new DecoratedUser(user, 'Broadway', 'New York');
  decorated.say();
};

// runDecorator();
/** ************************************************************ */

/** Facade - allows to hide the complexity of a subsystem and provide a simplified interface to the client */
class Mortgage {
  constructor({
    name, BankClass, CreditClass, BackgroundClass,
  }) {
    this.name = name;
    this.bank = new BankClass();
    this.credit = new CreditClass();
    this.background = new BackgroundClass();

    this.applyFor = (amount) => {
      // access multiple subsystems...
      const result = (
        !this.bank.verify(this.name, amount)
        || !this.credit.get(this.name)
        || !this.background.check(this.name)
      ) ? 'denied' : 'approved';

      return `${this.name} has been ${result} for a ${amount} mortgage`;
    };
  }
}

class Bank {
  verify(name, amount) {
    // complex logic ...
    return true;
  }
}

class Credit {
  constructor() {
    this.get = function (name) {
      // complex logic ...
      return true;
    };
  }
}

class Background {
  constructor() {
    this.check = function (name) {
      // complex logic ...
      return false;
    };
  }
}

const runFacade = () => {
  const mortgage = new Mortgage({
    name: 'Joan Templeton',
    BankClass: Bank,
    CreditClass: Credit,
    BackgroundClass: Background,
  });
  const result = mortgage.applyFor('$100,000');

  console.log(result);
};

// runFacade();
/** ************************************************************ */

/** Flyweight - allows to reduce memory footprint by sharing common data between many objects */

class Flyweight {
  constructor(make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
  }
}

class FlyWeightFactory {
  constructor() {
    this.flyweights = {};

    if (typeof FlyWeightFactory.instance === 'object') return FlyWeightFactory.instance;
    FlyWeightFactory.instance = this;
    return FlyWeightFactory.instance;
  }

  get(make, model, processor) {
    const key = `${make}-${model}-${processor}`;
    if (!this.flyweights[key]) this.flyweights[key] = new Flyweight(make, model, processor);
    return this.flyweights[key];
  }

  getCount() {
    return Object.keys(this.flyweights).length;
  }
}

class ComputerCollection {
  constructor(ComputerClass) {
    this.Computer = ComputerClass;
    this.computers = {};
    this.count = 0;

    this.add = (make, model, processor, memory, tag) => {
      this.computers[tag] = new this.Computer(make, model, processor, memory, tag);
      this.count += 1;
    };

    this.get = (tag) => this.computers[tag];
    this.getCount = () => this.count;
  }
}

class Computer {
  constructor(make, model, processor, memory, tag) {
    this.flyweight = new FlyWeightFactory().get(make, model, processor);
    this.memory = memory;
    this.tag = tag;
    this.getMake = () => this.flyweight.make;
  }
}

const runFlyweight = () => {
  const computers = new ComputerCollection(Computer);

  computers.add('Dell', 'Studio XPS', 'Intel', '5G', 'Y755P');
  computers.add('Dell', 'Studio XPS', 'Intel', '6G', 'X997T');
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'U8U80');
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'NT777');
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', '0J88A');
  computers.add('HP', 'Envy', 'Intel', '4G', 'CNU883701');
  computers.add('HP', 'Envy', 'Intel', '2G', 'TXU003283');

  console.log(`Computers: ${computers.getCount()}`);
  console.log(`Flyweights: ${new FlyWeightFactory().getCount()}`);
};

// runFlyweight();
/** ************************************************************ */

/** Proxy - allows to intercept and control access to certain operations */
class GeoCoder {
  constructor() {
    this.coords = {
      Amsterdam: '52.3700° N, 4.8900° E',
      London: '51.5171° N, 0.1062° W',
      Paris: '48.8567° N, 2.3508° E',
      'New York': '40.7128° N, 74.0060° W',
      Sydney: '33.8683° S, 151.2086° E',
      'Cape Town': '-33.9249° S, 18.4241° E',
      Berlin: '52.5233° N, 13.4127° E',
    };
    this.getLatLng = (address = '') => this.coords[address] || 'not found';
  }
}

class GeoProxy {
  constructor() {
    this.geoCoder = new GeoCoder();
    this.cache = {};

    this.getLatLng = (address) => {
      if (this.cache[address]) return this.cache[address];

      const result = this.geoCoder.getLatLng(address);
      this.cache[address] = result;
      return result;
    };
    this.getCount = () => Object.keys(this.cache).length;
  }
}

const runProxy = () => {
  const geo = new GeoProxy();

  // geolocation requests
  geo.getLatLng('Paris');
  geo.getLatLng('London');
  geo.getLatLng('London');
  geo.getLatLng('London');
  geo.getLatLng('London');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('London');
  geo.getLatLng('London');

  console.log(`\nCache size: ${geo.getCount()}`);
};

// runProxy();
/** ************************************************************ */

/** Chain of Responsibility - allows to pass a request along a chain of handlers until one of them can handle the request */
class Request {
  constructor(amount) {
    this.amount = amount;
    console.log(`Requested: $${amount}\n`);
  }

  get(bill) {
    const count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    console.log(`Dispense ${count} $${bill} bills`);
    return this;
  }

  add(sum) {
    this.amount += sum;
    return this;
  }
}

const runChain = () => {
  const request = new Request(378);
  request
    .get(100)
    .get(50)
    .get(20)
    .get(10)
    .add(200)
    .get(77)
    .get(5)
    .get(1);
};

// runChain();
/** ************************************************************ */

/** Command - allows to execute an operation at a later time */

const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const mul = (x, y) => x * y;
const div = (x, y) => x / y;

class Command {
  constructor(execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
  }
}

const AddCommand = (value) => new Command(add, sub, value);

const SubCommand = (value) => new Command(sub, add, value);

const MulCommand = (value) => new Command(mul, div, value);

const DivCommand = (value) => new Command(div, mul, value);

class Calculator {
  constructor() {
    this.current = 0;
    this.commands = [];

    this.action = (command) => {
      const name = command.execute.toString().substr(9, 3);
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
    this.execute = (command) => {
      this.commands.push(command);
      this.current = command.execute(this.current, command.value);
      console.log(`${this.action(command)}: ${command.value}`);
    };
    this.undo = () => {
      const command = this.commands.pop();
      this.current = command.undo(this.current, command.value);
      console.log(`Undo ${this.action(command)}: ${command.value}`);
    };
    this.getCurrentValue = () => this.current;
  }

  static hello = () => console.log('Hello, World!');
}

const runCommand = () => {
  const calculator = new Calculator();
  console.log(Calculator.hello());

  // issue commands
  calculator.execute(AddCommand(100));
  calculator.execute(SubCommand(24));
  calculator.execute(MulCommand(6));
  calculator.execute(DivCommand(2));
  calculator.execute(AddCommand(300));

  // reverse last two commands
  calculator.undo();
  calculator.undo();

  console.log(`\nValue: ${calculator.getCurrentValue()}`);
};

// runCommand();
/** ************************************************************ */

/** Interpreter - allows to interpret a string as a sequence of commands */
class Context {
  constructor(input) {
    this.input = input;
    this.output = 0;
  }

  startsWith(str) {
    return this.input.substr(0, str.length) === str;
  }
}

class Expression {
  constructor(name, one, four, five, nine, multiplier) {
    this.name = name;
    this.one = one;
    this.four = four;
    this.five = five;
    this.nine = nine;
    this.multiplier = multiplier;
  }

  operate(context, outNum, inNum) {
    context.output += (outNum * this.multiplier);
    context.input = context.input.substr(inNum);
    return context;
  }

  interpret(context) {
    switch (true) {
      case context.input.length === 0:
        return;
      case context.startsWith(this.nine):
        this.operate(context, 9, 2);
        break;
      case context.startsWith(this.four):
        this.operate(context, 4, 2);
        break;
      case context.startsWith(this.five):
        this.operate(context, 5, 1);
        break;
      default: /** nothing to do ... */
    }

    while (context.startsWith(this.one)) {
      context.output += (1 * this.multiplier);
      context.input = context.input.substr(1);
    }
  }
}

const runInterpreter = () => {
  const roman = 'MCMXXVIIIII';
  const context = new Context(roman);
  const tree = [];

  tree.push(new Expression('thousand', 'M', ' ', ' ', ' ', 1000));
  tree.push(new Expression('hundred', 'C', 'CD', 'D', 'CM', 100));
  tree.push(new Expression('ten', 'X', 'XL', 'L', 'XC', 10));
  tree.push(new Expression('one', 'I', 'IV', 'V', 'IX', 1));

  for (let i = 0; i < tree.length; i += 1) tree[i].interpret(context);

  console.log(`${roman} = ${context.output}`);
};

// runInterpreter();
/** ************************************************************ */

/** Iterator - allows to iterate over a collection */
class Iterator {
  constructor(items) {
    this.index = 0;
    this.items = items;
  }

  first() {
    this.reset();
    return this.next();
  }

  next() {
    this.index += 1;
    return this.items[this.index];
  }

  hasNext() {
    return this.index <= this.items.length - 1;
  }

  reset() {
    this.index = 0;
  }

  each(func) {
    for (let item = this.first(); this.hasNext(); item = this.next()) {
      if (func && item) func(item);
    }
  }
}


const runIterator = () => {
  const items = ['one', 2, 'circle', true, 'Applepie'];
  const iter = new Iterator(items);

  // using for loop
  for (let item = iter.first(); iter.hasNext(); item = iter.next()) {
    console.log(item);
  }
  console.log('\n');

  // using Iterator's each method
  iter.each((item) => console.log(item));
};

// runIterator();
/** ************************************************************ */

/** Mediator - allows to communicate between objects without knowledge of their implementation */
class Participant {
  constructor(name) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} ${time}`;
    this.name = name || `Anonymous_${dateTime}`;
    this.chatroom = null;
  }

  send(message, to) {
    this.chatroom.send(message, this, to);
  }

  receive(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

class Chatroom {
  constructor() {
    this.participants = {};

    this.register = (participant) => {
      const { name } = participant;
      this.participants[name] = participant;
      // eslint-disable-next-line no-param-reassign
      participant.chatroom = this;
    };

    this.send = (message, from, to) => {
      if (to) to.receive(message, from); // single message
      else { // broadcast message
        const keysArr = Object.keys(this.participants);

        keysArr.forEach((key) => {
          if (this.participants[key] !== from) this.participants[key].receive(message, from);
        });
      }
    };
  }
}

const runMediator = () => {
  const yoko = new Participant('Yoko');
  const john = new Participant('John');
  const paul = new Participant('Paul');
  const ringo = new Participant('Ringo');
  const anon = new Participant();

  const chatroom = new Chatroom();
  chatroom.register(yoko);
  chatroom.register(john);
  chatroom.register(paul);
  chatroom.register(ringo);
  chatroom.register(anon);

  yoko.send('All you need is love.');
  yoko.send('I love you John.');
  john.send('Hey, no need to broadcast', yoko);
  paul.send('Ha, I heard that!');
  ringo.send('Paul, what do you think?', paul);
  anon.send('It is raining now((');
};

// runMediator();
/** ************************************************************ */

/** Memento - allows to save and restore the state of an object */
class Person {
  constructor(name, street, city, state) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
  }

  hydrate() {
    return JSON.stringify(this);
  }

  dehydrate(memento) {
    if (memento) {
      const data = JSON.parse(memento);
      lodash.each(data, (val, prop) => {
        this[prop] = val;
      });
    }
  }
}

class CareTaker {
  constructor() {
    this.mementos = {};

    this.add = (memento) => {
      const key = Object.keys(this.mementos).length;
      this.mementos[key] = memento;
      return key;
    };

    this.get = (key) => this.mementos[key];
  }
}

function runMemento() {
  const mike = new Person('Mike Foley', '1112 Main', 'Dallas', 'TX');
  const john = new Person('John Wang', '48th Street', 'San Jose', 'CA');
  const caretaker = new CareTaker();

  // save state
  const mikeKey = caretaker.add(mike.hydrate());
  const johnKey = caretaker.add(john.hydrate());

  // mess up their names
  mike.name = 'King Kong';
  john.name = 'Superman';

  // restore original state
  mike.dehydrate(caretaker.get(mikeKey));
  john.dehydrate(caretaker.get(johnKey));

  console.log(mike.name);
  console.log(john.name);
}

// runMemento();
/** ************************************************************ */

/** Observer - allows to notify other objects about changes in the object */
class Click {
  constructor() {
    this.handlers = []; // observers
  }

  subscribe(fn) {
    this.handlers.push(fn);
  }

  unsubscribe(fn) {
    this.handlers = this.handlers.filter((item) => item !== fn);
  }

  fire(o, thisObj) {
    const scope = thisObj;
    this.handlers.forEach((item) => item.call(scope, o));
  }
}

const runObserver = () => {
  const clickHandler = (item) => console.log(`fired: ${item}`);
  const click = new Click();

  click.subscribe(clickHandler);
  click.fire('event #1');
  click.unsubscribe(clickHandler);
  click.fire('event #2');
  click.subscribe(clickHandler);
  click.fire('event #3');
};

// runObserver();
/** ************************************************************ */

/** State - provides state-specific logic to a limited set of objects in which each object represents a particular state */
// eslint-disable-next-line no-promise-executor-return
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Yellow {
  constructor(light) {
    this.light = light;

    this.go = async () => {
      console.log('Yellow --> for 10 seconds');
      await timeout(5000);
      light.change(new Red(light));
    };
  }
}

class Green {
  constructor(light) {
    this.light = light;

    this.go = async () => {
      console.log('Green --> for 1 minute');
      await timeout(10000);
      light.change(new Yellow(light));
    };
  }
}

class Red {
  constructor(light) {
    this.light = light;

    this.go = async () => {
      console.log('Red --> for 1 minute');
      await timeout(10000);
      light.change(new Green(light));
    };
  }
}



class TrafficLight {
  constructor() {
    this.count = 0;
    this.currentState = new Red(this);

    this.change = (state) => {
      this.count += 1;

      // limits number of changes
      if (this.count >= 10) return;
      this.currentState = state;
      this.currentState.go();
    };

    this.start = () => this.currentState.go();
  }
}

const runState = () => {
  const light = new TrafficLight();
  light.start();
};

// runState();
/** ************************************************************ */

/** Strategy - encapsulates alternative algorithms (or strategies) for a particular task */
class Shipping {
  constructor() {
    this.company = '';
  }

  setStrategy(company) {
    this.company = company;
  }

  calculate(pack) {
    return this.company.calculate(pack);
  }
}

class DeliveryCompanies {
  constructor() {
    this.ups = '$45.95';
    this.usps = '$39.40';
    this.fedex = '$43.75';
  }

  calculate(packName) {
    if (!this[packName]) throw new Error(`Package not provided with name ${packName}`);
    return this[packName];
  }
}

const runStrategy = () => {
  let compName = 'fedex';
  const shipping = new Shipping();
  const delivery = new DeliveryCompanies();

  shipping.setStrategy(delivery);
  console.log(`${compName} Strategy: ${shipping.calculate(compName)}`);
  compName = 'ups';
  console.log(`${compName} Strategy: ${shipping.calculate(compName)}`);
  compName = 'usps';
  console.log(`${compName} Strategy: ${shipping.calculate(compName)}`);
  compName = null;
  console.log(`${compName} Strategy: ${shipping.calculate(compName)}`);
};

// runStrategy();
/** ************************************************************ */

/** Template Method - defines the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure. */
class AbstractClass {
  constructor() {
    this.templateMethod = () => {
      this.connect();
      this.getData();
      this.closeConn();
    };
  }

  connect() {
    throw new Error('You must implement this method');
  }

  getData() {
    throw new Error('You must implement this method');
  }

  closeConn() {
    throw new Error('You must implement this method');
  }
}

class DbConnection extends AbstractClass {
  constructor(db) {
    super();
    this.db = db;
  }

  connect() {
    console.log(`Connecting to ${this.db}`);
  }

  getData() {
    console.log(`Getting data from ${this.db}`);
  }

  closeConn() {
    console.log(`Closing connection to ${this.db}`);
  }
}

const runTemplateMethod = () => {
  const db = new DbConnection('MySQL');
  db.templateMethod();

  const db2 = new DbConnection('MongoDB');
  db2.templateMethod();

  const db3 = new DbConnection('PostgreSQL');
  db3.templateMethod();
};

// runTemplateMethod();
/** ************************************************************ */

/** Visitor - defines a new operation to a collection of objects without changing the objects themselves */
class EmployeeVisitor {
  constructor(name, salary, vacation) {
    this.name = name;
    this.salary = salary;
    this.vacation = vacation;

    this.accept = (visitor) => visitor(this);
    this.getName = () => this.name;
    this.getSalary = () => this.salary;
    // eslint-disable-next-line no-return-assign
    this.setSalary = (newSalary) => this.salary = newSalary;
    this.getVacation = () => this.vacation;
    // eslint-disable-next-line no-return-assign
    this.setVacation = (newVacation) => this.vacation = newVacation;
  }
}

const extraSalary = (emp) => emp.setSalary(emp.getSalary() * 1.1);
const extraVacation = (emp) => emp.setVacation(emp.getVacation() + 3);

const runVisitor = () => {
  const employees = [
    new EmployeeVisitor('John', 10000, 10),
    new EmployeeVisitor('Mary', 20000, 21),
    new EmployeeVisitor('Boss', 250000, 51),
  ];

  for (let i = 0; i < employees.length; i += 1) {
    const emp = employees[i];

    emp.accept(extraSalary);
    emp.accept(extraVacation);
    console.log(`${emp.getName()}: $${emp.getSalary()} and ${emp.getVacation()} vacation days`);
  }
};

// runVisitor();
/** ************************************************************ */

