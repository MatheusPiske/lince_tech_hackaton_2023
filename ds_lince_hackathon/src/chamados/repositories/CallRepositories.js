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

    async getFlowCall(callCode) {
        try {
            const response = await http.get(`/call/${callCode}`);
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

    async postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, contentCreate, user) {
        try {
            const response = await http.post("/call/create", {
                uuid: `${callUuid === undefined ? '' : callUuid}`,
                title: `${titleCreate}`,
                flow: {
                    uuid: `${flowCodeCreate}`
                },
                contact: `${contactCreate}`,
                priority: `${priorityCreate}`,
                author: `${user}`,
                title: `${titleCreate}`,
                originProblemS: `${firstFieldCreate}`,
                richText: `${contentCreate}`,
                // richText: `asdasdasd`,

            });
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

}

export const callRepositories = new CallRepositories();
