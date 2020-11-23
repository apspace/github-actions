import * as github from "@actions/github";
import * as core from "@actions/core";

export const getRequiredInput = (name: string) => {
    const value = core.getInput(name);
    if (value) {
        return value;
    }

    throw new Error(
        `Unable to get require input parameter: ${name}`,
    );
}

export abstract class AbstractAction {
    constructor(
        protected readonly api = github.getOctokit(
            getRequiredInput('token')
        )
    ) {
    }

    public async run() {
        try {
            await this.handle();
        } catch (error) {
            core.setFailed(error.message)
        }
    }

    abstract async handle(): Promise<void>;
}
