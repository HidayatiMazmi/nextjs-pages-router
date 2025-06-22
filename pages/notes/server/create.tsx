import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function NotesServerCreate(){
    const router = useRouter();
    const [payload, setPayload] = useState<{
        title: string,
        description: string
    }>({
        title: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ errors: {[key: string]: string}} | null>(null);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://service.pace11.my.id/api/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
                return
            }

            const data = await response.json();
            if (data.status === 'Created') {
                router.push('/notes/server');
            }
        } catch (err) {
            if (err instanceof Error) {
                const parsedError = JSON.parse(err.message);
                setError(parsedError);
            } else {
                setError({ errors: { general: 'An unexpected error occurred' } });
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>
            <form className="space-y-4" onSubmit={ onSubmit }>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={payload.title}
                        onChange={(e) => setPayload({ ...payload, title: e.target.value })}
                        className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Input title ..."
                    />
                    { error && typeof error==='object' && error.errors && (
                        <small className="text-red-500 text-sm mt-1">{error.errors.title}</small>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={payload.description}
                        onChange={(e) => setPayload({ ...payload, description: e.target.value })}
                        className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Input description ..."
                    />
                    { error && typeof error==='object' && error.errors && (
                        <small className="text-red-500 text-sm mt-1">{error.errors.description}</small>
                    )}
                </div>
                {/* {error && (
                    <div className="mb-4 text-red-600">
                        {Object.values(error.errors).map((err, index) => (
                            <p key={index}>{err}</p>
                        ))}
                    </div>
                )} */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}