import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

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
    data: ListNotes[];
};
export const getStaticProps = (async () => {
    const notes = await fetch('https://service.pace11.my.id/api/notes')
    .then((res) => res.json());

    return {
        props: {
            notes
        },
        revalidate: 3
    };
}) satisfies GetStaticProps<{notes: Notes}>;

export default function NotesSSGPage({notes}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {notes?.data.map((note: ListNotes) => (
                <Link href={`/notes/ssg/${note.id}`} key={note.id} className='p-4 bg-white shadow-sm rounded-lg hover:bg-gray-100 transition-colors'>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                </Link>
            ))}
        </div>
    );
}