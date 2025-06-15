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

export const getStaticPaths = async () => {
    const notes = await fetch('https://service.pace11.my.id/api/notes')
    .then((res) => res.json());

    const paths = notes.data.map((note: ListNotes) => ({
        params: { id: note.id.toString() },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}
export const getStaticProps = (async (context) => {
    const { params } = context;
    const notes = await fetch(`https://service.pace11.my.id/api/note/${params?.id || ''}`)
    .then((res) => res.json());

    return {
        props: {
            notes
        },
        revalidate: 3
    };
}) satisfies GetServerSideProps<{notes: Notes}>;

export default function NotesSSGDetailPage({notes}: InferGetServerSidePropsType<typeof getStaticProps>) {
    return (
        <div className='p-4 bg-white shadow-sm rounded-lg hover:bg-gray-100 transition-colors'>
            <h1>{notes.data.title}</h1>
            <p>{notes.data.description}</p>
        </div>
    );
}