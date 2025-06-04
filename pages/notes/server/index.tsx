import { GetServerSideProps, GetStaticProps } from 'next';
export const getServerSideProps = (async () => {
    // Simulate fetching data from an API or database
    const notes = await fetch('https://service.pace-unv.cloud/api/notes').then(res => res.json())


    return {
        props: {
            notes,
        },
    };
}) satisfies GetServerSideProps<{notes: any}>;
export default function NotesPage({notes}) {
    return (
        <div>
        <h1>Notes Page</h1>
        <p>This is the server-side rendered notes page.</p>
        </div>
    );
}