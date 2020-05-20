module.exports = {
    USER: {
        CREATE_USER: {
            URL: '/users',
            METHOD: 'POST'
        },
        UPDATE_USER: {
            URL: '/users/:id',
            METHOD: 'PUT'
        },
        GET_ALL_USERS: {
            URL: '/users',
            METHOD: 'GET'
        },
        GET_USER_BY_ID: {
            URL: '/users/:id',
            METHOD: 'GET'
        },
        SEARCH_API: {
            URL: '/typeahead/:input',
            METHOD: 'GET'
        },
        DELETE_USER: {
            URL: '/users/:id',
            METHOD: 'PUT'
        }
    }
}
