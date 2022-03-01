import api from "../api-common";

class UserDataService {
    getAll() {
        return api.get("/users");
    }

    getById(id) {
        return api.get(`/users/${id}`)
    }

    create(data) {
        return api.post("/users", data)
    }

    update(id, data) {
        return api.put(`/users/${id}`, data)
    }

    delete(id) {
        return api.delete(`/users/${id}`)
    }
}

export default new UserDataService();