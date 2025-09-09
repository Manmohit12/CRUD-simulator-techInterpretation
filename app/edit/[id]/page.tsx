"use client"
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage({params}:{params:{id:string}}) {

    const [formData, setFormData] = useState({ term: "", interpretation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

const router = useRouter();

    useEffect(() => {

        const fetchData=async()=>{
            try {
                const response=await fetch(`/api/interpretations/${params.id}`)
                if(!response.ok){
                    throw new Error("Failed to fetch interpretation")
                }
                const data=await response.json();
                setFormData({term:data.interpretation.term, interpretation:data.interpretation.interpretation});

            } catch (error) {
                setError("something went wrong. Please try again.");
            }
        };

        fetchData();

    }, [])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
      if (!formData.term || !formData.interpretation) {
            setError("Both fields are required");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/interpretations/${params.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });

            if (!response.ok){
                throw new Error("Failed to update interpretation");
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
            <h2 className="text-2xl font-bold my-8">Edit Interpretation</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" value={formData.term} onChange={handleInputChange} name="term" placeholder="Term" className="py-1 px-4 border rounded-md" />
                <textarea name="interpretation" value={formData.interpretation} onChange={handleInputChange} rows={4} placeholder="Interpretation" className="py-1 px-4 border rounded-md h-32"></textarea>
                <button className="bg-black text-white mt-5 px-4 py-1  rounded-md cursor-pointer">
                    {isLoading? "Updating": "Update Interpretation"}</button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    )
}