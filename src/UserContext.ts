import { createContext, Dispatch, SetStateAction } from "react";

export interface IUser {
	userDetails?: {
		id: string;
		name: string;
	};
	token?: string;
}

interface IuserContext {
	user: IUser;
	setUser: Dispatch<SetStateAction<{}>>;
}

const userContext = createContext({} as IuserContext);

export default userContext;
