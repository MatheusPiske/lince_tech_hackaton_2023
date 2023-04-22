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

    async getCallCode() {
        try {
            const response = await http.get(`/call`);
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    async postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate) {
        try {
            const response = await http.post("/call/create", {
                numberCall: `5`,
                title: `${titleCreate}`,
                // flow: `${flowCodeCreate}`,
                contact: `${contactCreate}`,
                priority: `${priorityCreate}`,
                author: `desconhecido`,
                title: `${titleCreate}`,
                originProblemS: `${firstFieldCreate}`

            });
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

}

export const callRepositories = new CallRepositories();
