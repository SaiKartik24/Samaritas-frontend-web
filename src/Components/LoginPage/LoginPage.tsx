import React, { useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { Card } from 'antd';
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import appLogo from '../../assets/Samaritas-logo.png'

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

function LoginPage() {
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const credentials = [
        { email: "snistala@gmail.com", role: "agent", password: "123" },
        { email: "jadvani@gmail.com", role: "admin", password: "123" }
    ];


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Submitted Values:', values);
        
        const user = credentials.find(cred => cred.email === values.email && cred.password === values.password);
        
        if (user) {
            console.log(`Login successful! Welcome, ${user.role}`);
            localStorage.setItem('user', JSON.stringify({ user }));
            navigate('/home/refugee-list');  
        } else {
            setError('Invalid email or password');
        }
    };

    // Handle form submission failure
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Form Submission Failed:', errorInfo);
    };

    return (
        <div className='card-container'>
            <Card bordered={false} className='card'>
            <img src={appLogo} alt="Refugee" style={{ maxWidth: '250px', height: 'auto', marginLeft: "-35px" , marginBottom: '10px' }} />
                <h1 className='loginh1Style'><b>Login</b></h1>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Enter your Email" style={{ height: "40px", width: "300px" }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" style={{ height: "40px", width: "300px" }} />
                    </Form.Item>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block
                            style={{ height: "35px", backgroundColor: "#3C2D79", width: "300px" }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <a style={{color:'#DF7A00'}} href='/register'>Don't have an account? Register</a>
            </Card>
        </div>
    )
}

export default LoginPage;
