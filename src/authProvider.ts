const authProvider = {
	login: ({username, password}: {username: string, password: string}): Promise<void> => {
		const request = new Request("http://localhost:3000/api/v1/auth/login", {
			method: "POST",
			body: JSON.stringify({email: username, password}),
			headers: new Headers({"Content-Type": "application/json"}),
		})
		return fetch(request)
			.then(response => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText)
				}
				return response.json()
			})
			.then(auth => {
				localStorage.setItem("auth", JSON.stringify(auth))
			})
			.catch(() => {
				throw new Error("Invalid username or password")
			})
	},
	getPermissions: (): Promise<void> => {
		return Promise.resolve()
	},
	checkError: (error: any): Promise<void> => {
		const status = error.status
		if (status === 401 || status === 403) {
			localStorage.removeItem("auth")
			return Promise.reject()
		}
		return Promise.resolve()
	},
	logout: (): Promise<void> => {
		localStorage.removeItem("auth")
		return Promise.resolve()
	},
	getIdentity: (): Promise<{ id: string, fullName: string }> => {
		try {
			const auth = JSON.parse(localStorage.getItem("auth")!)
			return Promise.resolve({ id: auth.data._id, fullName: auth.data.full_name })
		} catch (error) {
			return Promise.reject(error)
		}
	},
	checkAuth: (): Promise<void> => localStorage.getItem("auth")
		? Promise.resolve()
		: Promise.reject(),
}

export default authProvider