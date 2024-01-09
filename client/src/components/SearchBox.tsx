import { Button, Modal, ModalHeader, ModalContent, ModalBody, useDisclosure, Input } from '@nextui-org/react';
import { FaPlus } from "react-icons/fa";
import { BsSearch } from 'react-icons/bs';
import { FormEvent, useState } from 'react';
// import useAuthAxios from '../hooks/useAuthAxios';
import { basicApi } from '../libs/myAxios';
import useAuth from '../hooks/useAuth';

const inputClasses = {
    input: "text-base",
    label: "text-base"
}

type searchResultType = {
    username: string,
    name: string
}[]

export default function SearchBox() {
    const { onOpen, isOpen, onOpenChange } = useDisclosure();
    const [search, setSearch] = useState<string>("");
    // const axiosApi = useAuthAxios();
    const [users, setUsers] = useState<searchResultType>([])
    const { authState } = useAuth()

    const submitHandler = async (e: FormEvent) => {
        try {
            e.preventDefault()
            if (!search.length || authState.authed !== true) {
                return;
            }
            const res = await basicApi.get<searchResultType>(`/search-users/${search}`, {
                headers: {
                    Authorization: `Bearer ${authState.token}`
                }
            });
            const data = res.data;
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <Button startContent={<FaPlus />} onPress={onOpen} color='primary' className='text-base hover:bg-accent'>Add Chat</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
            <ModalContent>
                <ModalHeader>Search Users and Groups</ModalHeader>
                <ModalBody className='flex flex-col gap-y-3'>
                    <form className='flex items-baseline gap-x-3' onSubmit={submitHandler} >
                        <Input classNames={inputClasses} type='text' label="Search users here" variant="underlined" value={search} onChange={e => setSearch(e.target.value)} />
                        <Button startContent={<BsSearch />} isIconOnly color="primary" variant="shadow" radius="full" type='submit' />
                    </form>
                    <div className='flex flex-col gap-y-4'>
                        {
                            users.map(user => <div key={user.username}>{user.name}</div>)
                        }
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>)
}