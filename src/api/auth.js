import Base from './base.js';

const namespace = 'auth';

class Auth extends Base {
    login ({ username, password, code }) {
        return this.request({
            url: `/${namespace}/login`,
            method: 'POST',
            data: {
                username,
                password,
                code
            }
        });
    }
}

export default new Auth();
