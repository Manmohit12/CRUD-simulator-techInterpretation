export default function CreatePage() {
    return (
        <div>
            <h2 className="text-2xl font-bold my-8">Add New Interpretation</h2>
            <form className="flex flex-col gap-4">
                <input type="text" name="term" placeholder="Term" className="py-1 px-4 border rounded-md" />
                <textarea name="Interpretation" rows={4} placeholder="Interpretation" className="py-1 px-4 border rounded-md h-32"></textarea>
                <button className="bg-black text-white mt-5 px-4 py-1  rounded-md cursor-pointer">Add Interpretation</button>
            </form>
        </div>
    );
}