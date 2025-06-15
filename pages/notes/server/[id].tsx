import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type ListNotes = {
    id: string;
    title: string;
    description: string;
    deleted_at: boolean;
    created_at: string;
    updated_at: string;
};
type Notes = {
    success: boolean;
    message: string;
    data: ListNotes;
};
export const getServerSideProps = (async (context) => {
    const { params } = context;
    const notes = await fetch(`https://service.pace11.my.id/api/note/${params?.id || ''}`)
    .then((res) => res.json());

    return {
        props: {
            notes
        },
    };
}) satisfies GetServerSideProps<{notes: Notes}>;

export default function NotesServerDetailPage({notes}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className='p-4 bg-white shadow-sm rounded-lg hover:bg-gray-100 transition-colors'>
            <h1>{notes.data.title}</h1>
            <p>{notes.data.description}</p>
        </div>
    );
}