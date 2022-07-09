import { NotFound } from "./errors";

namespace GitHubApi {
    export interface Profile {
        avatar_url: string;
        name: string;
    }

    /**
     * Fetches the GitHub profile of a given user.
     * 
     * # Example:
     * 
     * ```ts
     * await profileOf('ghost');
     * ```
     */
    export async function profileOf(userName: string): Promise<Profile> {
        const res = await fetch(`https://api.github.com/users/${userName}`);

        if (res.status === 404) throw new NotFound();

        return res.json();
    }
}

export default GitHubApi;