import api from "../api-common";

class IncidentDataService {
    getAll() {
        return api.get("/incidents")
    }

    getById(id) {
        return api.get(`/incidents/${id}`)
    }

    create(data) {
        return api.post("/incidents", data)
    }

    update(id, data) {
        return api.put(`/incidents/${id}`, data)
    }

    delete(id) {
        return api.delete(`/incidents/${id}`)
    }
}

export default new IncidentDataService()