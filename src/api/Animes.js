import { useReducer, useEffect } from 'react';
import api from './index';
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
        api.get('todos')
            .then((data) => {
                // console.log('DATA: ', data.data);
                dispatch({
                    type: Actions.GET_DATA,
                    payload: {
                        data: data.data,
                    },
                });
            })
            .catch((error) => {
                console.log('ERROR: '.error);
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
