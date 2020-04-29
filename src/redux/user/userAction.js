import { UPDATE_USER_DATA } from "./userActionTypes";

export const update_user_data = (newData) => {
	return {
		type: UPDATE_USER_DATA,
		payload: newData
	}
}