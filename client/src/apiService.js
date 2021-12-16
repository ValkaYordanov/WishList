const API_URL = process.env.REACT_APP_API;

class ApiService {
    constructor(api_url) {
        this.api_url = api_url;
    }

    async createUser(username, password) {
        const response = await this.post("/users/registration", {
            username,
            password,
        });
        this.setToken(response.token);
        this.login(username, password);
    }

    async getUsers() {
        const response = await this.get("/users/users");
        return response
    }
    async getWishes() {
        const response = await this.get("/allWishes");
        return response
    }
    async login(username, password) {
        const response = await this.post("/users/authenticate", {
            username,
            password,
        });
        this.setToken(response.token);
    }

    loggedIn() {
        return this.getToken() !== null;
    }

    setToken(token) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    logout() {
        localStorage.removeItem("token");
    }

    async makeRequest(path, options) {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };


        if (this.loggedIn()) {
            headers["Authorization"] = `Bearer ${this.getToken()}`;
        }
        try {
            const response = await fetch(this.api_url + path, {
                headers: headers,
                ...options,
            });

            const parsedResponse = await response.json();
            if (response.ok) {
                return parsedResponse;
            } else {

                throw parsedResponse;
            }
        } catch (error) {
            throw "You need to log in!";
        }
    }

    get(path) {
        return this.makeRequest(path, { method: "GET" });
    }

    post(path, body) {
        return this.makeRequest(path, {
            method: "POST",
            body: body ? JSON.stringify(body) : null,
        });
    }

    put(path, body) {
        return this.makeRequest(path, {
            method: "PUT",
            body: body ? JSON.stringify(body) : null,
        });
    }

    delete(path) {
        return this.makeRequest(path, { method: "DELETE" });
    }
}


const apiService = new ApiService(API_URL);

export default apiService;
