import Actions from './actions';
export const reducer = (state, action) => {
    switch (action.type) {
        case Actions.MAKE_REQUEST:
            return {
                data: false,
                loading: true,
            };

        case Actions.GET_DATA:
            return { loading: false, data: action.payload.data, error: false };

        case Actions.ERROR:
            return {
                data: false,
                loading: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
};
