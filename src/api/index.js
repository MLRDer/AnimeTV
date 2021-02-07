import axios from 'axios';
import baseURL from './constants';
import _ from 'lodash';

const api = axios.create({ baseURL: baseURL.baseURL });

class Api {
    constructor(stateCallback, source, filters) {
        this.stateCallback = stateCallback;
        this.filters = filters;
        this.api = api;
        this.source = source ? source : axios.CancelToken.source();
    }

    addAds(data) {
        let four = true;
        const newArr = [];
        while (data.length) {
            const limit = four ? 4 : 6;
            let row = data.splice(0, limit);
            row.push({
                ad: true,
                _id: `ad-poster-${Math.random() * 1000}`,
            });
            newArr.push(row);
            four = !four;
        }

        return _.flatten(newArr);
    }

    getAll = (filters, more = false, oldData) => {
        !more &&
            this.stateCallback({
                loading: true,
            });

        this.api
            .get('animes', {
                params: filters,
                cancelToken: this.source.token,
            })
            .then(({ data: { data, count } }) => {
                let newData = data;

                if (more) newData = [...oldData, ...data];

                this.stateCallback({
                    loading: false,
                    data: newData,
                    count,
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

    getEpisodes = (id, loading = true) => {
        loading &&
            this.stateCallback({
                loading: true,
            });

        this.api
            .get(`animes/${id}/episodes`, {
                cancelToken: this.source.token,
            })
            .then(({ data: { data } }) => {
                this.stateCallback({
                    loading: false,
                    data: data,
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

    getSources = async (id, isSerial, season, episode) => {
        const {
            data: { data },
        } = await this.api.post(
            `animes/hdsources`,
            {
                id,
                isSerial,
                season,
                episode,
            },
            {
                cancelToken: this.source.token,
            }
        );

        return data;
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
            .then(
                ({
                    data: {
                        data: { title, data },
                    },
                }) => {
                    this.stateCallback({
                        loading: false,
                        data: {
                            title,
                            data: data,
                        },
                    });
                }
            )
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
            })
            .then(({ data }) => {
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
