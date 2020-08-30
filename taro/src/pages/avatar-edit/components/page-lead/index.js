import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './styles.styl'

export default class PageLead extends Taro.Component {

  static defaultProps = {
    showTime: 5
  }
  
  config = {
    component: true
  }

  constructor(props) {
    super(props)
    const isHide = Taro.getStorageSync('isHideLead') === true
    console.log('isHide :>> ', isHide);
    if (!isHide) {
      this.autoHidden()
    }

    this.state = {
      isHide,
      showTimeText: props.showTime
    }
  }

  autoHidden = () => {
    let { showTime } = this.props

    this.timeInter = setInterval(() => {
      const { showTimeText } = this.state
      if (showTimeText <= 0) {
        clearInterval(this.timeInter)
      }
      this.setState({
        showTimeText: showTimeText - 1
      })
    }, 1000);
    this.timer = setTimeout(() => {
      this.setState({
        isHide: true
      })
      Taro.setStorageSync('isHideLead', true)
    }, showTime * 1000)

  }

  onToggle = () => {
    this.setState({
      isHide: !this.state.isHide
    })
    Taro.setStorageSync('isHideLead', true)
    clearTimeout(this.timer)
    clearInterval(this.timeInter)
  }

  render() {
    const { isHide, showTimeText } = this.state
    console.log('isHide :>> ', isHide);
    return (
      <View className={`page-lead ${isHide ? 'hide' : ''}`}>
        <View className='page-lead-btn' onClick={this.onToggle}>跳过 {showTimeText}s</View>
      </View>
    )
  }
}