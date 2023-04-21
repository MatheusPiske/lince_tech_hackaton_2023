import http from "../../Httphelper";

class CallRepositories {

    async getFlowCode() {
        try {
            const response = await http.get(`/flow`);
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

}

export const callRepositories = new CallRepositories();
