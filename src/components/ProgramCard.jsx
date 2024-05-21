import React from 'react'
import { useFilterContext } from '../utils/context/filterContext'

const Programs = () => {
    const { filter } = useFilterContext();
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            {filter && filter.map((uni_info, index) => (<ProgramCard key={index} uni_info={uni_info} />))}
        </div>
    )
}

const ProgramCard = ({ uni_info }) => {
    return (
        <div className='bg-light p-8'>
            <img src={uni_info.Logo} alt="" className='h-20' />
            <h2 className='text-xl font-bold mt-4'>{uni_info.University_Name}</h2>
            <p className='text-lg'>World Ranking: {uni_info.World_Ranking}</p>
            <p className='text-lg'>Germany Ranking: {uni_info.German_Ranking}</p>

            <h5 className='text-lg'>State: {uni_info.States}</h5>
            <h2 className='text-2xl font-bold mt-4'>{uni_info.Course_Name}</h2>
            <h3 className='text-xl'>Degree:{uni_info.Course_Type}</h3>
            <h3 className='text-lg mt-4'>Stream: {uni_info.Course_Sub_Type}</h3>
            <p className='text-lg'>Beginning Semester: {uni_info.Semester_Start}</p>
            <p className='text-lg'>Duration: {uni_info.Duration}</p>
            <p className='text-lg'>Teaching Language: {uni_info.Teaching_Language}</p>
            <p className='text-lg'>Tuition Fee: {uni_info.Tuition_Fee}</p>
            <p className='text-lg'>German Grade Requirement: {uni_info['Required_German_Grade (GPA)']}</p>

            <p className='flex flex-col gap-2 my-6'>
                <a
                    href={uni_info.Course_Link}
                    className='bg-gray-800 text-white px-4 py-2 rounded-md focus:bg-gray-700 hover:bg-gray-700 outline-none block w-full text-center'
                    target='_blank'
                >
                    Course Website
                </a>
                <a
                    href={uni_info.Application_Link}
                    className='border border-gray-800 text-gray-800 hover:text-white px-4 py-2 rounded-md hover:bg-gray-800 outline-none block w-full text-center'
                    target='_blank'
                >
                    Application Link
                </a>
            </p>

            <p className='text-lg mt-4'>Last Update: {uni_info.Updated}</p>
        </div>
    )
}

export default Programs;