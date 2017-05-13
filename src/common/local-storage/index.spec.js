import * as sut from './index';

describe('local storage', () => {
    let localStorage;

    beforeEach(() => {
        localStorage = {
            setItem: jest.fn(),
            removeItem: jest.fn(),
            getItem: jest.fn(),
            clear: jest.fn()
        };
    });

    it('should throw if not supported', () => {
        global.localStorage = undefined;

        expect(() => {
            sut.get('testItem');
        }).toThrow(Error);
    });

    describe('local storage supported', () => {
        beforeEach(() => {
            global.localStorage = localStorage;
        });

        describe('set method', () => {
            it('should set value to local storage', () => {
                sut.set('testName', 'TestValue');

                expect(localStorage.setItem).toHaveBeenCalledWith('testName', '"TestValue"');
            });

            it('should remove if value not passed', () => {
                sut.set('testName');

                expect(localStorage.removeItem).toHaveBeenCalledWith('testName');
            });
        });

        describe('get value', () => {
            it('should return value', () => {
                localStorage.getItem.mockReturnValue('"TestValue"');

                expect(sut.get('testName', 'testDefault')).toEqual('TestValue');
            });

            it('should return default value if wasn\'t set', () => {
                expect(sut.get('testName', 'testDefault')).toEqual('testDefault');
            });

            it('should return value if can\'t be parsed', () => {
                localStorage.getItem.mockReturnValue('TestValue');

                expect(sut.get('testName', 'testDefault')).toEqual('TestValue');
            });
        });

        describe('has method', () => {
            it('should return if has value', () => {
                localStorage.getItem.mockReturnValue('"TestValue"');

                expect(sut.has('testName')).toEqual(true);
            });
        });

        describe('remove method', () => {
            it('should remove value', () => {
                sut.remove('testName');

                expect(localStorage.removeItem).toHaveBeenCalledWith('testName');
            });
        });

        describe('clear method', () => {
            it('should clear all values', () => {
                sut.clear();

                expect(localStorage.clear).toHaveBeenCalled();
            });
        });
    });
});
