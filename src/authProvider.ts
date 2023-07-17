const authProvider = {
    login: ({username, password}) => {
        const request = new Request('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({email: username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Invalid username or password')
            });
    },
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            return Promise.resolve({ id: auth.data._id, fullName: auth.data.full_name });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    checkAuth: () => localStorage.getItem('auth')
        ? Promise.resolve()
        : Promise.reject(),
};

export default authProvider;