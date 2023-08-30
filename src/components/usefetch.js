import { useState } from 'react';

function useFetch(url, requestOptions) {
    const [isLoading, setIsLoading] = useState(false);

    const fetchApi = () => {
        setIsLoading(true);

        return fetch(url, requestOptions)
            .then(response => response.json())
            .finally(() => {
                setIsLoading(false);
            });
    };

    return { fetchApi, isLoading };
}

export default useFetch;
