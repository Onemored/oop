import Character from '../src/Character';
import Bowerman from '../src/Bowerman';
import Swordsman from '../src/Swordsman';
import Magician from '../src/Magician';
import Daemon from '../src/Daemon';
import Undead from '../src/Undead';
import Zombie from '../src/Zombie';

describe('Character validation', () => {
    test('should create Character with valid name/type and defaults', () => {
        const hero = new Character('Robin', 'Bowman');

        expect(hero).toEqual({
            name: 'Robin',
            type: 'Bowman',
            health: 100,
            level: 1,
            attack: 0,
            defence: 0,
        });
    });

    test.each([
        ['name is not string', 123, 'Bowman'],
        ['name too short', 'A', 'Bowman'],
        ['name too long', 'ABCDEFGHIJK', 'Bowman'], // 11 chars
    ])('should throw on invalid name: %s', (_title, name, type) => {
        expect(() => new Character(name, type)).toThrow();
    });

    test('should throw on invalid type', () => {
        expect(() => new Character('Robin', 'Archer')).toThrow();
    });
});

describe('Derived classes stats', () => {
    test('Bowerman', () => {
        const hero = new Bowerman('Robin');
        expect(hero).toMatchObject({
            name: 'Robin',
            type: 'Bowman',
            health: 100,
            level: 1,
            attack: 25,
            defence: 25,
        });
    });

    test('Swordsman', () => {
        const hero = new Swordsman('Arthur');
        expect(hero).toMatchObject({
            name: 'Arthur',
            type: 'Swordsman',
            health: 100,
            level: 1,
            attack: 40,
            defence: 10,
        });
    });

    test('Magician', () => {
        const hero = new Magician('Merlin');
        expect(hero).toMatchObject({
            name: 'Merlin',
            type: 'Magician',
            health: 100,
            level: 1,
            attack: 10,
            defence: 40,
        });
    });

    test('Daemon', () => {
        const hero = new Daemon('Azazel');
        expect(hero).toMatchObject({
            name: 'Azazel',
            type: 'Daemon',
            health: 100,
            level: 1,
            attack: 10,
            defence: 40,
        });
    });

    test('Undead', () => {
        const hero = new Undead('Bones');
        expect(hero).toMatchObject({
            name: 'Bones',
            type: 'Undead',
            health: 100,
            level: 1,
            attack: 25,
            defence: 25,
        });
    });

    test('Zombie', () => {
        const hero = new Zombie('Ghoul');
        expect(hero).toMatchObject({
            name: 'Ghoul',
            type: 'Zombie',
            health: 100,
            level: 1,
            attack: 40,
            defence: 10,
        });
    });

    test('Derived class should also validate name via Character', () => {
        expect(() => new Bowerman('A')).toThrow();
    });
});
