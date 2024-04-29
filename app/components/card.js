import React from 'react';

export const Card = ({ item }) => {
    const handleDeleteClick = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this note?');

        if (confirmDelete) {
            fetch(`/api/notes?id=${item._id}`, {
                method: 'DELETE'
            }).then(() => {
                window.location.reload();
            }).catch(error => {
                console.error('Error deleting note:', error);
            });
        }
    };

    return (
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <div className={`bg-${item.color}-400 rounded-md shadow-md hover:shadow-2xl hover:border-2 hover:border-black`}>
                <div className='flex justify-end'>
                    <div className="flex justify-center items-center w-7 mr-5 h-7 rounded-lg hover:bg-gray-400" onClick={handleDeleteClick}>
                        <button className="rounded-md w-4 h-4 flex justify-center items-center">
                            x
                        </button>
                    </div>
                </div>
                <div className='w-52 h-52 px-4 pb-4 overflow-hidden'
                    style={{ wordBreak: 'break-all' }}
                >
                    <div>
                        <div className="flex text-xl mb-3">
                            <p>{item.title}</p>
                        </div>
                        <div className="flex text-sm">
                            <p>{item.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
