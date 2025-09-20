import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		// Get the access token from AsyncStorage using the namespaced key
		const accessToken = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
		return accessToken;
	}

	async setAccessToken(accessToken) {
		// Store the access token in AsyncStorage using the namespaced key
		await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
	}

	async removeAccessToken() {
		// Remove the access token from AsyncStorage using the namespaced key
		await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
	}
}

export default AuthStorage;
