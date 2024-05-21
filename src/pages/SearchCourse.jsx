import React, { useEffect, useState } from 'react'
import Filter, { useFilterMobile } from '../components/Filter'
import { useFilterContext } from '../utils/context/filterContext'
import SelectedFilters from '../components/SelectedFilters';
import Programs from '../components/ProgramCard';

const SearchCourse = () => {
    const FilterComponent = useFilterMobile();
    const [filterSetter, setFilterSetter] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setFilterSetter(true);
            } else {
                setFilterSetter(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <h1 className='text-3xl text-center'>Find Study Programs in Germany</h1>

            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-4 py-8'>
                {filterSetter ? <FilterComponent /> : <Filter />}
                <div className='w-full'>
                    <SelectedFilters />
                    <Programs />
                </div>
            </div>
        </div>
    )
}

export default SearchCourse