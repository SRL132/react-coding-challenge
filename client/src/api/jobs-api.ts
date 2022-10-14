export interface FetchOptions {
    itemsPerPage: number;
    sortOptions?: SortOptions;
    filterOptions?: FilterOptions[];
}
export type SortOptions = {
    sortBy: string;
    sortOrder: string
}

export type FilterOptions = {
    filterBy: string,
    filterParam: string
}

const BASE_URL = 'http://localhost:9000/'

export const reactiveFetchJobs = async (page = 0, fetchOptions: FetchOptions = {
    itemsPerPage: 10,
    sortOptions: {
        sortBy: 'id',
        sortOrder: 'asc'
    }, filterOptions: [{
        filterBy: 'q',
        filterParam: ''
    }]
}) => {

    let URL = ''
    const PAGINATED_URL = `${BASE_URL}jobs?_page=${page}&_limit=${fetchOptions.itemsPerPage}`

    if (fetchOptions.sortOptions) {
        URL = `${URL}${PAGINATED_URL}&_sort=${fetchOptions.sortOptions.sortBy}&_order=${fetchOptions.sortOptions.sortOrder}`
    }

    if (fetchOptions.filterOptions?.length) {
        fetchOptions.filterOptions.forEach((option) => {
            if (option.filterParam) {
                URL += `&${option.filterBy}${option.filterBy === 'q' ? '=' : '_like=^'}${option.filterParam}`
            }
        })
    }

    return fetch(`${URL}`
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