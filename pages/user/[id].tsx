import { useRouter } from 'next/router';
export default function User(){
    const router = useRouter();
    console.log(router.query.id); // Access the dynamic route parameter
    return (
        <div>User : {router.query.user_id}</div>
    );
}