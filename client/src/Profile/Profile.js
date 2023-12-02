import { useFormik } from "formik"
import avatar from "./profile.png"
import { useState } from "react"
// import { PencilIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast"

import Button from "../SharedElement/Button"
import Card from "../SharedElement/Card"
import Input from "../SharedElement/Input"
import useAuth from "../hooks/useAuth"
import axios from "../axios/axios"

const Profile = () => {

    const [file, setFile] = useState()

    const { auth } = useAuth()

    const validate = (values) => {
        const err = {}
        if (!values.name) {
            err.name = toast.error('Name is required')
        }
        if (values.mobile.length < 10) {
            err.mobile = toast.error('Mobile should be of 10 digits')
        }
        if (values.mobile.length > 10) {
            err.mobile = toast.error('Mobile should be of 10 digits')
        }
        if (!Number(values.mobile)) {
            err.mobile = toast.error('Mobile should contain numbers only')
        }

        return err
    }

    const handleSubmit = (values) => {
        const response = axios.put(`user/update/${auth.email}`, {
            name: values.name,
            mobile: values.mobile,
            profile: file
        })

        toast.promise(response, {
            loading: 'Updating...',
            success: (data) => {
                console.log(data)
                return <p>Updated</p>
            },
            error: (err) => {
                console.log(err)
                if (!err?.response) {
                    return <p>Somthing went wrong...<br />Try again later</p>
                } else if (err.response.status === 400) {
                    return <p>User not found</p>
                } else if (err.response.status === 500) {
                    return <p>Internal server error <br /> Try again later</p>
                }
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            name: auth.name,
            mobile: auth?.mobile || '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validate: validate,
        onSubmit: (values) => {
            console.log(values)
            handleSubmit(values)
        }
    })

    const className = "border-4 border-gray-100 w-[135px] rounded-full shadow-lg cursor-pointer hover:border-gray-200"

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }

    return (
        <div className="mx-auto">
            <Card className='w-fit'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="profile flex flex-col items-center justify-center pb-3 pt-2">
                        <label htmlFor="profile">
                            <img className={className} src={file || avatar} alt="avatar" />
                            <input onChange={onUpload} className="hidden" type='file' id='profile' name='profile' />
                        </label>
                        <span className="mt-2 flex items-center">
                            {auth.email || "Your email"}
                            {/* <PencilIcon class="ml-2 h-5 w-5 inline cursor-pointer text-gray-700" /> */}
                        </span>
                    </div>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        {...formik.getFieldProps('name')}
                    />
                    <Input
                        type="text"
                        placeholder="Enter your phone number"
                        {...formik.getFieldProps('mobile')}
                    />
                    <Button type='sumbit' className='mt-2'>Save Details</Button>
                </form>
            </Card>
        </div>
    )
}

export default Profile