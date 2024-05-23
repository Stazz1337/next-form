'use client';
import React, { useEffect, useState } from 'react';
import axios from './Api';
import { useForm } from 'react-hook-form';
import styles from './Form.module.css';

const Form = ({ setLoading, setIsSubmitted }) => {
    const [fields, setFields] = useState([]);
    const [options, setOptions] = useState(['Опция 1', 'Опция 2', 'Опция 3', 'Опция 4']);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        axios
            .get('/api/form')
            .then((response) => {
                setFields(response.data);
            })
            .catch((error) => console.error('Ошибка при загрузке данных формы:', error));
    }, []);

    const handleSubmitForm = (data) => {
        setLoading(true);

        axios
            .post('/api/form', data)

            .then((response) => {
                console.log(data);

                console.log(response.data.message);
            })
            .catch((error) => console.error('Ошибка при отправке формы:', error));
        setLoading(false);
        setIsSubmitted(true);
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} noValidate className={styles.form}>
            {fields.map((field) => (
                <div key={field.name} className={styles.input_wrapper}>
                    <label className={styles.label}>{field.label}</label>
                    <input
                        {...register(field.name, { required: true })}
                        type={field.type === 'string' ? 'text' : 'password'}
                        name={field.name}
                        placeholder={field.label}
                        required={field.required}
                        className={`${styles.input} ${
                            errors[field.name] ? styles['error-input'] : ''
                        }`}
                    />

                    <div className={styles.errorsWrapper}>
                        {errors[field.name] && <p className={styles.error}>обязательное поле</p>}
                    </div>
                </div>
            ))}
            <div className={styles.select_wrapper}>
                <label className={styles.label}>Выберите пункт из списка</label>

                <select
                    className={`${styles.select} ${errors.option ? styles['error-select'] : ''}`}
                    {...register('option', { required: true })}
                    defaultValue={''}>
                    <option value='' hidden>
                        Выбор
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option} className={styles.option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className={styles.errorsWrapper}>
                    {errors.option && <p className={styles.error}>Пожалуйста, выберите опцию.</p>}{' '}
                </div>
            </div>
            <div className={styles.checkbox_wrapper}>
                <div className={styles.checkbox_container}>
                    <input
                        type='checkbox'
                        {...register('consent', { required: true })}
                        className={styles.checkbox}
                    />{' '}
                    <p className={styles.text}>
                        Я подтверждаю, что даю согласие на{' '}
                        <span className={styles.span}>обработку персональных данных</span>
                    </p>
                </div>

                <div className={styles.errorsWrapper}>
                    {errors.consent && <p className={styles.error}>Согласие обязательно</p>}{' '}
                </div>
            </div>
            <button type='submit' className={styles.button}>
                РЕГИСТРАЦИЯ
            </button>
        </form>
    );
};

export default Form;
