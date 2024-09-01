'use client'
interface User {
    id: number
    name: string
}

export const UserPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    return (
        <>
            <h1>User</h1>
            <ul>{users.map(user => user.id)}</ul>
            <ul>{users.map(user => user.name)}</ul>
        </>

    )
}