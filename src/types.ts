export interface IEvent {
	_id: string;
	uid: string;
	name: string;
	startDate: string;
	endDate: string;
	location: string;
	status: "Ongoing" | "Completed";
	poster?: string;
}
