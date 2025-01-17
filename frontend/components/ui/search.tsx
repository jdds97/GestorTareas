'use client';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';

import {Search} from 'lucide-react';

import {useDebouncedCallback} from 'use-debounce';

const WAIT_BETWEEN_SEARCH = 500;

export default function SearchBar({placeholder}: {placeholder: string}) {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        }
        else {
            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`);
    }, WAIT_BETWEEN_SEARCH);

    return (
        <div className="flex items-center w-full rounded-lg border border-gray-200 h-">
            <Search className="h-5 w-5 text-gray-500 ml-3" />
            <input
                onChange={event => handleSearch(event.target.value)}
                className="block w-full py-2 pl-2 pr-3 text-sm outline-none placeholder:text-gray-500 bg-transparent"
                placeholder={placeholder}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}

