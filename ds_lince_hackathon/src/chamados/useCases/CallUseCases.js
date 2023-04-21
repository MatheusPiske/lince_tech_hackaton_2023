import { callRepositories } from "../repositories/CallRepositories";

class CallUseCases {

    async getFlowCode() {
        const response = await callRepositories.getFlowCode();
        return response;
    }

}

export const callUseCases = new CallUseCases();
