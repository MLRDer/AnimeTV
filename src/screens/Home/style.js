import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    searchBar: {
        elevation: 0,
        flex: 1,
        borderWidth: 0,
        padding: 0,
    },
    container: {
        width: '100%',
        marginTop: -8,
        marginBottom: 40,
        zIndex: 100,
    },
    heading: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headingText: { fontSize: 20 },
    flatlist: { flex: 1, paddingHorizontal: 8 },
});
