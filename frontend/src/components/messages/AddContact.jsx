import React, { useEffect, useState } from 'react'
import { Loader, Search, UserPlus } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';

const addContact = () => {
    const [text, setText] = useState("");


    const { onlineContacts } = useAuthStore()
    const { users, getUsers, setContact, isUsersLoading } = useChatStore()
    useEffect(() => {
        getUsers()
    }, [getUsers])

    const filteredUsers = []
    const shownUsers = text ? filteredUsers : users

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    const handleSearch = (e) => {

    }




    return (
        <div className='p-5'>
            <button className="btn" onClick={() => document.getElementById('addContactId').showModal()}>Add Contact</button>
            <dialog id="addContactId" className="modal">
                <div className="modal-box">
                    <form method="dialog" >
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Users</h3>


                    <form className='flex items-center gap-2 mt-4' onSubmit={handleFormSubmit}>
                        <input type="text"

                            className='input input-bordered rounded-lg input-sm'
                            placeholder='search users...'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <button type='button'

                            className="btn btn-sm btn-circle"
                            disabled={!text.trim()}
                            onClick={handleSearch}
                        >
                            <Search />
                        </button>
                    </form>

                    {isUsersLoading ?
                        <div className="flex items-center justify-center h-120">
                            <Loader className="size-10 animate-spin"></Loader>
                        </div> :
                        <div className='mt-2 overflow-y-auto w-full py-3 h-120'>
                            {shownUsers.map((user) => (
                                <div key={user._id} className='flex items-center gap-3 hover:bg-base-300 transition-colors p-3'>
                                    <div className=" block relative ">
                                        <img
                                            src={user.profilePic || "/avatar.png"}
                                            alt={user.name}
                                            className="size-12 object-cover rounded-full"
                                        />
                                        {onlineContacts.includes(user._id) && (
                                            <span
                                                className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                            />
                                        )}
                                    </div>

                                    <div className="block text-left min-w-0">
                                        <div className="font-medium truncate">{user.Username}</div>
                                        <div className="text-sm text-zinc-400">
                                            {onlineContacts.includes(user._id) ? "Online" : "Offline"}
                                        </div>
                                    </div>

                                    <button className='btn  ml-auto mr-3' onClick={() => { setContact(user._id) }}>
                                        <UserPlus size={20} />
                                    </button>
                                </div>

                            ))}
                            {shownUsers.length > 0 &&
                                <div className='justify-self-center mt-5'>
                                    No users found
                                </div>
                            }
                        </div>
                    }


                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </div >
    )
}

export default addContact