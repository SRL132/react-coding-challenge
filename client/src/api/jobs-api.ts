export interface FetchOptions {
    itemsPerPage: number;
    sortOptions?: SortOptions;
    filterOptions?: FilterOptions[];
}
type SortOptions = {
    sortBy: string;
    sortOrder: string
}

type FilterOptions = {
    filterBy: string,
    filterParam: string
}

export const reactiveFetchJobs = async (page = 0, fetchOptions: FetchOptions = {
    itemsPerPage: 10,
    sortOptions: {
        sortBy: 'id',
        sortOrder: 'asc'
    }
}) => {
    console.log("hi")
    return fetch(`http://localhost:9000/jobs?_page=${page}&_limit=${fetchOptions.itemsPerPage}&_sort=${fetchOptions.sortOptions?.sortBy}&_order=${fetchOptions.sortOptions?.sortOrder}&${fetchOptions?.filterOptions?.map(option => option.filterBy + '=' + option.filterParam)}`
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            return result
        });
}


export const fetchAllJobs = async () => {

    return fetch('http://localhost:9000/jobs'
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            return result
        });
}