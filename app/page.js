'use client';
import styles from './page.module.css';
import Form from './components/Form';
import { useState } from 'react';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    return (
        <main className={styles.main}>
            <div className={styles.background}></div>
            <div className={styles.formWrapper}>
                {!loading && !isSubmitted && (
                    <Form
                        setLoading={setLoading}
                        loading={loading}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                    />
                )}
                {loading && <img src='/load.svg'></img>}
                {isSubmitted && (
                    <div className={styles.success}>
                        <h2 className={styles.title}>Регистрация прошла успешно!</h2>
                        <p className={styles.text}>
                            Поздравляем, вы успешно зарегистрировались на портале!
                        </p>
                        <p className={styles.text}>
                            Письмо с подтверждением регистрации было выслано на вашу почту.
                        </p>
                        <button className={styles.button}>ОТПРАВИТЬ ПОВТОРНО</button>
                    </div>
                )}
            </div>
        </main>
    );
}
