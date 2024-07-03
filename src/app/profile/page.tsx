import Select from "@/components/Select";

export default function ProfilePage() {
  return (
    <>
      <div className="flex">
        <div className="bg-indigo-200 flex flex-col text-center min-h-screen justify-items-center w-1/6  p-4">
          <h1>hello</h1>
        </div>
        <div className="flex flex-grow flex-col items-center min-h-screen py-4 bg-indigo-100">
          <Select />
          <label
            htmlFor="w3review"
            className="block mb-2 mt-4 text-sm font-medium text-gray-900"
          >
            Ваше оголошення:
          </label>
          <textarea
            id="areaId"
            name="area"
            rows={8}
            className="resize-none block p-2.5 w-1/2 min-w-80 text-m text-gray-900 bg-white rounded-lg border border-gray-300 f"
            placeholder="Опишіть коротко Вашу послугу та залиште контакти для зв'язку..."
          ></textarea>
          <button className="border-white rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700">
            Опублікувати
          </button>
        </div>
      </div>
    </>
  );
}
