import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useGetPageInfo } from '@/hooks/useGetPageInfo';
const { TextArea } = Input;
import { setPageInfo } from '@/store/pageInfoReducer';
import { useDispatch } from 'react-redux'

const PageSetting: React.FC = () => {
    const dispatch = useDispatch()
    const { pageInfo } = useGetPageInfo()
    console.log('===pageSetting')
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(pageInfo)
    },[pageInfo])
    // 表单值变化时的回调
    const handleValuesChange = () => {
        const values = form.getFieldsValue()
        console.log('表单值变化:', values);
        dispatch(setPageInfo(values))
    };

    return (
        <Form
            layout="vertical"
            initialValues={pageInfo}
            onValuesChange={handleValuesChange}
            form={form}
        >
            <Form.Item
                label="问卷标题"
                name="title"
                rules={[{ required: true, message: '请输入问卷标题' }]}
            >
                <Input placeholder="请输入标题" />
            </Form.Item>

            <Form.Item label="问卷描述" name="desc">
                <TextArea placeholder="请输入问卷描述" />
            </Form.Item>

            <Form.Item label="样式代码" name="css">
                <TextArea placeholder="请输入样式代码" />
            </Form.Item>

            <Form.Item label="脚本代码" name="js">
                <TextArea placeholder="请输入脚本代码" />
            </Form.Item>

        </Form>
    );
};

export default PageSetting;