import axios from 'axios';
import baseURL from './constants';
import _ from 'lodash';

class Anime {
    constructor(stateCallback, secondStateCallback) {
        this.stateCallback = stateCallback;
        this.secondStateCallback = secondStateCallback;
        this.api = axios.create({ baseURL: baseURL.baseURL });
    }

    getAll = (params, loading = true) => {
        loading &&
            this.stateCallback({
                loading: true,
            });

        this.api
            .get('animes', {
                params,
            })
            .then(({ data: { data } }) => {
                this.stateCallback({
                    loading: false,
                    data: _.chunk(data, 4).map((el) =>
                        _.zipObject(['data'], [el])
                    ),
                });
            })
            .catch((error) => {
                console.log('ERROR: '.error);
                this.stateCallback({
                    loading: false,
                    error: error.responce,
                });
            });
    };

    getEpisodes = (id) => {
        this.stateCallback({
            loading: true,
        });

        this.api
            .get(`animes/${id}/episodes`)
            .then((data) => {
                this.stateCallback({
                    loading: false,
                    data: data.data.data,
                });
            })
            .catch((error) => {
                console.log('ERROR: '.error);
                this.stateCallback({
                    loading: false,
                    error: error.responce,
                });
            });
    };

    getCardStack = (loading = true) => {
        loading &&
            this.stateCallback({
                loading: true,
            });

        this.api
            .get('animes/card')
            .then(({ data: { data } }) => {
                this.secondStateCallback({
                    loading: false,
                    data,
                });
            })
            .catch((error) => {
                console.log('ERROR: '.error);
                this.secondStateCallback({
                    loading: false,
                    error: error.responce,
                });
            });
    };

    search = (term) => {
        this.stateCallback({
            loading: true,
        });

        this.api
            .get(`animes/search?search=${term}`)
            .then(({ data }) => {
                this.stateCallback({
                    loading: false,
                    data: _.chunk(data, 4).map((el) =>
                        _.zipObject(['data'], [el])
                    ),
                });
            })
            .catch((error) => {
                console.log('ERROR: '.error);
                this.stateCallback({
                    loading: false,
                    error: error.responce,
                });
            });
    };
}

export default Anime;
