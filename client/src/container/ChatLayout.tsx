import React from 'react';
import SearchBox from '../components/SearchBox';


export default function ChatLayout({ children }: { children: React.ReactNode }) {



    return (
        <div className='flex-grow flex'>
            <div className='w-fit min-w-40 bg-secBackground border-y-border border-y-2 rounded-lg p-3 flex flex-col gap-y-4'>
                <SearchBox />
            </div>
            <div className='flex-grow'>{children}</div>
        </div>
    )
}