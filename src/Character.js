export default class Character {
    constructor(name, type) {
        const allowedTypes = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];

        if (typeof name !== 'string') {
            throw new Error('Name must be a string');
        }

        if (name.length < 2 || name.length > 10) {
            throw new Error('Name length must be between 2 and 10');
        }

        if (!allowedTypes.includes(type)) {
            throw new Error('Invalid type');
        }

        this.name = name;
        this.type = type;
        this.health = 100;
        this.level = 1;
        this.attack = 0;
        this.defence = 0;
    }
}
