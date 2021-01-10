import axios from 'axios';
import baseURL from './constants';
import _ from 'lodash';
import Axios from 'axios';

const api = axios.create({ baseURL: baseURL.baseURL });

class Api {
    constructor(stateCallback, source, filters) {
        this.stateCallback = stateCallback;
        this.filters = filters;
        this.api = api;
        this.source = source ? source : Axios.CancelToken.source();
    }

    getAll = (loading = true) => {
        this.stateCallback({
            loading,
        });

        this.api
            .get('animes', {
                params: this.filters,
                cancelToken: this.source.token,
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
                console.log('ERROR: ', error);
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
            .get(`animes/${id}/episodes`, {
                cancelToken: this.source.token,
            })
            .then((data) => {
                this.stateCallback({
                    loading: false,
                    data: data.data.data,
                });
            })
            .catch((error) => {
                console.log('ERROR: ', error);
                this.stateCallback({
                    loading: false,
                    error: error.responce,
                });
            });
    };

    getHome = (loading = true) => {
        loading &&
            this.stateCallback({
                loading,
            });

        this.api
            .get('animes/home', {
                cancelToken: this.source.token,
            })
            .then(({ data: { data } }) => {
                this.stateCallback({
                    loading: false,
                    data,
                });
            })
            .catch((error) => {
                console.log('ERROR: ', error);
                this.stateCallback({
                    loading: false,
                    error: error.responce,
                });
            });
    };

    getCollection = (id) => {
        this.stateCallback({
            loading: true,
        });

        this.api
            .get(`collections/${id}`, {
                cancelToken: this.source.token,
            })
            .then((data) => {
                this.stateCallback({
                    loading: false,
                    data: data.data.data,
                });
            })
            .catch((error) => {
                console.log('ERROR: ', error);
                this.stateCallback({
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
            .get(`animes/search`, {
                params: {
                    search: term,
                },
                cancelToken: this.source.token,
            })
            .then(({ data }) => {
                this.stateCallback({
                    loading: false,
                    data: _.chunk(data, 4).map((el) =>
                        _.zipObject(['data'], [el])
                    ),
                });
            })
            .catch((error) => {
                console.log('ERROR: ', error);
                this.stateCallback({
                    loading: false,
                    error: error.responce,
                });
            });
    };
}

export default Api;

export const sendReport = (movieId, episodeId, sourceId, error) => {
    api.post(`errors`, {
        movieId,
        episodeId,
        sourceId,
        error,
    }).catch((error) => {
        console.log('ERROR: ', error);
    });
};
