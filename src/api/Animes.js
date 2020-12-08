import { useReducer, useEffect } from 'react';
import Api from './index';
import Actions from './actions';
import { reducer } from './reducer';

const useAnimes = () => {
    const [state, dispatch] = useReducer(reducer, {
        data: [],
        loading: true,
        error: false,
    });

    useEffect(() => {
        dispatch({ type: Actions.MAKE_REQUEST });
        Api({
            method: 'get',
            url: `todos`,
        })
            .then((data) => {
                console.log(data);
                dispatch({
                    type: Actions.GET_DATA,
                    payload: {
                        data: data.data.data,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: Actions.ERROR,
                    payload: {
                        error: error.response,
                    },
                });
            });
    }, []);

    return state;
};

export default useAnimes;
