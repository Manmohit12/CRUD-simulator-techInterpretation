"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
        console.log(formData);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.term || !formData.interpretation) {
            setError("Both fields are required");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/interpretations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });

            if (!response.ok) {
                throw new Error("Failed to create interpretation");
            }
            router.push('/');
        } catch (error) {
            console.log(error);
            setError("something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div>
            <h2 className="text-2xl font-bold my-8">Add New Interpretation</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" value={formData.term} name="term" placeholder="Term" className="py-1 px-4 border rounded-md" onChange={handleInputChange} />
                <textarea name="interpretation" value={formData.interpretation} rows={4} placeholder="Interpretation" className="py-1 color-black px-4 border rounded-md h-32" onChange={handleInputChange}></textarea>
                <button type="submit" disabled={isLoading} className="bg-black text-white mt-5 px-4 py-1  rounded-md cursor-pointer">
                    {isLoading ? "Adding..." : "Add Interpretation"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}