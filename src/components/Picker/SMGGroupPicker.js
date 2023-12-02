import _ from 'lodash';
import React, {Component} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  SectionList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../theme';
import SMGText from '../Base/Text';
import Block from '../Block';
import styles from './stylesPicker';

const enumMode = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI',
};

class SMGPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      filterDS: [],
      selectedValue: [],
    };
  }

  componentDidMount() {
    const {data, value} = this.props;

    if (data.length) {
      this.setState({data, filterDS: data});
    }
    if (value) {
      if (typeof value === 'object') {
        this.setState({selectedValue: [...value]});
      } else {
        this.setState({selectedValue: [value]});
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({selectedValue: nextProps.value});
    }
    if (nextProps.data) {
      this.setState({data: nextProps.data, filterDS: nextProps.data});
      if (nextProps.data?.length === 0) {
        this.setState({selectedValue: []});
      }
    }
  }

  onSelect = (item) => () => {
    const {selectedValue} = this.state;
    const {mode, onChange} = this.props;

    switch (mode) {
      case enumMode.MULTI:
        const itemIndex = _.findIndex(selectedValue, (o) => o?.id == item.id);
        if (itemIndex !== -1) {
          selectedValue.splice(itemIndex, 1);
        } else {
          selectedValue.push(item);
        }
        this.setState({});
        break;

      default:
        this.setState({selectedValue: [item]});
        onChange(item);
        this.hideModal();
        break;
    }
  };

  renderItem = ({item, index}) => {
    const {selectedValue} = this.state;

    const checked = _.find(selectedValue, (o) => o?.id == item.id) ? 1 : 0;
    return (
      <Block
        key={index}
        style={styles.pickerItem}
        row
        center
        onPress={this.onSelect(item)}>
        <SMGText
          style={{flex: 1, color: checked ? colors.PRIMARY : colors.BLACK}}>
          {item.ten}
        </SMGText>
        <Icon
          name="check"
          size={24}
          color={checked ? colors.PRIMARY : colors.WHITE}
        />
      </Block>
    );
  };

  onSearchChange = (keyword) => {
    const newSelectedValue = _.map(this.state.data, (elem) => {
      let data = _.filter(elem.data, (child) =>
        child.ten.toLowerCase().includes(keyword.toLowerCase()),
      );
      return Object.assign({}, elem, {data});
    });
    this.setState({filterDS: newSelectedValue});
  };

  renderSelectedValues = () => {
    const {selectedValue} = this.state;

    return selectedValue.map((el, index) => (
      <Block
        key={index}
        style={[styles.selectedItem, styles.shadow]}
        center
        middle
        onPress={this.onDeleteSelected(index)}
        row>
        <SMGText color={colors.WHITE} style={{marginRight: 5}}>
          {el.ten}
        </SMGText>
        <Icon name="x" size={16} color={colors.WHITE} />
      </Block>
    ));
  };

  onDeleteSelected = (idx) => () => {
    const {onChange} = this.props;
    this.state.selectedValue.splice(idx, 1);
    this.setState({});
    onChange(this.state.selectedValue);
  };

  showModal = () => {
    if (!this.props.disable) this.setState({visible: true});
  };
  hideModal = () => {
    this.setState({visible: false});
  };

  resetData = () => {
    this.setState({
      filterDS: this.state.data,
      visible: false,
    });
  };

  onDone = () => {
    this.props.onChange(this.state.selectedValue);
    this.hideModal();
  };
  render() {
    const {
      placeholder,
      searchPlaceholder,
      placeholderEdit,
      mode,
      underline,
      sectionTitlePrefix,
    } = this.props;
    const {visible, data, filterDS, selectedValue} = this.state;

    return (
      <Block>
        <Block>
          <Block
            onPress={this.showModal}
            row
            center
            style={[underline && styles.underline]}
            padding={[5, 0]}>
            <SMGText
              style={{
                flex: 1,
                fontWeight: Platform.select({
                  ios: '600',
                  android: 'bold',
                }),
              }}
              color={colors.IOS_BTN}>
              {mode === enumMode.MULTI
                ? selectedValue.length
                  ? placeholderEdit
                  : placeholder
                : selectedValue.length
                ? selectedValue[0]?.customer_kd?.name || selectedValue[0].ten
                : placeholder}
            </SMGText>
            <Icon name="chevron-down" size={20} color={colors.IOS_BTN} />
          </Block>
          {mode === enumMode.MULTI ? (
            <Block row style={styles.values}>
              {this.renderSelectedValues()}
            </Block>
          ) : null}
        </Block>
        <Modal
          visible={visible}
          animationType="slide"
          onRequestClose={this.hideModal}>
          <Block flex={1} style={{backgroundColor: 'white'}}>
            <SafeAreaView style={{backgroundColor: colors.GRAY3}} />
            <Block row style={styles.header}>
              <Block style={styles.xBtn} onPress={this.resetData}>
                <Icon name="x" size={24} color={colors.BLACK} />
              </Block>
              <Block flex={1} middle center>
                <SMGText>{placeholder}</SMGText>
              </Block>
              {mode === enumMode.MULTI ? (
                <Block
                  style={styles.rightHeader}
                  middle
                  center
                  onPress={this.onDone}>
                  <SMGText color={colors.COLOR_INFO}>Chọn</SMGText>
                </Block>
              ) : (
                <Block style={styles.rightHeader} />
              )}
            </Block>
            <Block style={styles.searchBar} row center>
              <Icon name="search" size={24} />
              <TextInput
                placeholder={searchPlaceholder}
                style={styles.searchInput}
                onChangeText={_.throttle(this.onSearchChange, 300)}
              />
            </Block>
            <Block flex={1} style={styles.content}>
              <SectionList
                showsVerticalScrollIndicator={false}
                sections={filterDS}
                keyExtractor={(item, index) => index + ''}
                renderItem={this.renderItem}
                renderSectionHeader={({section}) => {
                  const isShow = section.data.length ? 1 : 0;
                  if (isShow)
                    return (
                      <Block row center style={styles.sectionTitle}>
                        <Icon name="filter" size={20} color={colors.BLACK} />
                        <SMGText style={styles.sectionText}>
                          {sectionTitlePrefix} {section.title}
                        </SMGText>
                      </Block>
                    );
                  return null;
                }}
              />
            </Block>
          </Block>
        </Modal>
      </Block>
    );
  }
}

SMGPicker.defaultProps = {
  onChange: () => {},
  mode: enumMode.SINGLE,
  data: [],
  showSearch: false,
  placeholder: 'Ấn để chọn',
  placeholderEdit: 'Ấn để sửa',
  searchPlaceholder: 'Tìm kiếm',
  sectionTitlePrefix: '',
  underline: false,
};

SMGPicker.mode = enumMode;

export default SMGPicker;
