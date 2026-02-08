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

describe('Character methods: damage(points)', () => {
    test('should reduce health by formula and return undefined', () => {
        const hero = new Swordsman('Arthur'); // defence = 10

        const result = hero.damage(10); // 100 - 10 * (1 - 0.1) = 91
        expect(result).toBeUndefined();
        expect(hero.health).toBe(91);
    });

    test('should clamp health to 0 if damage is too big', () => {
        const hero = new Undead('Bones'); // defence = 25

        hero.damage(200); // 100 - 200*(1-0.25)=100-150=-50 -> 0
        expect(hero.health).toBe(0);
    });

    test('should do nothing if character already dead', () => {
        const hero = new Undead('Bones');
        hero.health = 0;

        hero.damage(10);
        expect(hero.health).toBe(0);
    });
});

describe('Character methods: levelUp()', () => {
    test('should increase level, boost stats and restore health to 100', () => {
        const hero = new Bowerman('Robin'); // 25/25

        hero.damage(50);
        expect(hero.health).toBe(62.5);

        hero.levelUp();

        expect(hero.level).toBe(2);
        expect(hero.attack).toBe(30);
        expect(hero.defence).toBe(30);
        expect(hero.health).toBe(100);
    });

    test('should throw if character is dead', () => {
        const hero = new Zombie('Ghoul');
        hero.health = 0;

        expect(() => hero.levelUp()).toThrow();
    });
});
