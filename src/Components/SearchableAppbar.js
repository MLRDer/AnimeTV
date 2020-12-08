import React, { useState, useEffect } from 'react';
import { Appbar, Searchbar, IconButton } from 'react-native-paper';
import { StyleSheet, Keyboard } from 'react-native';

const SearchableAppbar = ({ value, onChange, placeholder = 'Search' }) => {
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            setShowSearch(false);
        });

        // cleanup
        return () => {
            Keyboard.removeListener('keyboardDidHide');
        };
    }, []);

    const handleOpen = () => setShowSearch(true);

    const handleClose = () => {
        // console.log('value');
        value.length ? onChange('') : setShowSearch(false);
    };

    return showSearch ? (
        <Appbar.Header>
            <Searchbar
                value={value}
                onChangeText={onChange}
                autoFocus
                placeholder={placeholder}
                icon="search"
                clearIcon={() => (
                    <IconButton
                        rippleColor="#afafaf"
                        icon="close-square"
                        onPress={handleClose}
                    />
                )}
                style={styles.searchBar}
            />
        </Appbar.Header>
    ) : (
        <Appbar.Header>
            <Appbar.Content title="AnimeTV" />
            <Appbar.Action
                icon="search"
                rippleColor="#afafaf"
                onPress={handleOpen}
            />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        elevation: 0,
        flex: 1,
        borderWidth: 0,
        padding: 0,
    },
});

export default SearchableAppbar;
