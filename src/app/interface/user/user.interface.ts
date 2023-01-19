export interface SignUpUserRequest {
	name: string;
	email: string;
	password: string;
	contactNumber: string;
}

export interface SignInUserRequest {
	email: string;
	password: string;
}
