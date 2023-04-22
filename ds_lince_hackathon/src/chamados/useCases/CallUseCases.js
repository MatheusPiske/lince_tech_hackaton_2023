import { callRepositories } from "../repositories/CallRepositories";

class CallUseCases {

    async getFlowCode() {
        const response = await callRepositories.getFlowCode();
        return response;
    }

    async getCallCode() {
        const response = await callRepositories.getCallCode();
        return response;
    }
    async getCallCodeApprover() {
        const response = await callRepositories.getCallCodeApprover();
        return response;
    }
    async approveCall(callCode, situation) {
        const response = await callRepositories.approveCall(callCode, situation);
        return response;
    }

    async getFlowCall(callCode) {
        const response = await callRepositories.getFlowCall(callCode);
        return response;
    }
    async deleteFlowCall(callCode, situation) {
        const response = await callRepositories.deleteFlowCall(callCode, situation);
        return response;
    }

    async postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, contentCreate, user, situation) {
        const response = await callRepositories.postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, contentCreate, user, situation);
        return response;
    }

}

export const callUseCases = new CallUseCases();
