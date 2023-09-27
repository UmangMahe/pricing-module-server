const dev = {
	API_ENDPOINT_URL: 'http://localhost:3001/api/v2',
	API_IMAGE_URL: 'https://ritaecom.infikey.buzz/backend/public/images',
	//   CHAT_API_URL: 'http://localhost:3001/api',
	//   SOCKET_URL : 'ws://localhost:8900',
	SOCKET_URL: 'https://chat-socket-ritaecom.herokuapp.com',
	CHAT_API_URL: 'https://chat-ritaecom.herokuapp.com/api',
};

const prod = {
	API_ENDPOINT_URL: 'https://ritaecom.infikey.buzz/backend/public/api',
	API_IMAGE_URL: 'https://ritaecom.infikey.buzz/backend/public/images',
	CHAT_API_URL: 'https://chat-ritaecom.herokuapp.com/api',
	SOCKET_URL: 'https://chat-socket-ritaecom.herokuapp.com'

};

const test = {
	API_ENDPOINT_URL: 'https://api.test.com'
};

const getEnv = () => {
	switch (import.meta.env.MODE) {
		case 'development':
			return dev
		case 'production':
			console.log = () => {}
			console.error = ()=>{}
			return prod
		case 'test':
			return test
		default:
			break;
	}
}

export const env = getEnv()
