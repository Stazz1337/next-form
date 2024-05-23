import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/api/form').reply(200, [
    {
        type: 'string',
        label: 'Ваш ФИО',
        required: true,
        name: 'name',
    },
    {
        type: 'string',
        label: 'Ваш E-mail',
        required: true,
        name: 'email',
    },
    {
        type: 'string',
        label: 'Пароль',
        required: true,
        name: 'password',
    },
    {
        type: 'string',
        label: 'Повторите пароль',
        required: true,
        name: 'password2',
    },

]);

mock.onPost('/api/form').reply(200, { message: 'Форма успешно отправлена!' });

export default axios;
