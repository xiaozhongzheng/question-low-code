import React, { useState, useEffect, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { getQuestionApi } from '@/api/question';
import { submitQuestionApi } from '@/api/stat';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { useGetPageInfo } from '@/hooks/useGetPageInfo';
import styles from './index.module.scss';
import type { ComponentInfoType, QuestionAnswerSchema } from '@/components/Question';
import {
    Card, Button, Form, message, Spin, Result,
    Input, Radio, Checkbox, Rate, Typography
} from 'antd';
const { Title, Paragraph } = Typography
const Fill: FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>('');

    const { componentList } = useGetComponentInfo();
    const { pageInfo } = useGetPageInfo();
    const { desc = '', title } = pageInfo
    const answerList = JSON.parse(localStorage.getItem('answerList') || '[]') as QuestionAnswerSchema[]
    useEffect(() => {
        if (!id) {
            setError('问卷ID不存在');
            setLoading(false);
            return;
        }

    }, [id]);



    const handleSubmit = async (values: any) => {
        console.log(form.getFieldsValue(), 'form')

        const data: QuestionAnswerSchema = {
            questionId: id,
            answers: form.getFieldsValue(),
            submitTime: new Date(),
        }

        // try {
        //     setSubmitting(true);

        //     // 转换表单数据为答案格式
        //     const answers = Object.keys(values).map(key => ({
        //         componentId: key,
        //         value: values[key]
        //     }));

        //     await submitQuestionApi(id!, answers);
        //     message.success('提交成功！');

        //     // 跳转到感谢页面或首页
        //     navigate('/');
        // } catch (err: any) {
        //     message.error(err.message || '提交失败');
        // } finally {
        //     setSubmitting(false);
        // }
    };

    const onFinish = (values: any) => {
        console.log(values, 'values')

        const data: QuestionAnswerSchema = {
            questionId: id,
            answers: form.getFieldsValue(),
            submitTime: new Date(),
        }
        answerList.push(data)
        localStorage.setItem('answerList',JSON.stringify(answerList))
        message.success('提交成功！');
        navigate('/manage/list')
    }

    if (error) {
        return (
            <Result
                status="error"
                title="加载失败"
                subTitle={error}
                extra={
                    <Button type="primary" onClick={() => navigate('/')}>
                        返回首页
                    </Button>
                }
            />
        );
    }

    return (
        <div className={styles.fillContainer}>
            <div className={styles.fillContent}>
                <Card className={styles.questionCard}>
                    <div className={styles.header}>
                        <Title level={2} className={styles.pageTitle}>{title}</Title>
                        {desc && <Paragraph className={styles.pageDesc}>{desc}</Paragraph>}
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        className={styles.form}
                        name="validateOnly"
                        onFinish={onFinish}
                    >
                        {(componentList as ComponentInfoType[]).map((component) => {
                            const { fe_id, type, props } = component;

                            switch (type) {
                                case 'questionTitle':
                                    return (
                                        <div key={fe_id} className={styles.titleComponent}>
                                            <Title
                                                level={props.level || 4}
                                                style={{
                                                    textAlign: props.isCenter ? 'center' : 'left',
                                                    color: props.color,
                                                    marginBottom: '16px'
                                                }}
                                            >
                                                {props.text}
                                            </Title>
                                        </div>
                                    );

                                case 'questionParagraph':
                                    return (
                                        <div key={fe_id} className={styles.paragraphComponent}>
                                            <Paragraph
                                                style={{
                                                    textAlign: props.isCenter ? 'center' : 'left',
                                                    fontSize: `${props.fontSize || 14}px`,
                                                    color: props.color,
                                                    marginBottom: '16px'
                                                }}
                                            >
                                                {props.text}
                                            </Paragraph>
                                        </div>
                                    );

                                case 'questionInput':
                                    return (
                                        <Form.Item
                                            key={fe_id}
                                            label={props.title}
                                            name={fe_id}
                                            rules={[{
                                                required: true,
                                                message: '请输入内容'
                                            }]}

                                        >
                                            <Input
                                                placeholder={props.placeholder || '请输入'}
                                                maxLength={100}
                                            />
                                        </Form.Item>
                                    );

                                case 'questionRadio':
                                    return (
                                        <Form.Item
                                            key={fe_id}
                                            label={props.title}
                                            name={fe_id}
                                            rules={[{
                                                required: true,
                                                message: '请选择一个选项'
                                            }]}
                                        >
                                            <Radio.Group>
                                                {props.options?.map((option) => (
                                                    <Radio
                                                        key={option.value}
                                                        value={option.value}
                                                        className={styles.radioOption}
                                                    >
                                                        {option.label}
                                                    </Radio>
                                                ))}
                                            </Radio.Group>
                                        </Form.Item>
                                    );

                                case 'questionCheckbox':
                                    return (
                                        <Form.Item
                                            key={fe_id}
                                            label={props.title}
                                            name={fe_id}
                                            rules={[{
                                                required: true,
                                                message: '请至少选择一个选项'
                                            }]}
                                        >
                                            <Checkbox.Group>
                                                {props.options?.map((option) => (
                                                    <Checkbox
                                                        key={option.value}
                                                        value={option.value}
                                                        className={styles.checkboxOption}
                                                    >
                                                        {option.label}
                                                    </Checkbox>
                                                ))}
                                            </Checkbox.Group>
                                        </Form.Item>
                                    );

                                case 'questionRate':
                                    return (
                                        <Form.Item
                                            key={fe_id}
                                            label={props.title}
                                            name={fe_id}
                                            rules={[{
                                                required: true,
                                                message: '请进行评分'
                                            }]}
                                        >
                                            <Rate
                                                count={props.count || 5}
                                                allowHalf={props.allowHalf}
                                                tooltips={props.tooltips}
                                                style={{ fontSize: '20px' }}
                                            />
                                        </Form.Item>
                                    );

                                default:
                                    return null;
                            }
                        })}

                        <Form.Item className={styles.submitItem}>
                            <Button
                                type="primary"
                                htmlType='submit'
                                size="large"
                                loading={submitting}
                                className={styles.submitBtn}
                                block
                            >
                                提交问卷
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};


export default Fill; 