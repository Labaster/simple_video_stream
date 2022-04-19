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