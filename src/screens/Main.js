import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import PhotoComponent from '../components/PhotoComponent';
import ButtonComponent from '../components/ButtonComponent';
const styles = StyleSheet.create({
container: {
flex: 1
}
})
class Main extends Component {
constructor(props) {
super(props)
this.state = {
uploadSource: null
}
}
componentDidMount() {
this.getPermissionAsync();
}
getPermissionAsync = async () => {
if (Constants.platform.ios) {
const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
if (status !== 'granted') {
alert('Untuk menjalankan aplikasi membutuhkan akses kamera');
}
}
}
_pickImage = async () => {
let result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.All,
allowsEditing: true,
aspect: [4, 3],
});
console.log(result);
if (!result.cancelled) {
this.setState({ uploadSource: result.uri });
}
};
_takePhoto = async () => {
let result = await ImagePicker.launchCameraAsync({
mediaTypes: ImagePicker.MediaTypeOptions.All,
allowsEditing: true,
aspect: [4, 3],
});
console.log(result);
if (!result.cancelled) {
this.setState({ uploadSource: result.uri });
}
};
render() {
return (
<View style={styles.container}>
<PhotoComponent uri={this.state.uploadSource} />
<View style={{ flexDirection: 'row', paddingBottom: 40 }}>
<ButtonComponent onPress={this._takePhoto} icon='camera'/>
<ButtonComponent onPress={this._pickImage} icon='image'/>
</View>
</View>
)
}
}
export default Main;