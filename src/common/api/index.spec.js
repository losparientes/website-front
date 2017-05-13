import sut from './index';

jest.mock('../local-storage', () => ({
    get: jest.fn(() => 'authToken')
}));

describe('app: common: api', () => {
    let fetchResult;
    const commonHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    beforeEach(() => {
        global.fetch = jest.fn().mockReturnValue(Promise.resolve());
    });

    describe('api', () => {
        let url;
        let options;

        beforeEach(() => {
            url = '/urlToCall';
            process.env.API_BASE_URL = 'baseUrl';
            options = {};
        });

        it('should prefix url with base api url when pass url as context', () => {
            sut(url, options);

            expect(fetch).toHaveBeenCalledWith('baseUrl/urlToCall', expect.any(Object));
        });

        it('should be possible to call api wihout option parameter', () => {
            sut(url);

            expect(fetch).toHaveBeenCalled();
        });

        describe('headers', () => {
            let settings;

            beforeEach(() => {
                settings = {
                    ...options,
                    headers: commonHeaders
                };
            });

            it('should add common headers', () => {
                sut(url, options);
                expect(fetch.mock.calls[0][1]).toMatchObject(settings);
            });

            it('should disable cors', () => {
                sut(url, options);
                expect(fetch.mock.calls[0][1]).toMatchObject({ mode: 'same-origin' });
            });
        });

        describe('when token exists', () => {
            const settings = {
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer authToken'
                }
            };

            beforeEach(() => {
                sut(url, options);
            });

            it('should add authorisation token', () => {
                expect(fetch.mock.calls[0][1]).toMatchObject(settings);
            });
        });

        describe('when fetch data fail', () => {
            let failCb;

            beforeEach(() => {
                failCb = jest.fn();
                fetchResult = {
                    response: {
                        status: 404,
                        statusText: 'error'
                    }
                };
                global.fetch.mockReturnValue(Promise.reject(fetchResult));
            });

            it('should delegate error outside otherwise', async () => {
                await sut(url, options).catch(failCb);

                expect(failCb).toHaveBeenCalledWith(fetchResult);
            });
        });

        describe('when fetch data success', () => {
            let result;

            beforeEach(() => {
                result = {};
                fetchResult = {
                    status: 200,
                    json: jest.fn(() => result)
                };
                global.fetch.mockReturnValue(Promise.resolve(fetchResult));
            });

            it('should parse response', async () => {
                await sut(url, options);
                expect(fetchResult.json).toHaveBeenCalled();
            });

            it('should return parsed response', async () => {
                expect(await sut(url, options)).toEqual(result);
            });
        });
    });
});
