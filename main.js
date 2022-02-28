class ApiService{

	baseUrl = 'http://localhost:3001/film'

	async getAll(){
		const response =  await fetch(`${this.baseUrl}/title`);
		return response.json();
	}

	async create(pNewFilm){
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify(pNewFilm)
		}
		const response = await fetch('http://localhost:3001/film/newpost', requestOptions);
		return response.json(); 
	}

	async delete(pFilmId){
		const requestOptions = {
			method : 'DELETE'
		};
		const response = await fetch(`${this.baseUrl}/delete/${pFilmId}`, requestOptions)
		return response.json()
	}

}

const app = new Vue ({
	el : '#app',
	data : {
		films: [],
		apiService: null,
		newFilm: {}
	},
	async created(){
		this.apiService = new ApiService();
		this.films = await this.apiService.getAll();
	},
	methods: {
		onClickSend: async function(){
			await this.apiService.create(this.newFilm)
			this.films = await this.apiService.getAll();
			this.newFilm = {};
		},
		onClickDelete: async function(pFilmId){
			await this.apiService.delete(pFilmId);
			this.films = await this.apiService.getAll();

		}
		}
	
})