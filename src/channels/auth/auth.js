AMap.plugin('AMap.Geolocation', () => {
  // eslint-disable-next-line no-undef
  const geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
    timeout: 10000, // 超过10秒后停止定位，默认：5s
  });
  window.globalMap.addControl(geolocation);
  console.log('开始定位')
  geolocation.getCurrentPosition((status, result) => {
    if (status === 'complete') {
      console.log('success')
      const { lng, lat } = result.position
      console.log(lng, lat)
      // this.currentMarkPosition = [lng, lat]
      // this.isGeolocation = true
      // this.getGeolocationAddress()
    } else {
      // onError(result)
    }
  });
});