import React, { type FC } from 'react'
import QuestionInput from '@/components/Question/QuestionInput';
import QuestionTitle from '@/components/Question/QuestionTitle';
import styles from './index.module.scss'
const Canvas: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.componentsStyle}>
                <div className={styles.disabledElement}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles.componentsStyle}>
                <div className={styles.disabledElement}>
                    <QuestionInput />
                </div>
            </div>

        </div>
    )
}

export default Canvas;