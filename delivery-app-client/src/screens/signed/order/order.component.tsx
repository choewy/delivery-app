import { OrderRowType } from '@/store';
import { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { orderHelper } from './order.helpers';

export class OrderComponent {
  private mapStyle() {
    return StyleSheet.create({
      view: { flexDirection: 'row' },
      text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    });
  }

  private detailStyle() {
    return StyleSheet.create({
      pressable: { flexDirection: 'row' },
      text: { flex: 1 },
    });
  }

  private detail(item: OrderRowType): ReactElement {
    const styles = this.detailStyle();

    return (
      <Pressable style={styles.pressable}>
        <Text style={styles.text}>{item.price.toLocaleString('ko-KR')}원</Text>
        <Text style={styles.text}>
          {orderHelper
            .calcDistanceAsKm(
              item.startLatitude,
              item.startLongitude,
              item.endLatitude,
              item.endLongitude,
            )
            .toFixed(1)}
          km
        </Text>
        <Text style={styles.text}>{item.user ? item.user.name : ''}</Text>
      </Pressable>
    );
  }

  private naverMap(props: {
    item: OrderRowType;
    onPressAccept: () => Promise<void>;
  }): ReactElement {
    const styles = this.mapStyle();

    return (
      <View>
        <View>
          <Text>Naver Map</Text>
        </View>
        <View style={styles.view}>
          <Pressable onPress={props.onPressAccept}>
            <Text style={styles.text}>수락</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.text}>거절</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  orderRow(props: {
    item: OrderRowType;
    onPressAccept: () => Promise<void>;
  }): ReactElement {
    const styles = StyleSheet.create({
      view: {
        borderRadius: 5,
        margin: 5,
        padding: 10,
        backgroundColor: 'lightgray',
      },
    });

    return (
      <View style={styles.view}>
        {this.detail(props.item)}
        {this.naverMap(props)}
      </View>
    );
  }
}

export const orderComponent = new OrderComponent();
