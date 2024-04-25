import { Community } from "@communecar/types";

export type ClientCommunity  = Community & {numberOfMembers: number, picturesUrl?: string[]}
