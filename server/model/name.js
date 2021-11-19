// require name data from data file
const namesData = require('../data')
// const formData

class Name {
    constructor(data) {
        this.id = data.id;
        this.fname = data.fname;
        this.sname = data.sname;
    }

    static get all(){
        const names = namesData.map((name)=> new Name(name));
        return names;
    }

    static create(name){
        const newNameId = namesData.length + 1;
        const newName = new Name({id: newNameId, ...name});
        namesData.push(newName);
        return newName;
    }

    static delete(delNameId){
        const delName = delete Name({id: delNameId, ...name});
        namesData.pop(delName);
        return delName;
    }
}

module.exports = Name;