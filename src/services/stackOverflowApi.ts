import { NotFound } from "./errors";

namespace StackOverflowApi {
    export interface Profile {
        badge_counts: { bronze: number; silver: number; gold: number };
        reputation: number;
        profile_image: string;
        display_name: string;
    }

    /**
     * Fetches the Stack Overflow profile of a given user.
     * 
     * # Example:
     * 
     * ```ts
     * await profileOf('1');
     * ```
     */
    export async function profileOf(id: string): Promise<Profile> {
        const res = await fetch(`https://api.stackexchange.com/users/${id}?site=stackoverflow`);

        // This catches more errors than just "not found". But it is treated as
        // such to maintain simplicity.
        if (res.status === 400) throw new NotFound();

        const data: { items: Profile[] } = await res.json();

        if (data.items.length === 0) throw new NotFound();

        return data.items[0];
    }
}

export default StackOverflowApi;