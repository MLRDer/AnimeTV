import Actions from './actions';

export default (state, action) => {
    switch (action.type) {
        case Actions.MAKE_REQUEST:
            return Object.assign(state, { loading: true });

        case Actions.GET_DATA:
            return Object.assign({
                loading: false,
                data: action.payload.data,
                error: false,
            });

        case Actions.ERROR:
            return Object.assign({
                loading: false,
                error: action.payload.error,
            });

        default:
            return state;
    }
};
