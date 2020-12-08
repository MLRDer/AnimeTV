import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import GridList from './../../components/GridList';

const Favourites = () => {
    const [listItems, setListItems] = useState([
        {
            id: 1,
            liked: true,
            rating: 2.3,
            title: 'Weathering with you',
            key: 'weathering-with-you1',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
        {
            id: 2,
            liked: true,
            rating: 7.7,
            title: 'Dororo',
            key: 'dororo1',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
        },
        {
            id: 1,
            liked: true,
            rating: 5.3,
            title: 'Weathering with you',
            key: 'weathering-with-you',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
        {
            id: 2,
            liked: true,
            rating: 7.7,
            title: 'Dororo',
            key: 'dororo',
            image: 'https://kg-portal.ru/img/73607/main.jpg',
        },
        {
            id: 3,
            liked: true,
            rating: 9.5,
            title: 'Your name',
            key: 'your-name',
            image:
                'https://cdn.onebauer.media/one/empire-images/reviews_films/5829f535737b36a41846433e/Your%20Name.png?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
        },
        {
            id: 4,
            liked: true,
            rating: 5.3,
            title: 'Weathering with you',
            key: 'weathering-with-you',
            image:
                'https://www.film.ru/sites/default/files/movies/frames/46008190-1114518.jpg ',
        },
    ]);

    const handleAddFavourite = (id) => {
        const updatedList = listItems.map((el) => {
            if (el.id == id) {
                el.liked = !el.liked;

                // save to db
            }

            return el;
        });

        setListItems(updatedList);
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Favourites" />
            </Appbar.Header>
            <GridList
                data={listItems}
                handleAddFavourite={handleAddFavourite}
            />
        </>
    );
};

export default Favourites;
