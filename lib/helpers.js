import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import Firebase from './firebase';

class Helpers {
	static createAddEvent(userId, obj){
		let userNamePath = "/user/"+userId+"/event/"+Date.now()
		return firebase.database().ref(userNamePath).set(obj)
	}
	static getUserEvent(userId, callback){
		let userNamePath = "/user/"+userId
		firebase.database().ref(userNamePath).on('value', (snapshot) => {
			let data = snapshot.val()
			if(snapshot){
				if(data.event){
					let obj = {
						name: data.details.name,
						url: data.details.url,
						event: data.event
					}
					callback(obj)
				}
			}
		})
	}
	static getAllEvent(callback){
		let pathName = "/user/"
		firebase.database().ref(pathName).on('value', (snapshot) => {
			let data = snapshot.val()
			let arrayOfEvent = []
			if(data){
				for(let key in data){
					let obj = data[key]

					let name = obj.details.name
					let photo = obj.details.url

					for(let prop in obj){
						let event = obj[prop]
						for(let ev in event){
							if(event[ev].deskripsi && event[ev].kategori &&
								event[ev].harga && event[ev].lokasi &&
								event[ev].kapasitas && event[ev].title &&
								event[ev].image 
							) {
								arrayOfEvent.push({
									userName: name,
									userPhoto: photo,
									title: event[ev].title,
									kategori: event[ev].kategori,
									lokasi: event[ev].lokasi,
									kapasitas: event[ev].kapasitas,
									harga: event[ev].harga,
									image: event[ev].image,
									deskripsi: event[ev].deskripsi
								})
							}
						}
					}
				}
			}
			callback(arrayOfEvent)
		})
	}
	static setUserName(userId, name){
		let userNamePath = "/user/"+userId+"/details/name"
		return firebase.database().ref(userNamePath).set(name)
	}
	static setUserPhone(userId, phone){
		let userNamePath = "/user/"+userId+"/details/phone"
		return firebase.database().ref(userNamePath).set(phone)
	}
	static setUserPlace(userId, place){
		let userNamePath = "/user/"+userId+"/details/place"
		return firebase.database().ref(userNamePath).set(place)
	}
	static setImageUrl(userId, url){
		let userNamePath = "/user/"+userId+"/details/url"
		return firebase.database().ref(userNamePath).set(url)
	}
	static getImageUrl(userId, callback){
		let userNamePath = "/user/"+userId+"/details/url"
		firebase.database().ref(userNamePath).on('value', (snapshot) => {
			let imageUrl = ''
			if(snapshot.val()){
				imageUrl = snapshot.val()
			}
			callback(imageUrl)
		})
	}
	static getUserName(userId, callback){
		let userNamePath = "/user/"+userId+"/details/name"
		firebase.database().ref(userNamePath).on('value', (snapshot) => {
			let name = ''
			if(snapshot.val()){
				name = snapshot.val()
			}
			callback(name)
		})
	}
}

module.exports = Helpers