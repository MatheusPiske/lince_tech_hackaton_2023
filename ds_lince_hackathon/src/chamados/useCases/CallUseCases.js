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

    async postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate) {
        const response = await callRepositories.postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate);
        return response;
    }

}

export const callUseCases = new CallUseCases();
