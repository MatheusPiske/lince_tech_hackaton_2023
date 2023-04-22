import { callRepositories } from "../repositories/CallRepositories";

class CallUseCases {

    async getFlowCode() {
        const response = await callRepositories.getFlowCode();
        return response;
    }

    async getFlowCall(callCode) {
        const response = await callRepositories.getFlowCall(callCode);
        return response;
    }

    async postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, contentCreate) {
        const response = await callRepositories.postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, contentCreate);
        return response;
    }

}

export const callUseCases = new CallUseCases();
