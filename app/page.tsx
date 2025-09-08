"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretation {
  $id: string;
  term: string;
  interpretation: string;
}

export default function Home() {


  const [interpretations, setInterpretations] = useState<IInterpretation[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/interpretations');
        if (!response.ok) {
          throw new Error('Failed to fetch interpretations');
        }
        const data = await response.json();
        setInterpretations(data);
      } catch (error) {
        console.log("Error", error);
        setError("Failed to fetch interpretations. Please try reloading the page.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterpretations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`api/interpretations/${id}`, {
        method: 'DELETE'
      });
      setInterpretations((prevInterpretations) => prevInterpretations?.filter((i) => i.$id !== id));
    } catch (error) {
      setError("Failed to delete interpretation. Please try again.");
    }
  }

  return (
    <div >
  {error && (
    <p className="py-4 text-red-500 font-medium">{error}</p>
  )}

  {isLoading ? (
    <p className="text-slate-600 animate-pulse">Loading Interpretations...</p>
  ) : interpretations.length > 0 ? (
    <div className="space-y-4">
      {interpretations.map((interpretation) => (
        <div
          key={interpretation.$id}
          className="p-6 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          {/* Title */}
          <div className="text-xl font-semibold text-slate-900">
            {interpretation.term}
          </div>

          {/* Body */}
          <div className="mt-2 text-slate-600 leading-relaxed">
            {interpretation.interpretation}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 justify-end">
            <Link
              href={`/edit/${interpretation.$id}`}
              className="bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:shadow-lg transition-all"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(interpretation.$id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:shadow-lg transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-slate-500 italic">No interpretations found. Please add some.</p>
  )}
</div>

  );
}
