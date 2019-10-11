import React, { Component } from 'react';
import { Camera, FileSystem, Permissions, BarCodeScanner } from 'expo';
import { Alert, StyleSheet, View } from 'react-native';
import { delay } from 'lodash';

import { BottomBar, NoPermissions, BannerHotDog, BannerNotHotDog, Loader } from '../components';
import { submitToGoogle } from '../core/sendToGoogle';

export class CameraScreen extends Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    barcodeScanning: false,
    permissionsGranted: false,
    showBanner: false,
    isHotDog: false,
    loading: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}photos`).catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  setFocusDepth = depth => this.setState({ depth });

  takePicture = () => {
    if (this.camera) {
      this.setState({ loading: true });
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  handleMountError = ({ message }) => console.error(message);

  onPictureSaved = async photo => {
    const contains = await submitToGoogle(photo);

    this.setState({
      showBanner: true,
      loading: false,
      isHotDog: contains.some(item => item.includes('Hot dog'))
    })

    delay(() => this.setState({ showBanner: false }), 5000);

  };

  onBarCodeScanned = code => {
    this.setState(
      { barcodeScanning: !this.state.barcodeScanning },
      Alert.alert(`Barcode found: ${code.data}`)
    );
  };


  render() {
    const {
      zoom,
      type,
      flash,
      loading,
      isHotDog,
      autoFocus,
      showBanner,
      barcodeScanning,
      permissionsGranted,
    } = this.state;

    if (!permissionsGranted) {
      return (
        <View style={styles.container}>
          <NoPermissions />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.camera}
            onCameraReady={this.collectPictureSizes}
            type={type}
            flashMode={flash}
            autoFocus={autoFocus}
            zoom={zoom}
            onMountError={this.handleMountError}
            barCodeScannerSettings={{
              barCodeTypes: [
                BarCodeScanner.Constants.BarCodeType.qr,
                BarCodeScanner.Constants.BarCodeType.pdf417,
              ],
            }}
            onBarCodeScanned={
              barcodeScanning ? this.onBarCodeScanned : undefined
            }
          >
            <BannerNotHotDog show={showBanner && !isHotDog} />
            <BannerHotDog show={showBanner && isHotDog} />
            <Loader loading={loading} />
            <BottomBar takePicture={this.takePicture} loading={loading} />
          </Camera>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
});
