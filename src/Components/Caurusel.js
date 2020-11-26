import React from 'react';
import { Text, Title } from 'react-native-paper';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { FlatList } from 'react-native';
import friends from '../../assets/friends.png';
import designer from '../../assets/designer.png';
import welcome from '../../assets/welcome1.png';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width - 32;

const items = [
  {
    image: friends,
    title:
      "Topshiriqlarni bajarishda qiynalyapsizmi? Do'stlaringizdan yordam so'rang!",
    body:
      " Endi buni imkoni bor. Ukki X yordamida siz bilan birga o'qiydigan do'stlaringizi toping va topshiriqlarni birgalikda bajaring!",
  },
  {
    image: designer,
    title: 'Ukki Design Contest',
    body:
      '"Ukki Design Contest" bu TATU talabalari o\'rtasidagi dizaynerlik bo\'yicha sovrinli musobaqa. Musobaqada qatnashish mutlaqo bepul ...',
  },
  {
    image: welcome,
    title: 'Ukkiga xush kelibsiz',
    body:
      "Bugun ayni paytdan boshlab siz Ukki foydalanuvchisi hisoblanasiz. Umid qilamizki, qushchamiz ta'lim jarayonida sizga yaqindan ...",
  },
];

const Caurusel = (props) => {
  console.log(props);

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={items}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        snapToInterval={ITEM_WIDTH + 8}
        decelerationRate={0}
        keyExtractor={(item) => item.title}
        horizontal
        renderItem={({ index, item: { title, style, body, image } }) => (
          <View
            style={[
              styles.item,
              {
                width: ITEM_WIDTH,
                marginLeft: index == 0 ? 16 : 8,
                marginRight: index == items.length - 1 ? 16 : 0,
              },
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={image} />
              </View>
              <Text style={styles.body}>{body}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    height: 200,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    // elevation: 2,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  imageContainer: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    textAlignVertical: 'center',
    paddingLeft: 16,
    flex: 1,
    fontSize: 13,
  },
  image: {
    width: 140,
    height: '90%',
    borderWidth: 1,
  },
});

export default Caurusel;
