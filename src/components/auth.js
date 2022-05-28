import React, { useState } from 'react';
import {
    Box,
    Link,
    Text,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../actions/auth';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function Auth() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const dispatch = useDispatch();
    const toast = useToast();
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        if (isSignIn) {
            dispatch(signIn(formData)).then(
                () => {
                    setIsSubmit(false);
                    toast({
                        title: 'Đăng nhập thành công.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    navigate('/', {state: { auth: true }});
                },
                (message) => {
                    setIsSubmit(false);
                    toast({
                        title: 'Đăng nhập thất bại!',
                        description: message,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                } 
            )
        } else {
            dispatch(signUp(formData, navigate)).then(
                () => {
                    setIsSubmit(false);
                    toast({
                        title: 'Đăng ký thành công.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    navigate('/', {state: { auth: true }});
                },
                (message) => {
                    setIsSubmit(false);
                    toast({
                        title: 'Đăng ký thất bại!',
                        description: message,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                }
            );
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isInvalid = formData.email && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(formData.email));

    const [show, setShow] = useState(false);
    const [showAgain, setShowAgain] = useState(false);

    return (
        <Box as='form' sx={styles.form} onSubmit={handleSubmit}>
            <FormControl isRequired>
                {!isSignIn && (
                    <>
                        <FormLabel htmlFor='name'>Tên người dùng</FormLabel>
                        <Input id='name' name='name' onChange={handleChange}/>
                    </>
                )}

                <FormControl isInvalid={isInvalid} isRequired>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input type='email' id='email' name='email' onChange={handleChange} />
                    {isInvalid && (
                        <FormErrorMessage>Địa chỉ email không hợp lệ</FormErrorMessage>
                    )}
                </FormControl>

                <FormLabel htmlFor='password'>Mật khẩu</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} id='password' name='password' onChange={handleChange} />
                    { formData.password && (
                        <InputRightElement>
                            <Box onClick={() => setShow(!show)} >
                                {show ? <BsEye /> : <BsEyeSlash />}
                            </Box>
                        </InputRightElement>
                    )}
                </InputGroup>
                {!isSignIn && (
                    <>
                        <FormLabel htmlFor='confirmPassword'>Nhập lại mật khẩu</FormLabel>
                        <InputGroup>
                            <Input type={showAgain ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' onChange={handleChange} />
                            { formData.confirmPassword && (
                                <InputRightElement>
                                    <Box onClick={() => setShowAgain(!showAgain)} >
                                        {showAgain ? <BsEye /> : <BsEyeSlash />}
                                    </Box>
                                </InputRightElement>
                            )}  
                        </InputGroup>                  
                    </>
                )}
            </FormControl>

            <Button variant='filled' w='full' mt={8} colorScheme='blue' type='submit'>
                {isSignIn ? 'Đăng nhập' : 'Tạo tài khoản'}
            </Button>

            {isSubmit && (
                <Progress size='xs' mt='4' isIndeterminate />
            )}

            
            {isSignIn ? (
                <Text mt={4}>Chưa có tạo khoản? <Link color='blue' onClick={() => setIsSignIn(false)}>Tạo tài khoản</Link></Text>
            ) : (
                <Text mt={4}>Đã có tạo khoản? <Link color='blue' onClick={() => setIsSignIn(true)}>Đăng nhập</Link></Text>
            )}

        </Box>
    )
}

const styles = {
    form: {
        shrink: '0',
        w: 'sm',
        p: 12,
        border: '1px solid',
        borderColor: 'gray.200',
        mx: 'auto',
        label: {
            mt: 2,
        },
    },
}