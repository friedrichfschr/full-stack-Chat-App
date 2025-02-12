import React, { useEffect, useState } from 'react'
import SidebarSkeleton from "../skeletons/SidebarSkeleton"
import addContact from './addContact'
import { Users } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { useChatStore } from '../../store/useChatStore'

const Sidebar = () => {
    const { getContacts, contacts, selectedContact, setSelectedContact, isContactsLoading } = useChatStore()

    const { onlineContacts } = useAuthStore()
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getContacts()
    }, [getContacts])

    const shownContacts = showOnlineOnly
        ? contacts.filter((contact) => onlineContacts.includes(contact._id))
        : contacts;



    return (
        <div >

            <aside className="h-full w-100 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
                <div className='border-b border-base-300 w-full p-5 flex justify-between items-center'>
                    <div>
                        <Users className='size-6' />
                        <span className='font-medium block'>Contacts</span>
                    </div>

                    <AddContact></AddContact>
                </div>
                <div className="ml-3 mt-3 flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">({onlineContacts.length - 1} online)</span>
                </div>


                {isContactsLoading ?
                    <SidebarSkeleton /> :
                    <div className='mt-2 overflow-y-auto w-full py-3'>
                        {shownContacts.map((contact) => (
                            <button
                                key={contact._id}
                                onClick={() => setSelectedContact(contact)}
                                className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedContact?._id === contact._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
                            >
                                <div className=" block relative ">
                                    <img
                                        src={contact.profilePic || "/avatar.png"}
                                        alt={contact.name}
                                        className="size-12 object-cover rounded-full"
                                    />
                                    {onlineContacts.includes(contact._id) && (
                                        <span
                                            className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                        />
                                    )}
                                </div>


                                <div className="block text-left min-w-0">
                                    <div className="font-medium truncate">{contact.Username}</div>
                                    <div className="text-sm text-zinc-400">
                                        {onlineContacts.includes(contact._id) ? "Online" : "Offline"}
                                    </div>
                                </div>
                            </button>
                        ))}

                        {shownContacts.length === 0 && (
                            <div className="text-center text-zinc-500 py-4">No online users</div>
                        )}

                    </div>}
            </aside >
        </div >
    )
}

export default Sidebar