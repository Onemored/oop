describe('src/index.js', () => {
    test('should run entry and log created hero', async () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => { });

        // гарантируем, что модуль выполнится в этом тесте
        jest.resetModules();
        await import('../src/index.js');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0]).toMatchObject({
            name: 'Robin',
            type: 'Bowman',
            health: 100,
            level: 1,
            attack: 25,
            defence: 25,
        });

        spy.mockRestore();
    });
});
