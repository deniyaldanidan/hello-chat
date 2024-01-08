import { Button, Modal, ModalHeader, ModalContent, ModalBody, useDisclosure, Input } from '@nextui-org/react';
import { FaPlus } from "react-icons/fa";
import { BsSearch } from 'react-icons/bs';
import { FormEvent, useState } from 'react';

const inputClasses = {
    input: "text-base",
    label: "text-base"
}

export default function SearchBox() {
    const { onOpen, isOpen, onOpenChange } = useDisclosure();
    const [search, setSearch] = useState<string>("");

    const submitHandler = async (e: FormEvent) => {
        try {
            e.preventDefault()
            // const res = await    
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
                        <Button startContent={<BsSearch />} isIconOnly color="primary" variant="shadow" radius="full" />
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>)
}