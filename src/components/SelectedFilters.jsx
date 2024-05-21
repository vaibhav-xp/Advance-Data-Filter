import React from 'react';
import { useFilterContext } from '../utils/context/filterContext';
import { sortPrograms } from '../utils/filter.utils';

const SelectedFilters = () => {
    const { form, sort, setSort, pagination, setPagination } = useFilterContext();

    const handlePrevPage = () => {
        if (pagination.pageNo > 1) {
            setPagination(prev => ({ ...prev, pageNo: prev.pageNo - 1 }));
        }
    };

    const handleNextPage = () => {
        if (pagination.pageNo < pagination.pages) {
            setPagination(prev => ({ ...prev, pageNo: prev.pageNo + 1 }));
        }
    };

    const handleSorting = (e) => {
        setSort(e.target.value);
        setPagination(prev => ({ ...prev, pageNo: 1 }));
    }

    return (
        <div className='w-full'>
            <h4 className='text-center font-semibold'>Selected Filters:</h4>
            <div className="flex gap-4 flex-wrap m-2 justify-center">
                {Object.keys(form).map(key => {
                    if (form[key]) {
                        return <Tag key={key} filterKey={key} value={form[key]} />;
                    }
                })}
            </div>
            <div className='mt-10 flex justify-between'>
                <div className='flex gap-2'>
                    <button
                        className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 outline-none text-center'
                        onClick={handlePrevPage}
                        disabled={pagination.pageNo === 1}
                    >
                        {`<<`} Prev
                    </button>
                    <p className='flex items-center'>{pagination.pageNo}/{pagination.pages}</p>
                    <button
                        className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 outline-none text-center'
                        onClick={handleNextPage}
                        disabled={pagination.pageNo === pagination.pages}
                    >
                        Next {`>>`}
                    </button>
                </div>
                <select
                    id="Course_Type"
                    name="Course_Type"
                    className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 outline-none w-60 text-center'
                    value={sort}
                    onChange={handleSorting}
                >
                    {sortPrograms.map(course => <option key={course.label} value={course.value}>{course.label}</option>)}
                </select>
            </div>
        </div>
    );
};

const Tag = ({ filterKey, value }) => {
    return (
        <div className='bg-green-600 text-white block px-4 py-2 rounded-sm'>
            <b>{filterKey}</b>: {value}
        </div>
    );
};

export default SelectedFilters;
