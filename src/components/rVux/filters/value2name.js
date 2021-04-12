export default function (value, list, delimiter) {
  // console.log('value2name接收到的参数value, list, delimiter', value, list, delimiter)
  if (value && !list.length) {
    return ''
  }
  if (!delimiter) {
    delimiter = ' '
  }
  const obj = list.find(ele => ele.value === value)
  if (obj) { 
    return obj.name
  } else {
    return ''
  }
}

