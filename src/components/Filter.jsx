import React, { useEffect, useState } from 'react'
import { GrPowerReset } from "react-icons/gr";
import { courseTypes, durations, numberOfItems, semesterStarts, teachingLanguages } from '../utils/filter.utils';
import { initialState, useFilterContext } from '../utils/context/filterContext';
import { FaXmark } from 'react-icons/fa6';

const Filter = () => {
    const { form, setForm, setPagination } = useFilterContext();

    const handleOnChange = (e) => {
        const { name, value, id } = e.target;
        if (id === 'Tuition_Fee_Min' || id === 'Tuition_Fee_Max') {
            const parsedValue = parseInt(value, 10) || 0;
            if (id === 'Tuition_Fee_Min' && parsedValue > form.Tuition_Fee_Max) {
                return;
            }
            setForm(prev => ({
                ...prev,
                [id]: parsedValue
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
        setPagination(prev => ({ ...prev, pageNo: 1 }))
    }

    return (
        <div className='flex flex-col gap-2'>

            {/* Reset Button */}
            <button
                className='flex items-center justify-center gap-1 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 w-60'
                onClick={() => setForm(initialState)}
            >
                Reset Filter  <GrPowerReset />
            </button>

            {/* Results */}
            <select
                name="results"
                id="results" className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 outline-none w-60 text-center'
                value={form.results}
                onChange={handleOnChange}
            >
                {numberOfItems.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>

            {/* University Name */}
            <input
                type="text"
                name='University_Name'
                placeholder='University Name'
                className='bg-gray-800 text-white px-4 py-2 rounded-md focus:bg-gray-700 hover:bg-gray-700 outline-none w-60 text-center'
                value={form.University_Name}
                onChange={handleOnChange}
            />

            {/* Course Name */}
            <input
                type="text"
                name='Course_Name'
                placeholder='Course Name'
                className='bg-gray-800 text-white px-4 py-2 rounded-md focus:bg-gray-700 hover:bg-gray-700 outline-none w-60 text-center'
                value={form.Course_Name}
                onChange={handleOnChange}
            />

            {/* German Ranking */}
            <input
                type="number"
                name='German_Ranking'
                placeholder='German Ranking'
                className='bg-gray-800 text-white px-4 py-2 rounded-md focus:bg-gray-700 hover:bg-gray-700 outline-none w-60 text-center'
                value={form.German_Ranking}
                onChange={handleOnChange}
            />

            {/* Course Type */}
            <div className='flex flex-col gap-2 pt-4'>
                <label htmlFor="Course_Type">Course Type:</label>
                <select
                    id="Course_Type"
                    name="Course_Type"
                    className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 outline-none w-60 text-center'
                    value={form.Course_Type}
                    onChange={handleOnChange}
                >
                    {courseTypes.map(course => <option key={course.label} value={course.value}>{course.label}</option>)}
                </select>
            </div>

            {/* Teaching Language */}
            <div className='flex flex-col gap-2 pt-4'>
                <label htmlFor="Teaching_Language">Teaching Language:</label>
                <div className='bg-gray-800 text-white px-4 py-2 rounded-md outline-none w-60 text-center h-32 overflow-y-auto'>
                    {teachingLanguages.map(teachLang =>
                        <p
                            key={teachLang.label}
                            className={`hover:bg-gray-700 cursor-pointer ${form.Teaching_Language === teachLang.value ? "bg-gray-700" : ""}`}
                            onClick={() => handleOnChange({ target: { name: "Teaching_Language", value: teachLang.value } })}
                        >
                            {teachLang.label}
                        </p>
                    )}
                </div>
            </div>

            {/* Beginning Semester */}
            <div className='flex flex-col gap-2 pt-4'>
                <label htmlFor="Semester_Start">Beginning Semester:</label>
                <div className='bg-gray-800 text-white px-4 py-2 rounded-md outline-none w-60 text-center h-32 overflow-y-auto'>
                    {semesterStarts.map(semStarts =>
                        <p
                            key={semStarts.label}
                            className={`hover:bg-gray-700 cursor-pointer ${form.Semester_Start === semStarts.value ? "bg-gray-700" : ""}`}
                            name="Semester_Start"
                            onClick={() => handleOnChange({ target: { name: "Semester_Start", value: semStarts.value } })}
                        >
                            {semStarts.label}
                        </p>
                    )}
                </div>
            </div>

            {/* Duration */}
            <div className='flex flex-col gap-2 pt-4'>
                <label htmlFor="Duration">Duration:</label>
                <select
                    id="Duration"
                    name="Duration"
                    className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 outline-none w-60 text-center'
                    value={form.Duration}
                    onChange={handleOnChange}
                >
                    {durations.map(duration =>
                        <option
                            key={duration.label}
                            value={duration.value}
                        >
                            {duration.label}
                        </option>
                    )}
                </select>
            </div>

            {/* Tution Fee */}
            <div className='flex flex-col gap-2 pt-4'>
                <label htmlFor="Tuition_Fee_Max">Tuition Fee:</label>
                <input
                    type="number"
                    id='Tuition_Fee_Min'
                    className='bg-gray-800 text-white px-4 py-2 rounded-md focus:bg-gray-700 hover:bg-gray-700 outline-none w-60 text-center'
                    value={form.Tuition_Fee_Min}
                    onChange={handleOnChange}
                />
                <input
                    type="number"
                    id='Tuition_Fee_Max'
                    className='bg-gray-800 text-white px-4 py-2 rounded-md focus:bg-gray-700 hover:bg-gray-700 outline-none w-60 text-center'
                    value={form.Tuition_Fee_Max}
                    onChange={handleOnChange}
                />
            </div>

        </div>
    )
}

export const useFilterMobile = () => {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        if (toggle)
            return () => setToggle(false);
    }, [toggle])

    return () => (
        <div>
            {toggle && <div className='w-full h-full absolute top-0 left-0 bg-white bg-opacity-90 overflow-y-scroll flex justify-center py-8'>
                <FaXmark className='text-black fixed top-2 right-2 text-xl sm:text-3xl' onClick={() => setToggle(false)} />
                <Filter />
            </div>}
            <button
                className='bg-gray-800 text-white px-4 py-2 rounded-md focus:bg-gray-700 hover:bg-gray-700 outline-none text-center'
                onClick={() => setToggle(true)}
            >
                Filter
            </button>
        </div>
    )
}

export default Filter