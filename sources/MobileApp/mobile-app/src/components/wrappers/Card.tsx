import React, {PropsWithChildren} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colorTypes} from '../../lib/colors';

interface IProps extends PropsWithChildren {
  title: string;
  margin: number;
  disabled?: boolean;
  actionLabel?: string;
  titleFontSize?: number;
  actionCallback?: () => void;
}

const Card: React.FC<IProps> = props => {
  const {
    title,
    margin,
    children,
    actionLabel,
    disabled,
    titleFontSize,
    actionCallback,
  } = props;
  return (
    <View style={[styles.container, {margin: margin}]}>
      <View style={styles.cardTitleContainer}>
        <Text style={[styles.cardTitle, {fontSize: titleFontSize ?? 30}]}>
          {title}
        </Text>
      </View>
      <View style={styles.cardBody}>{children}</View>
      {actionCallback && (
        <View style={styles.cardActionContainer}>
          <TouchableOpacity
            style={styles.cardActionButton}
            onPress={actionCallback}
            disabled={disabled}>
            <Text style={styles.cardActionButtonLabel}>
              {actionLabel ?? 'OK'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  cardTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: colorTypes.lightBlue,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardActionContainer: {
    padding: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  cardActionButton: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: colorTypes.lightBlue,
  },
  cardActionButtonLabel: {
    textAlign: 'center',
    color: '#ffffff',
  },
});
export default Card;
