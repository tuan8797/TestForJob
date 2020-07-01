import Axios from 'axios';

export const request = {
  async header() {
    return await Axios.create({
      baseURL: 'https://randomuser.me/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  async get(url) {
    const api = await this.header();
    const res = await api.get(url);
    return res.data;
  },
};
