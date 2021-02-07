import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
    Portal,
    Dialog,
    List,
    Checkbox,
    ToggleButton,
    Button,
    Text,
    Switch,
    withTheme,
} from 'react-native-paper';

const cats = [
    { id: 1, label: 'Action', selected: false },
    { id: 2, label: 'Comedy', selected: false },
    { id: 3, label: 'Crime', selected: false },
    { id: 4, label: 'Drama', selected: false },
    { id: 5, label: 'Historical', selected: false },
    { id: 6, label: 'Sci-Fi', selected: false },
    { id: 7, label: 'Romance', selected: false },
];

const FiltersModal = ({ visible, hideDialog, filters, setFilters, theme }) => {
    // *** FILTERS - START *** //
    const [onlySerial, setOnlySerial] = useState(false);
    const [videoQuality, setVideoQuality] = useState(null);
    const [categories, setCategories] = useState(
        JSON.parse(JSON.stringify(cats))
    );

    useEffect(() => {
        filters.isSerial
            ? setOnlySerial(filters.isSerial)
            : setOnlySerial(false);
        filters.quality
            ? setVideoQuality(filters.quality)
            : setVideoQuality(null);

        if (filters.categories) {
            const _categories = filters.categories.split`,`;

            const updatedList = categories.map((category) => {
                category.selected = _categories.includes(category.label);
                return category;
            });

            setCategories(updatedList);
        } else {
            setCategories(JSON.parse(JSON.stringify(cats)));
        }
    }, [filters]);

    const getFilters = () => {
        const filter = {
            isSerial: onlySerial,
            quality: videoQuality,
            categories: categories
                .filter((category) => category.selected)
                .map((category) => category.label)
                .join(','),
        };

        const options = {};

        Object.keys(filter).map((key) => {
            filter[key] && (options[key] = filter[key]);
        });

        return options;
    };

    const handleSelectCategory = (id) => {
        const updatedList = categories.map((el) => {
            if (el.id === id) {
                el.selected = !el.selected;
            }

            return el;
        });

        setCategories(updatedList);
    };

    const handleApplyFilters = () => {
        hideDialog();
        setFilters(getFilters());
    };

    const handleClear = () => {
        hideDialog();
        setFilters(new Object());
        setCategories(JSON.parse(JSON.stringify(cats)));
        setVideoQuality(null);
        setOnlySerial(false);
    };

    // *** FILTERS - END *** //

    return (
        <Portal>
            <Dialog
                style={{
                    backgroundColor: theme.colors.background,
                }}
                visible={visible}
                onDismiss={hideDialog}
            >
                <Dialog.Title>Filter</Dialog.Title>
                <Dialog.Content>
                    <List.Section>
                        <List.Item
                            style={{
                                paddingHorizontal: 0,
                            }}
                            title="Only series"
                            right={() => (
                                <Switch
                                    value={onlySerial}
                                    onValueChange={setOnlySerial}
                                />
                            )}
                        />

                        <List.Accordion
                            theme={{ colors: { primary: theme.colors.text } }}
                            style={{
                                paddingHorizontal: 0,
                            }}
                            title="Categories"
                        >
                            <ScrollView style={{ maxHeight: 180 }}>
                                {categories.map((category, index) => {
                                    return (
                                        <List.Item
                                            key={index}
                                            onPress={() =>
                                                handleSelectCategory(
                                                    category.id
                                                )
                                            }
                                            style={{
                                                paddingVertical: 2,
                                            }}
                                            title={category.label}
                                            right={() => (
                                                <Checkbox
                                                    status={
                                                        category.selected
                                                            ? 'checked'
                                                            : 'unchecked'
                                                    }
                                                    onPress={() =>
                                                        handleSelectCategory(
                                                            category.id
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                    );
                                })}
                            </ScrollView>
                        </List.Accordion>

                        <List.Item
                            style={{
                                paddingHorizontal: 0,
                            }}
                            title="Quality"
                        />

                        <ToggleButton.Row
                            style={{
                                flex: 1,
                                paddingHorizontal: 16,
                                marginBottom: 24,
                            }}
                            onValueChange={(value) => {
                                setVideoQuality(value);
                            }}
                            value={videoQuality}
                        >
                            <ToggleButton
                                style={{
                                    flex: 1,
                                    borderColor: theme.colors.surface,
                                }}
                                icon={() => {
                                    return <Text>480</Text>;
                                }}
                                value={480}
                            />
                            <ToggleButton
                                style={{
                                    flex: 1,
                                    borderColor: theme.colors.surface,
                                }}
                                icon={() => {
                                    return <Text>720</Text>;
                                }}
                                value={720}
                            />
                            <ToggleButton
                                style={{
                                    flex: 1,
                                    borderColor: theme.colors.surface,
                                }}
                                icon={() => {
                                    return <Text>1080</Text>;
                                }}
                                value={1080}
                            />
                        </ToggleButton.Row>
                    </List.Section>
                </Dialog.Content>
                <Dialog.Actions style={{ justifyContent: 'space-between' }}>
                    <Button
                        color={theme.colors.text}
                        onPress={handleClear}
                        style={{ elevation: 0 }}
                    >
                        Clear
                    </Button>
                    <Button
                        color={theme.colors.text}
                        onPress={handleApplyFilters}
                        style={{ elevation: 0 }}
                    >
                        Apply
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default withTheme(FiltersModal);
